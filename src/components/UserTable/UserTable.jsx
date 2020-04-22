/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { Button } from "../Button";
import { Input } from "../Input";

const UserTable = ({ userData }) => {
  const { user_Id, user_Password, user_Email, user_Name } = userData;
  return (
    <section css={userTableWrapper}>
      <table css={tableWrapper}>
        <thead>
          <tr>
            <td colSpan="2">내 정보</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>별명</td>
            <td>
              <Input value={user_Name} noborder />
            </td>
          </tr>
          <tr>
            <td>아이디</td>
            <td>{user_Id}</td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td>
              <Input value={user_Password} type="password" noborder></Input>
            </td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>{user_Email}</td>
          </tr>
        </tbody>
      </table>
      <footer css={footerWrapper}>
        <Button color="secondary" variation="outline" width="100%">
          내 글 보기
        </Button>
        <Button color="warning" variation="outline" width="100%">
          회원탈퇴
        </Button>
      </footer>
    </section>
  );
};

const userTableWrapper = css`
  width: 80%;
  min-height: 60vh;
  margin: 3rem auto;
  padding: 1rem;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }
`;

const tableWrapper = css`
  width: 100%;
  margin-top: 1rem;
  thead > tr > td {
    padding-bottom: 2rem;
    text-align: center;
  }
  input {
    font-size: 1.2rem;
  }
`;

const footerWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button + button {
    margin-left: 0;
    margin-top: 0.1rem;
  }
`;

export default UserTable;
