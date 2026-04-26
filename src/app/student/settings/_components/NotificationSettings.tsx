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

      <div className="bg-white/60 backdrop-blur rounded-2xl p-6 shadow-sm space-y-6">
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
    <div className="flex items-center justify-between gap-6">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}
