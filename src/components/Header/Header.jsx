/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Button } from "../index";
import { COLORS } from "../../assets/colors";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { LoginContext } from "../../store";

const Header = () => {
  const { loginStatus, setLoginStatus } = useContext(LoginContext);
  const { logon } = loginStatus;

  useEffect(() => {
    const user_Id_this = sessionStorage.getItem("user_Id");
    const logon_this = JSON.parse(sessionStorage.getItem("logon"));
    setLoginStatus({ user_Id: user_Id_this, logon: logon_this });
  }, [setLoginStatus]);

  const logout = () => {
    setLoginStatus({ user_Id: "", logon: false });
    sessionStorage.removeItem("user_Id");
    sessionStorage.removeItem("logon");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  return (
    <header css={setStyle()}>
      <section>
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

        {logon && (
          <Link to="/mypage">
            <Button variation="noborder" color="secondary">
              MyPage
            </Button>
          </Link>
        )}
        <Link to="/contact">
          <Button variation="noborder" color="secondary">
            Contact
          </Button>
        </Link>
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
