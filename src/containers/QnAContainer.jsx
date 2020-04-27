import React from "react";
import QnAWriteContainer from "./QnAWriteContainer";
import QnAReadContainer from "./QnAReadContainer";

const QnAContainer = () => {
  return (
    <section>
      <QnAWriteContainer />
      <QnAReadContainer />
    </section>
  );
};

export default QnAContainer;
