import React from "react";
import { PageTemplate } from "../components";
import { NoticeWriteContainer } from "../containers";

const NoticeWritePage = ({ match }) => {
  const notice_Number = match.params.id;
  return (
    <PageTemplate>
      <NoticeWriteContainer notice_Number={notice_Number} />
    </PageTemplate>
  );
};

export default NoticeWritePage;
