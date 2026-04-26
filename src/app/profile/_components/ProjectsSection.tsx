"use client";

import { useMemo, useState } from "react";
import { Loader2, PencilLine, Trash2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/hooks/use-toast";
import useGetProjects from "../_hooks/useGetProjects";
import useAddProject from "../_hooks/useAddProject";
import useDeleteProject from "../_hooks/useDeleteProject";
import useUpdateProject from "../_hooks/useUpdateProject";

interface ProjectsSectionProps {
  isEditing?: boolean;
}

type ProjectUI = {
  id: string;
  title: string;
  type: string;
  description: string;
  thumbnail: string;
  link: string;
};

const normalizeProject = (item: unknown): ProjectUI | null => {
  if (!item || typeof item !== "object") return null;
  const source = item as Record<string, unknown>;
  const id = source.id ?? source._id ?? source.projectId;

  const title = source.title;
  const type = source.type;
  const description = source.description ?? source.desc;
  const thumbnail = source.thumbnail ?? source.imageUrl;
  const link = source.link;

  if (typeof title !== "string" || !title.trim()) return null;
  if (typeof id !== "string" || !id.trim()) return null;

  return {
    id,
    title,
    type: typeof type === "string" && type.trim() ? type : "project",
    description:
      typeof description === "string" && description.trim()
        ? description
        : "No description available.",
    thumbnail: typeof thumbnail === "string" ? thumbnail : "",
    link: typeof link === "string" ? link : "",
  };
};

const extractProjects = (payload: unknown): ProjectUI[] => {
  const tryArray = (value: unknown): ProjectUI[] => {
    if (!Array.isArray(value)) return [];
    return value
      .map(normalizeProject)
      .filter((project): project is ProjectUI => project !== null);
  };

  const direct = tryArray(payload);
  if (direct.length > 0) return direct;

  if (payload && typeof payload === "object") {
    const root = payload as Record<string, unknown>;

    const fromData = tryArray(root.data);
    if (fromData.length > 0) return fromData;

    const fromProjects = tryArray(root.projects);
    if (fromProjects.length > 0) return fromProjects;

    if (root.data && typeof root.data === "object") {
      const nested = root.data as Record<string, unknown>;
      const nestedProjects = tryArray(nested.projects);
      if (nestedProjects.length > 0) return nestedProjects;
    }
  }

  return [];
};

export default function ProjectsSection({ isEditing }: ProjectsSectionProps) {
  const { toast } = useToast();

  const { data, isLoading, isError, error: getProjectsError } = useGetProjects();
  const { addProject, isPending: isAdding, error: addProjectError } = useAddProject();
  const { deleteProject, isPending: isDeleting, error: deleteProjectError } = useDeleteProject();
  const { updateProject, isPending: isUpdating, error: updateProjectError } = useUpdateProject();

  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  const [title, setTitle] = useState("");
  const [type, setType] = useState("personal");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [link, setLink] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateThumbnail, setUpdateThumbnail] = useState("");

  const projects = useMemo(() => {
    return extractProjects(data);
  }, [data]);

  const resetAddForm = () => {
    setTitle("");
    setType("personal");
    setDescription("");
    setThumbnail("");
    setLink("");
  };

  const handleOpenAdd = () => {
    resetAddForm();
    setOpenAdd(true);
  };

  const handleAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast({
        title: "Missing required fields",
        description: "Project title and description are required.",
        variant: "destructive",
      });
      return;
    }
    if (!thumbnail.trim() || !link.trim()) {
      toast({
        title: "Missing required fields",
        description: "Thumbnail and project link are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addProject({
        type: type.trim() || "personal",
        title: title.trim(),
        description: description.trim(),
        thumbnail: thumbnail.trim(),
        link: link.trim(),
      });

      setOpenAdd(false);
      resetAddForm();
      toast({
        title: "Project added",
        description: `${title.trim()} was added successfully.`,
      });
    } catch (error) {
      toast({
        title: "Failed to add project",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const openUpdateFor = (project: ProjectUI) => {
    setSelectedProjectId(project.id);
    setSelectedProjectTitle(project.title);
    setUpdateDescription(project.description);
    setUpdateThumbnail(project.thumbnail);
    setOpenUpdate(true);
  };

  const handleUpdateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedProjectId || !updateDescription.trim()) {
      toast({
        title: "Missing required fields",
        description: "Project description is required for update.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateProject({
        id: selectedProjectId,
        description: updateDescription.trim(),
        thumbnail: updateThumbnail.trim(),
      });

      setOpenUpdate(false);
      toast({
        title: "Project updated",
        description: `${selectedProjectTitle} was updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Failed to update project",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (project: ProjectUI) => {
    try {
      await deleteProject({ id: project.id });
      toast({
        title: "Project deleted",
        description: `${project.title} was removed successfully.`,
      });
    } catch (error) {
      toast({
        title: "Failed to delete project",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="relative rounded-2xl border border-[#cdd9f2] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="text-2xl font-bold text-[#111f37]">Projects</h2>
        {isEditing && (
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100"
            aria-label="Add project"
          >
            <PencilLine className="h-5 w-5" />
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading projects...
        </div>
      ) : (
        <div className="space-y-8">
          {projects.length === 0 ? (
            <p className="text-sm text-slate-500">No projects found.</p>
          ) : (
            projects.map((project) => (
            <div key={project.id} className="flex flex-col gap-4 sm:flex-row">
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-44 w-full rounded-xl object-cover sm:h-36 sm:w-[240px]"
                />
              ) : (
                <div className="h-44 w-full rounded-xl bg-[linear-gradient(145deg,#f2eee7,#d7d0c4)] sm:h-36 sm:w-[240px]" />
              )}

              <div className="flex-1 pt-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg capitalize text-slate-600">{project.type}</p>
                    <h3 className="text-[32px] font-semibold text-[#111f37]">{project.title}</h3>
                  </div>

                  {isEditing && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openUpdateFor(project)}
                        disabled={isUpdating}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
                        aria-label={`Update ${project.title}`}
                      >
                        <PencilLine className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(project)}
                        disabled={isDeleting}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                        aria-label={`Delete ${project.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <p className="max-w-3xl text-lg text-slate-700">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-sm text-[#1176c8] underline"
                  >
                    Open project link
                  </a>
                )}
              </div>
            </div>
            ))
          )}
        </div>
      )}

      {isError && (
        <p className="mt-3 text-sm text-red-600">
          {getProjectsError instanceof Error
            ? getProjectsError.message
            : "Failed to load projects from backend."}
        </p>
      )}
      {addProjectError && (
        <p className="mt-2 text-sm text-red-600">
          {addProjectError.message || "Failed to add project."}
        </p>
      )}
      {updateProjectError && (
        <p className="mt-2 text-sm text-red-600">
          {updateProjectError.message || "Failed to update project."}
        </p>
      )}
      {deleteProjectError && (
        <p className="mt-2 text-sm text-red-600">
          {deleteProjectError.message || "Failed to delete project."}
        </p>
      )}

      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <form onSubmit={handleAddProject} className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Add Project</h3>
            <p className="text-sm text-gray-400">Provide project details to add it to your profile.</p>
          </div>

          <label className="block space-y-2 text-sm">
            <span className="text-gray-300">Type</span>
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-500"
              placeholder="personal"
              required
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span className="text-gray-300">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-500"
              placeholder="Project title"
              required
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span className="text-gray-300">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px] rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-500"
              placeholder="Short description"
              required
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span className="text-gray-300">Thumbnail URL/Base64</span>
            <input
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-500"
              placeholder="https://..."
              required
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span className="text-gray-300">Project Link</span>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-500"
              placeholder="https://..."
              required
            />
          </label>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpenAdd(false)}
              className="rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20"
              disabled={isAdding}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              disabled={isAdding}
            >
              {isAdding && <Loader2 className="h-4 w-4 animate-spin" />}
              Add Project
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <form onSubmit={handleUpdateProject} className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Update Project</h3>
            <p className="text-sm text-gray-400">
              Update description and thumbnail for {selectedProjectTitle}.
            </p>
          </div>

          <label className="block space-y-2 text-sm">
            <span className="text-gray-300">Description</span>
            <textarea
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
              className="w-full min-h-[100px] rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-500"
              placeholder="Updated description"
              required
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span className="text-gray-300">Thumbnail URL/Base64</span>
            <input
              value={updateThumbnail}
              onChange={(e) => setUpdateThumbnail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-500"
              placeholder="https://..."
            />
          </label>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpenUpdate(false)}
              className="rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20"
              disabled={isUpdating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              disabled={isUpdating}
            >
              {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
              Update Project
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
