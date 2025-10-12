
import { Suspense } from "react";
import Component from "../_components/login-form";
export default function Page() {

  return(
    <Suspense fallback={null}>
     <Component />;
    </Suspense>
  )
}
