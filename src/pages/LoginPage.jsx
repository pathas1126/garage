import React, { useContext } from "react";
import { PageTemplate } from "../components";
import { LoginContainer } from "../containers";
import { LoginContext } from "../store";

const LoginPage = () => {
  const { loginStatus } = useContext(LoginContext);
  return (
    <section>
      <PageTemplate>
        {!loginStatus.logon ? <LoginContainer /> : <h1>로그인중</h1>}
      </PageTemplate>
    </section>
  );
};

export default LoginPage;
