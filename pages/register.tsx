import CreateAccount from "@cmts/CreateAccount";
import PageLayout from "@cmts/PageLayout";
import type { NextPage } from "next";

const Register: NextPage = () => {
  return (
    <PageLayout>
      <CreateAccount />
    </PageLayout>
  );
};

export default Register;
