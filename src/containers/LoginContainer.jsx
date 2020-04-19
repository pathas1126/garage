/**@jsx jsx */
import { useState, useContext } from "react";
import { jsx, css } from "@emotion/core";
import { Input, Button } from "../components";
import { fetchData } from "../library";
import { LoginContext } from "../store";
import { Link } from "react-router-dom";

const LoginContainer = () => {
  const [loginInfo, setLoginInfo] = useState({
    user_Id_FF: "",
    user_Password_FF: "",
  });

  const { user_Id_FF, user_Password_FF } = loginInfo;
  const { setLoginStatus } = useContext(LoginContext);

  const getInputValue = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const login = (e) => {
    e.preventDefault();
    const loginData = loginInfo;
    fetchData({ method: "POST", url: "/users/login", data: loginData })
      .then((res) => {
        const { data } = res;
        if (data.success) {
          sessionStorage.setItem("user_Id", data.user_Id);
          sessionStorage.setItem("logon", data.success);
          setLoginStatus(
            JSON.stringify({ user_Id: data.user_Id, logon: true })
          );
          alert("로그인에 성공했습니다.");
          window.history.go(-1);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <section css={loginWrapper}>
      <header>
        <h1>로그인</h1>
      </header>
      <article css={formWrapper}>
        <form onSubmit={login}>
          <Input
            name="user_Id_FF"
            value={user_Id_FF}
            onChange={getInputValue}
            placeholder="ID를 입력하세요"
            required={true}
          ></Input>
          <Input
            name="user_Password_FF"
            value={user_Password_FF}
            onChange={getInputValue}
            placeholder="PW를 입력하세요"
            required={true}
          ></Input>
          <Button
            variation="outline"
            color="teritiaty"
            type="submit"
            width="100%"
          >
            로그인
          </Button>
          <Link to="/signup">회원가입</Link>
        </form>
      </article>
    </section>
  );
};

const loginWrapper = css`
  margin: 3rem auto;
  width: 60%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const headerWrapper = css``;

const formWrapper = css`
  form {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default LoginContainer;
