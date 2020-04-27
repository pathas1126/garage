/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { useEffect, useState } from "react";
import { fetchData } from "../library";
import { Button, QnA } from "../components";

const QnAReadContainer = ({ qna, setQna }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);

  useEffect(() => {
    fetchData({ method: "GET", url: `/qna?page=${page}` })
      .then((res) => {
        if (res.data) {
          const { resArr, maxPage } = res.data;
          setQna((prevQna) => resArr);
          const tmpTotalpages = [];
          for (let i = 1; i <= maxPage; i++) {
            tmpTotalpages.push(i);
          }
          setTotalPages((prevTotal) => tmpTotalpages);
        }
      })
      .catch((err) => {
        throw err;
      });
  }, [page, setQna]);

  return (
    <section css={sectionWrapper}>
      <h1>등록된 질문</h1>
      <article>
        {qna.map((v) => (
          <QnA
            key={v.qna_Number}
            qna_Number={v.qna_Number}
            qna_Writer={v.qna_Writer}
            qna_Password={v.qna_Password}
            qna_Subject={v.qna_Subject}
            qna_Content={v.qna_Content}
            qna_Date={v.qna_Date}
            setQna={setQna}
          />
        ))}
      </article>
      <footer css={footerStyle}>
        {totalPages.map((page, i) => (
          <Button
            key={i}
            onClick={() => setPage(i + 1)}
            variation="noborder"
            color="secondary"
          >
            {page}
          </Button>
        ))}
      </footer>
    </section>
  );
};

const sectionWrapper = css`
  width: 70%;
  min-width: 25rem;
  padding: 2rem;
  max-width: 40rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }
  h1 {
    font-size: 1.4rem;
  }
  article {
    width: 100%;
  }
`;

const footerStyle = css`
  margin: 0 auto;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    margin-left: 0;
  }
`;

export default QnAReadContainer;
