import type { ApplyProfilePayload } from "../../hooks/useGetApplyProfile";

export const DUMMY_APPLY_PROFILE: ApplyProfilePayload = {
  user: {
    data: {
      firstName: "Sara",
      lastName: "Khaled",
      email: "Sara.Khaled@gmail.com",
    },
  },
  skills: {
    data: {
      skills: [
        { skill: "Python" },
        { skill: "Java" },
        { skill: "C++" },
        { skill: "SQL" },
        { skill: "Git" },
        { skill: "Agile Development" },
      ],
    },
  },
  resume: {
    downloadUrl: "#",
  },
};
