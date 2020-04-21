/** @jsx jsx */
import { useState } from "react";
import { jsx, css } from "@emotion/core";
import { Button, Input, Form } from "../components";
import { COLORS } from "../assets/colors";
import { fetchData } from "../library";
import { Label } from "../components/Label";

const SignUpContainer = () => {
  const [signUp, setSignUp] = useState({
    user_Id: "",
    user_Name: "",
    user_Password: "",
    user_Password_check: "",
    user_Email: "",
  });

  const {
    user_Id,
    user_Name,
    user_Password,
    user_Password_check,
    user_Email,
  } = signUp;

  const setValues = (e) => {
    const { value, name } = e.target;
    setSignUp({ ...signUp, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (user_Password !== user_Password_check)
      return alert("비밀번호가 맞지 않습니다.");

    const data = signUp;

    fetchData({ method: "POST", url: "users/signup", data }).then((res) => {
      const { data } = res;
      if (data) {
        alert("회원 가입이 성공적으로 이루어졌습니다.");
        return (window.location.href = "/");
      }
    });
  };

  return (
    <section css={WriteContainerWrapper}>
      <Form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <h1>회원 가입</h1>
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="user_Name">이름</Label>
              </td>
              <td>
                <Input
                  name="user_Name"
                  autoFocus={true}
                  placeholder="이름을 입력해 주세요"
                  value={user_Name}
                  onChange={setValues}
                  required={true}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="user_Id">아이디</Label>
              </td>
              <td>
                <Input
                  name="user_Id"
                  placeholder="아이디를 입력해 주세요"
                  value={user_Id}
                  onChange={setValues}
                  required={true}
                />
              </td>
            </tr>

            <tr>
              <td>
                <Label htmlFor="user_Password">비밀번호</Label>
              </td>
              <td>
                <Input
                  name="user_Password"
                  placeholder="비밀번호를 입력해 주세요"
                  type="password"
                  value={user_Password}
                  onChange={setValues}
                  required={true}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="user_Password">비밀번호 확인</Label>
              </td>
              <td>
                <Input
                  name="user_Password_check"
                  placeholder="비밀번호를 확인해 주세요"
                  type="password"
                  value={user_Password_check}
                  onChange={setValues}
                  required={true}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="user_Email">이메일</Label>
              </td>
              <td>
                <Input
                  name="user_Email"
                  value={user_Email}
                  onChange={setValues}
                  placeholder="이메일을 입력해 주세요"
                  type="email"
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <Button width="100%" variation="outline" type="submit">
                  작성하기
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </section>
  );
};

const WriteContainerWrapper = css`
  width: 30rem;
  padding: 2rem;
  margin: 5rem auto;
  border: 1px solid ${COLORS.primary};
  border-radius: 1rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }
`;

export default SignUpContainer;
