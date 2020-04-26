import React from "react";
import { SalesReplyReadContainer, SalesReplyWriteContainer } from ".";

const SalesReplyContainer = ({
  item_Number,
  item_Replies,
  setItem_Replies,
}) => {
  return (
    <section style={{ width: "82%" }}>
      <SalesReplyWriteContainer
        item_Number={item_Number}
        setItem_Replies={setItem_Replies}
      />
      <SalesReplyReadContainer
        item_Replies={item_Replies}
        setItem_Replies={setItem_Replies}
      />
    </section>
  );
};

export default SalesReplyContainer;
