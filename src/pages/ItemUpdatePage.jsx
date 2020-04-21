import React from "react";
import { PageTemplate } from "../components";
import ItemUpdateContainer from "../containers/ItemUpdateContainer";

const ItemUpdatePage = ({ match }) => {
  const item_Id = match.params.id;
  return (
    <>
      <PageTemplate>
        <ItemUpdateContainer item_Id={item_Id} />
      </PageTemplate>
    </>
  );
};

export default ItemUpdatePage;
