import {
  FormPage,
  LeftDivPage,
  RightDivPage,
} from "@/components/formPages/formPage";
import SigninForm from "@/components/forms/signinForm";


export default function Signin() {
  return (
    <FormPage>
      <LeftDivPage>
        <span className="mx-auto">
          <h2>Sign In</h2>
          <h2>Be productive</h2>
          <h2>Be organized</h2>
          <h2>Be minimal</h2>
        </span>
      </LeftDivPage>

      <RightDivPage>
        <h2 className="text-2xl">Sign In</h2>
        <SigninForm />
      </RightDivPage>
    </FormPage>
  );
}
