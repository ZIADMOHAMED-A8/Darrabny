import { UseFormReturn } from "react-hook-form";
import { SettingsFormValues } from "../page";
import { Field } from "./Field";

export default function PersonalInfoForm({
  form,
}: {
  form: UseFormReturn<SettingsFormValues>;
}) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 gap-5 rounded-2xl bg-white/60 p-4 shadow-sm backdrop-blur sm:p-6 md:grid-cols-2 md:gap-6">
        <Field
          label="Full Name"
          error={errors.fullName?.message}
        >
          <input
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters",
              },
            })}
            className="input"
          />
        </Field>

        <Field
          label="Email"
          error={errors.email?.message}
        >
          <input
          readOnly
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            className="input"
          />
        </Field>

        <Field
          label="Phone Number"
          error={errors.phone?.message}
        >
          <input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value:
                  /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{5}$/,
                message: "Please enter a valid phone number",
              },
            })}
            className="input"
          />
        </Field>

        <Field
          label="Address"
          error={errors.address?.message}
        >
          <input
            {...register("address", {
              required: "Address is required",
              pattern: {
                value: /^\s*[^,]+\s*,\s*[^,]+\s*$/,
                message: "Address must be in format: City,Country",
              },
            })}
            placeholder="Cairo,Egypt"
            className="input"
          />
        </Field>
      </div>
    </section>
  );
}
