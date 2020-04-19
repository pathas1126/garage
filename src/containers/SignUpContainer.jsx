/** @jsx jsx */
import React, { useState } from "react";
import { jsx, css } from "@emotion/core";
import { Button, Input } from "../components";
import { COLORS } from "../assets/colors";
import { fetchData } from "../library";

const SignUpContainer = () => {
  const [signUp, setSignUp] = useState({
    user_Id: "",
    user_Name: "",
    user_Password: "",
    user_Email: "",
  });

  const { user_Id, user_Name, user_Password, user_Email } = signUp;

  const setValues = (e) => {
    const { value, name } = e.target;
    setSignUp({ ...signUp, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = signUp;

    fetchData({ method: "POST", url: "users/signup", data }).then((res) =>
      console.log(res)
    );
  };

  return (
    <section css={WriteContainerWrapper}>
      <form css={formContainerWrapper} onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="user_Name">이름</label>
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
                <label htmlFor="user_Id">아이디</label>
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
                <label htmlFor="user_Password">비밀번호</label>
              </td>
              <td>
                <Input
                  name="user_Password"
                  placeholder="비밀번호를 입력해 주세요"
                  value={user_Password}
                  onChange={setValues}
                  required={true}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="user_Email">이메일</label>
              </td>
              <td>
                <Input
                  name="user_Email"
                  value={user_Email}
                  onChange={setValues}
                  placeholder="이메일을 입력해 주세요"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Button width="100%" variation="outline" type="submit">
          작성 하기
        </Button>
      </form>
    </section>
  );
};

const WriteContainerWrapper = css`
  width: 30rem;
  padding: 2rem;
  margin: 3rem auto;
  border: 1px solid ${COLORS.primary};
  border-radius: 1rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }
`;

const formContainerWrapper = css`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  textarea {
    margin-top: 2rem;
    padding: 1rem;
    width: 90%;
    height: 14rem;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 0.2rem;
    resize: none;
  }
`;

export default SignUpContainer;
