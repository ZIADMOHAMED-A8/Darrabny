import { IconUserCircle, IconBuilding, IconSchool } from "@tabler/icons-react";

const roles = [
  {
    icon: <IconUserCircle size={28} />,
    color: "#185fa5",
    title: "User",
    description:
      "Students and job seekers looking to apply for internship opportunities.",
  },
  {
    icon: <IconBuilding size={28} />,
    color: "#0f6e56",
    title: "Company",
    description:
      "Organizations that post internships and review applicants.",
  },
  {
    icon: <IconSchool size={28} />,
    color: "#534ab7",
    title: "College",
    description:
      "Educational institutions that monitor and support their enrolled students.",
  },
];

export default function RoleCards() {
  return (
    <div className="roles-grid">
      {roles.map((role) => (
        <div key={role.title} className="role-card">
          <div className="role-icon" style={{ color: role.color }}>
            {role.icon}
          </div>
          <h3>{role.title}</h3>
          <p>{role.description}</p>
        </div>
      ))}
    </div>
  );
}