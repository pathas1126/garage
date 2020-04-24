/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Button } from "../index";
import { COLORS } from "../../assets/colors";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { LoginContext } from "../../store";

const Header = () => {
  const { loginStatus, setLoginStatus } = useContext(LoginContext);
  const { logon, admin } = loginStatus;

  useEffect(() => {
    const user_Id_this = sessionStorage.getItem("user_Id");
    const user_Name_this = sessionStorage.getItem("user_Name");
    const admin_this = JSON.parse(sessionStorage.getItem("admin"));
    const logon_this = JSON.parse(sessionStorage.getItem("logon"));

    setLoginStatus({
      user_Id: user_Id_this,
      user_Name: user_Name_this,
      logon: logon_this,
      admin: admin_this,
    });
  }, [setLoginStatus]);

  const logout = () => {
    setLoginStatus({ user_Id: "", logon: false });
    sessionStorage.removeItem("user_Id");
    sessionStorage.removeItem("user_Name");
    sessionStorage.removeItem("logon");
    sessionStorage.removeItem("admin");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  return (
    <header css={setStyle()}>
      <section>
        {admin && <span>관리자 로그인 중...</span>}
        {!logon && (
          <Link to="/login">
            <Button variation="noborder" color="secondary">
              Login
            </Button>
          </Link>
        )}
        {logon && (
          <Button variation="noborder" color="secondary" onClick={logout}>
            Logout
          </Button>
        )}

        {logon && !admin && (
          <Link to="/mypage">
            <Button variation="noborder" color="secondary">
              MyPage
            </Button>
          </Link>
        )}

        {!admin && (
          <Link to="/contact">
            <Button variation="noborder" color="secondary">
              Contact
            </Button>
          </Link>
        )}
      </section>
      <h1>HEADER</h1>
    </header>
  );
};

const setStyle = () => {
  const defaultStyle = css`
    position: relative;
    width: 100%;
    height: 14rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${COLORS.teritiaty};
    section {
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 2rem;
      color: white;
      a {
        text-decoration: none;
      }
    }
    h1 {
      color: white;
    }
  `;
  return [defaultStyle];
};

export default Header;
