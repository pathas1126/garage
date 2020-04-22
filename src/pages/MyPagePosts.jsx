import React from "react";
import { PageTemplate } from "../components";
import { MyPagePostsContainer } from "../containers";

const MyPagePosts = ({ match }) => {
  const user_Id = match.params.user_Id;
  return (
    <PageTemplate>
      <MyPagePostsContainer user_Id={user_Id} />
    </PageTemplate>
  );
};

export default MyPagePosts;
