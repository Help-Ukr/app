import type { NextPage } from "next";
import PageLayout from "../components/PageLayout";
import LoginToAccount from "../components/LoginToAccount";

const Login: NextPage = () => {
  return (
    <PageLayout>
      <LoginToAccount />
    </PageLayout>
  );
};

export default Login;
