/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { useEffect, useState } from "react";
import { fetchData } from "../library";

const QnAReadContainer = () => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData({ method: "GET", url: `/qna?page=${page}` })
      .then((res) => {
        console.log(res.data);
        const { resArr, maxPage } = res.data;
        if (res.data) {
          console.log(resArr);
          console.log(maxPage);
        }
      })
      .catch((err) => {
        throw err;
      });
  }, [page]);
  return (
    <section css={sectionWrapper}>
      <h1>등록된 질문</h1>
    </section>
  );
};

const sectionWrapper = css`
  width: 70%;
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
`;

export default QnAReadContainer;
