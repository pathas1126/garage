import React, { useState } from "react";
import QnAWriteContainer from "./QnAWriteContainer";
import QnAReadContainer from "./QnAReadContainer";

const QnAContainer = () => {
  const [qna, setQna] = useState([]);
  return (
    <section>
      <QnAWriteContainer qna={qna} setQna={setQna} />
      <QnAReadContainer qna={qna} setQna={setQna} />
    </section>
  );
};

export default QnAContainer;
