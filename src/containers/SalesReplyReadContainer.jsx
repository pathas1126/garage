import React from "react";
import { Reply } from "../components";

const SalesReplyReadContainer = ({ item_Replies }) => {
  return (
    <section>
      {item_Replies
        .sort((a, b) => b.item_Rnumber - a.item_Rnumber)
        .map((reply) => (
          <Reply
            key={reply.item_Rnumber}
            item_Detail={reply.item_Detail}
            item_Number={reply.item_Number}
            item_Reply_date={reply.item_Reply_date}
            item_Reply_writer={reply.item_Reply_writer}
            item_Rnumber={reply.item_Rnumber}
          />
        ))}
    </section>
  );
};

export default SalesReplyReadContainer;
