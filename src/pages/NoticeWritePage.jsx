import React from "react";
import { PageTemplate } from "../components";
import { NoticeWriteContainer, NoticeUpdateContainer } from "../containers";

const NoticeWritePage = ({ match }) => {
  const notice_Number = match.params.id;
  return (
    <PageTemplate>
      {notice_Number ? (
        <NoticeUpdateContainer notice_Number={notice_Number} />
      ) : (
        <NoticeWriteContainer />
      )}
    </PageTemplate>
  );
};

export default NoticeWritePage;
