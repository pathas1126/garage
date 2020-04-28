import React, { useEffect } from "react";
import { QnAReply } from "../components";
import { fetchData } from "../library";

const QnAReplyReadContainer = ({
  qnaReplies,
  setQnaReplies,
  qna_Number,
  qna_Writer,
}) => {
  useEffect(() => {
    fetchData({ method: "GET", url: `/qna/${qna_Number}` })
      .then((res) => {
        if (res.data) {
          const resArr = res.data;
          setQnaReplies((prevReplies) => prevReplies.concat(resArr));
        }
      })
      .catch((err) => {
        throw err;
      });
  }, [qna_Number, setQnaReplies]);
  return (
    <>
      {qnaReplies.map((reply) => (
        <QnAReply
          key={reply.qna_Rnumber}
          qna_Rnumber={reply.qna_Rnumber}
          qna_Detail={reply.qna_Detail}
          qna_Reply_date={reply.qna_Reply_date}
          qna_Name={reply.qna_Name}
          qna_Writer={qna_Writer}
          setQnaReplies={setQnaReplies}
        />
      ))}
    </>
  );
};

export default QnAReplyReadContainer;
