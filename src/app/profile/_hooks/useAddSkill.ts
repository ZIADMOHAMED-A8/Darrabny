import { useMutation, useQueryClient } from "@tanstack/react-query";
import addSkillAction, { SkillPayload } from "../_actions/addSkillAction";

const readSkillsFromCache = (cache: unknown): string[] => {
  if (Array.isArray(cache)) {
    return cache
      .map((item) =>
        typeof item === "string"
          ? item
          : item && typeof item === "object"
            ? (item as { skill?: unknown }).skill
            : null,
      )
      .filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  }

  if (cache && typeof cache === "object") {
    const root = cache as Record<string, unknown>;
    const candidates = [root.data, root.skills, root.result];

    for (const candidate of candidates) {
      if (!Array.isArray(candidate)) continue;
      return candidate
        .map((item) =>
          typeof item === "string"
            ? item
            : item && typeof item === "object"
              ? (item as { skill?: unknown }).skill
              : null,
        )
        .filter((item): item is string => typeof item === "string" && item.trim().length > 0);
    }
  }

  return [];
};

export default function useAddSkill() {
  const queryClient = useQueryClient();

  const { isPending, error, mutateAsync } = useMutation<
    unknown,
    Error,
    SkillPayload,
    { prevSkills: unknown; prevGetSkills: unknown }
  >({
    mutationFn: (values: SkillPayload) => addSkillAction(values),
    onMutate: async (values) => {
      await queryClient.cancelQueries({ queryKey: ["skills"] });
      await queryClient.cancelQueries({ queryKey: ["getSkills"] });

      const prevSkills = queryClient.getQueryData(["skills"]);
      const prevGetSkills = queryClient.getQueryData(["getSkills"]);
      const currentSkills = readSkillsFromCache(prevSkills);
      const nextSkills = Array.from(new Set([values.skill, ...currentSkills]));

      queryClient.setQueryData(["skills"], nextSkills);
      queryClient.setQueryData(["getSkills"], nextSkills);

      return { prevSkills, prevGetSkills };
    },
    onError: (_error, _values, context) => {
      if (!context) return;
      queryClient.setQueryData(["skills"], context.prevSkills);
      queryClient.setQueryData(["getSkills"], context.prevGetSkills);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      queryClient.invalidateQueries({ queryKey: ["getSkills"] });
    },
  });

  return { isPending, error, addSkill: mutateAsync };
}
