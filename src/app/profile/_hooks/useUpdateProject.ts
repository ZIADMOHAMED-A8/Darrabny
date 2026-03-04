import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProjectAction, { UpdateProjectPayload } from "../_actions/updateProjectAction";

type ProjectCacheItem = {
  id: string;
  title: string;
  type: string;
  description: string;
  thumbnail: string;
  link: string;
};

const readProjectsFromCache = (cache: unknown): ProjectCacheItem[] => {
  const toProject = (item: unknown): ProjectCacheItem | null => {
    if (!item || typeof item !== "object") return null;
    const source = item as Record<string, unknown>;
    const id = source.id ?? source._id ?? source.projectId;
    const title = source.title;
    if (typeof id !== "string" || !id.trim()) return null;
    if (typeof title !== "string" || !title.trim()) return null;
    return {
      id,
      title,
      type: typeof source.type === "string" ? source.type : "project",
      description: typeof source.description === "string" ? source.description : "",
      thumbnail: typeof source.thumbnail === "string" ? source.thumbnail : "",
      link: typeof source.link === "string" ? source.link : "",
    };
  };

  const tryArray = (value: unknown): ProjectCacheItem[] => {
    if (!Array.isArray(value)) return [];
    return value.map(toProject).filter((item): item is ProjectCacheItem => item !== null);
  };

  const direct = tryArray(cache);
  if (direct.length > 0) return direct;

  if (cache && typeof cache === "object") {
    const root = cache as Record<string, unknown>;
    return tryArray(root.data ?? root.projects);
  }

  return [];
};

export default function useUpdateProject() {
  const queryClient = useQueryClient();

  const { isPending, error, mutateAsync } = useMutation<
    unknown,
    Error,
    UpdateProjectPayload,
    { prevProjects: unknown; prevGetProjects: unknown }
  >({
    mutationFn: (values: UpdateProjectPayload) => updateProjectAction(values),
    onMutate: async (values) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });
      await queryClient.cancelQueries({ queryKey: ["getProjects"] });

      const prevProjects = queryClient.getQueryData(["projects"]);
      const prevGetProjects = queryClient.getQueryData(["getProjects"]);
      const currentProjects = readProjectsFromCache(prevProjects);
      const nextProjects = currentProjects.map((project) =>
        project.id === values.id
          ? {
              ...project,
              description: values.description,
              thumbnail: values.thumbnail,
            }
          : project,
      );

      queryClient.setQueryData(["projects"], nextProjects);
      queryClient.setQueryData(["getProjects"], nextProjects);

      return { prevProjects, prevGetProjects };
    },
    onError: (_error, _values, context) => {
      if (!context) return;
      queryClient.setQueryData(["projects"], context.prevProjects);
      queryClient.setQueryData(["getProjects"], context.prevGetProjects);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["getProjects"] });
    },
  });

  return { isPending, error, updateProject: mutateAsync };
}
