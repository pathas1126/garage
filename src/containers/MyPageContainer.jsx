import React, { useEffect, useContext, useState } from "react";
import { LoginContext } from "../store";
import { fetchData } from "../library";
import { UserTable } from "../components";

const MyPageContainer = () => {
  const [userData, setUserData] = useState({
    user_Id: "",
    user_Password: "",
    user_Email: "",
    user_Name: "",
  });
  const { loginStatus } = useContext(LoginContext);

  const { user_Id: user_Id_logon } = loginStatus;

  useEffect(() => {
    if (!sessionStorage.getItem("logon")) {
      alert("로그인이 필요합니다");
      return (window.location.href = "/login");
    }
    fetchData({
      method: "POST",
      data: { user_Id_logon },
      url: "/users/user",
    })
      .then((res) => {
        const { data } = res;
        setUserData(data);
      })
      .catch((err) => {
        throw err;
      });
  }, [setUserData, user_Id_logon]);
  return <>{user_Id_logon && <UserTable userData={userData} />}</>;
};

export default MyPageContainer;
