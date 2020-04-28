import React, { useState } from "react";
import { QnAReplyReadContainer, QnAReplyWriteContainer } from ".";

const QnAReplyContainer = ({ qna_Number, qna_Writer }) => {
  const [qnaReplies, setQnaReplies] = useState([]);
  return (
    <>
      <QnAReplyWriteContainer
        qna_Number={qna_Number}
        setQnaReplies={setQnaReplies}
        qna_Writer={qna_Writer}
      />
      <QnAReplyReadContainer
        qna_Number={qna_Number}
        qna_Writer={qna_Writer}
        qnaReplies={qnaReplies}
        setQnaReplies={setQnaReplies}
      />
    </>
  );
};

export default QnAReplyContainer;
