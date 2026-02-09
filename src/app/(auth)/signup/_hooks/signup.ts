import { useMutation } from "@tanstack/react-query";

import { SignupValues } from "@/lib/schemas/signup.schema";
import { signupAction } from "../_actions/register.action";

export default function useSignup() {
  return useMutation({
    mutationFn: (values: SignupValues) => signupAction(values),
  });
}
