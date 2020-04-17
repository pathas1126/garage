import React from "react";
import { Route, Switch } from "react-router-dom";
import { Global, css } from "@emotion/core";
import {
  MainPage,
  SalesPage,
  EnjoyPage,
  QnAPage,
  MyPage,
  LoginPage,
  ContactPage,
  DetailPage,
  WritePage,
} from "./pages";

function App() {
  return (
    <>
      {/* 전체 스타일 지정 */}
      <Global
        styles={css`
          body {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
        `}
      />
      {/* ROUTE 설정 */}
      <Route exact path="/" component={MainPage} />
      <Switch>
        <Route path="/sales/detail/:id" component={DetailPage} />
        <Route path="/sales/write" component={WritePage} />
        <Route path="/sales" component={SalesPage} />
      </Switch>
      <Route path="/enjoy" component={EnjoyPage} />
      <Route path="/qna" component={QnAPage} />
      <Route path="/mypage" component={MyPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/contact" component={ContactPage} />
    </>
  );
}

export default App;
