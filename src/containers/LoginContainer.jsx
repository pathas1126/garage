/**@jsx jsx */
import { useState, useContext } from "react";
import { jsx, css } from "@emotion/core";
import { Input, Button, Form } from "../components";
import { fetchData } from "../library";
import { LoginContext } from "../store";
import { Link } from "react-router-dom";
import { Label } from "../components/Label";

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
          sessionStorage.setItem("user_Name", data.user_Name);
          sessionStorage.setItem("admin", data.admin);
          sessionStorage.setItem("logon", data.success);
          setLoginStatus({
            user_Id: data.user_Id,
            user_Name: data.userName,
            logon: data.success,
            admin: data.admin,
          });
          alert("로그인에 성공했습니다.");
          return window.history.go(-1);
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
        <h1 style={{ fontSize: "1.4rem" }}>환영합니다.</h1>
      </header>
      <article>
        <Form onSubmit={login}>
          <table>
            <tbody>
              <tr>
                <td>
                  <Label htmlFor="user_Id_FF">아이디</Label>
                </td>
                <td>
                  <Input
                    name="user_Id_FF"
                    value={user_Id_FF}
                    onChange={getInputValue}
                    placeholder="ID를 입력하세요"
                    required={true}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td>
                  <Label htmlFor="user_Password_FF">비밀번호</Label>
                </td>
                <td>
                  <Input
                    name="user_Password_FF"
                    value={user_Password_FF}
                    type="password"
                    onChange={getInputValue}
                    placeholder="PW를 입력하세요"
                    required={true}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <Button
                    variation="outline"
                    color="teritiaty"
                    type="submit"
                    width="100%"
                  >
                    로그인
                  </Button>
                </td>
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    fontSize: "0.9rem",
                    color: "#5a6a6a",
                    textAlign: "right",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                >
                  <Link to="/signup">회원이 아니신가요?</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </article>
    </section>
  );
};

const loginWrapper = css`
  margin: 9rem auto;
  width: 27rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 0.2rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  a {
    text-decoration: none;
    color: inherit;
  }
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }
`;

export default LoginContainer;
