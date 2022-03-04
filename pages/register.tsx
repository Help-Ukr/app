import type { NextPage } from "next";
import PageLayout from "../components/PageLayout";
import CreateAccount from "../components/CreateAccount";

const Register: NextPage = () => {
  return (
    <PageLayout>
      <CreateAccount />
    </PageLayout>
  );
};

export default Register;
