import React, { useEffect, useState, useRef } from "react";
import { QnAReply, Loader } from "../components";
import { fetchData } from "../library";

const QnAReplyReadContainer = ({
  qnaReplies,
  setQnaReplies,
  qna_Number,
  qna_Writer,
}) => {
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef();

  useEffect(() => {
    const loaderCurrent = loaderRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let timer;
          if (!timer) {
            timer = setTimeout(() => {
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
            }, 500);
          }
        }
      });
    });
    if (loaderCurrent) {
      observer.observe(loaderCurrent);
    }
    return () => observer.unobserve(loaderCurrent);
  }, [qna_Number, setQnaReplies]);

  return (
    <>
      {loading ? (
        <Loader loaderRef={loaderRef} />
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
