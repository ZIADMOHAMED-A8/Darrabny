import { UseFormReturn } from "react-hook-form";
import { SettingsFormValues } from "../page";

export default function NotificationSettings({
  form,
}: {
  form: UseFormReturn<SettingsFormValues>;
}) {
  const { register } = form;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        Notification Preferences
      </h2>

      <div className="space-y-6 rounded-2xl bg-white/60 p-4 shadow-sm backdrop-blur sm:p-6">
        <Toggle
          label="Email Notifications"
          description="Receive updates about new internships, application status changes, and platform announcements."
        >
          <input
            type="checkbox"
            {...register("emailNotifications")}
            className="toggle"
          />
        </Toggle>

        <Toggle
          label="Push Notifications"
          description="Get instant alerts for important updates and reminders."
        >
          <input
            type="checkbox"
            {...register("pushNotifications")}
            className="toggle"
          />
        </Toggle>

        <Toggle
          label="SMS Notifications"
          description="Receive SMS notifications for urgent updates and reminders."
        >
          <input
            type="checkbox"
            {...register("smsNotifications")}
            className="toggle"
          />
        </Toggle>
      </div>
    </section>
  );
}

function Toggle({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}
