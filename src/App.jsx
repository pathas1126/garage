import React from "react";
import { Route, Switch } from "react-router-dom";
import { Global, css } from "@emotion/core";
import { LoginProvider } from "./store";

import {
  MainPage,
  SalesPage,
  QnAPage,
  MyPage,
  LoginPage,
  ContactPage,
  DetailPage,
  WritePage,
  SignUpPage,
  ItemUpdatePage,
  MyPagePosts,
  NoticePage,
  NoticeWritePage,
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
            font-family: "Noto Sans", "Noto Sans KR";
          }
        `}
      />
      <LoginProvider>
        {/* ROUTE 설정 */}
        <Route exact path="/" component={MainPage} />
        <Switch>
          <Route path="/sales/detail/:id/update" component={ItemUpdatePage} />
          <Route path="/sales/detail/:id" component={DetailPage} />
          <Route path="/sales/write" component={WritePage} />
          <Route path="/sales" component={SalesPage} />
        </Switch>
        <Switch>
          <Route path="/notice/update/:id" component={NoticeWritePage} />
          <Route path="/notice/write" component={NoticeWritePage} />
          <Route path="/notice" component={NoticePage} />
        </Switch>
        <Route path="/qna" component={QnAPage} />
        <Switch>
          <Route path="/mypage/posts/:user_Id" component={MyPagePosts} />
          <Route path="/mypage" component={MyPage} />
        </Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/contact" component={ContactPage} />
      </LoginProvider>
    </>
  );
}

export default App;
