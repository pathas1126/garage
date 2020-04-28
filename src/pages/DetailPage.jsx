import React from "react";
import { PageTemplate } from "../components";
import { DetailContainer } from "../containers";

const DetailPage = ({ match }) => {
  const item_Id = match.params.id;
  return (
    <div>
      <PageTemplate>
        <DetailContainer item_Id={item_Id} />
      </PageTemplate>
    </div>
  );
};

export default DetailPage;
