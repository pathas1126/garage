import React from "react";
import { Route } from "react-router-dom";
import { Global, css } from "@emotion/core";
import { Main, Sales, Enjoy, QnA, MyPage, Login, Contact } from "./pages";

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
      <Route exact path="/" component={Main} />
      <Route exact path="/sales" component={Sales} />
      {/* <Route path="/sales/detail/:id" component={Detail} /> */}
      <Route path="/enjoy" component={Enjoy} />
      <Route path="/qna" component={QnA} />
      <Route path="/mypage" component={MyPage} />
      <Route path="/login" component={Login} />
      <Route path="/contact" component={Contact} />
    </>
  );
}

export default App;
