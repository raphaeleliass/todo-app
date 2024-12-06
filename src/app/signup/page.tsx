import SignupForm from "@/components/forms/signupForm";
import {
  FormPage,
  LeftDivPage,
  RightDivPage,
} from "@/components/formPages/formPage";

export default function Signup() {
  return (
    <FormPage>
      <LeftDivPage>
        <span className="mx-auto">
          <h1>Sign Up</h1>
          <h2>Be productive</h2>
          <h3>Be focused</h3>
          <h4>Be minimal</h4>
        </span>
      </LeftDivPage>

      <RightDivPage>
        <h2 className="text-2xl">Sign Up</h2>
        <SignupForm />
      </RightDivPage>
    </FormPage>
  );
}
