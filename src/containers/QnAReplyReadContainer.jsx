import React, { useEffect, useState } from "react";
import { QnAReply, Loader } from "../components";
import { fetchData } from "../library";

const QnAReplyReadContainer = ({
  qnaReplies,
  setQnaReplies,
  qna_Number,
  qna_Writer,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData({ method: "GET", url: `/qna/${qna_Number}` })
      .then((res) => {
        if (res.data) {
          const resArr = res.data;
          setQnaReplies((prevReplies) => prevReplies.concat(resArr));
          setLoading(false);
        }
      })
      .catch((err) => {
        throw err;
      });
  }, [qna_Number, setQnaReplies]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        qnaReplies.map((reply) => (
          <QnAReply
            key={reply.qna_Rnumber}
            qna_Rnumber={reply.qna_Rnumber}
            qna_Detail={reply.qna_Detail}
            qna_Reply_date={reply.qna_Reply_date}
            qna_Name={reply.qna_Name}
            qna_Writer={qna_Writer}
            setQnaReplies={setQnaReplies}
          />
        ))
      )}
    </>
  );
};

export default QnAReplyReadContainer;
