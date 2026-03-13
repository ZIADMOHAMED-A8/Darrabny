
export const ROLES = ["user", "company", "university"] as const;

export type Role = (typeof ROLES)[number];

export function isValidRole(value: string | null): value is Role {
  return !!value && ROLES.includes(value as Role);
}