import Image from "next/image";

type AchievementsSectionProps = {
  profileData?: unknown;
};

const badgeLevels = [
  {
    level: 1,
    title: "Level 1",
    src: "/level 1.png",
  },
  {
    level: 2,
    title: "Level 2",
    src: "/level 2.png",
  },
  {
    level: 3,
    title: "Level 3",
    src: "/level 3.png",
  },
];

function readString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function getBadgeText(value: unknown): string {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(getBadgeText).join(" ");
  }

  if (typeof value === "object") {
    const badge = value as Record<string, unknown>;

    return [
      readString(badge.badge),
      readString(badge.badgeName),
      readString(badge.name),
      readString(badge.title),
      readString(badge.level),
      readString(badge.type),
    ]
      .filter(Boolean)
      .join(" ");
  }

  return "";
}

function getVisibleBadgeCount(profileData: unknown) {
  if (!profileData || typeof profileData !== "object") {
    return 0;
  }

  const root = profileData as Record<string, unknown>;
  const user =
    root.user && typeof root.user === "object"
      ? (root.user as Record<string, unknown>)
      : {};

  const badgeText = [
    getBadgeText(root.badge),
    getBadgeText(root.badges),
    getBadgeText(user.badge),
    getBadgeText(user.badges),
    getBadgeText(user.badgeName),
  ]
    .join(" ")
    .toLowerCase();

  if (badgeText.includes("expert")) {
    return 3;
  }

  if (badgeText.includes("pro")) {
    return 2;
  }

  if (badgeText.includes("rising") || badgeText.includes("star")) {
    return 1;
  }

  return 0;
}

export default function AchievementsSection({
  profileData,
}: AchievementsSectionProps) {
  const visibleBadges = badgeLevels.slice(0, getVisibleBadgeCount(profileData));

  return (
    <section className="rounded-2xl border border-[#cdd9f2] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8">
      <h2 className="mb-6 text-2xl font-bold text-[#111f37]">Badges</h2>

      {visibleBadges.length ? (
        <div className="flex flex-wrap justify-between gap-8 sm:justify-between">
          {visibleBadges.map((badge) => (
            <div
              key={badge.level}
              className="flex min-w-[110px] flex-col items-center gap-2"
            >
              <Image
                src={badge.src}
                alt={`${badge.title} badge`}
                width={112}
                height={112}
                className="h-28 w-28 rounded-full object-cover shadow-[0_8px_18px_rgba(15,23,42,0.2)]"
              />
              <span className="text-sm font-semibold text-slate-700">
                {badge.title}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center">
          <p className="text-sm font-medium text-slate-500">
            No Badges yet.
          </p>
        </div>
      )}
    </section>
  );
}
