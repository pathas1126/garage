/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../store";
import { Button, NoticeRow } from "../components";
import { Link } from "react-router-dom";
import { fetchData } from "../library";

const NoticeContainer = () => {
  const [noticePosts, setNoticePosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageArray, setPageArray] = useState([]);
  const {
    loginStatus: { admin },
  } = useContext(LoginContext);

  useEffect(() => {
    fetchData({ method: "GET", url: `/notice?page=${page}` })
      .then((res) => {
        const { resArr, maxPage } = res.data;
        setNoticePosts((prevPosts) => resArr);
        setPageArray((prevPageArray) => maxPage);
      })
      .catch((err) => {
        throw err;
      });
  }, [page]);

  return (
    <section>
      {admin && (
        <header css={headerStyle}>
          <Link to="/notice/write">
            <Button color="warning" size="big">
              공지사항 작성
            </Button>
          </Link>
        </header>
      )}
      <table style={{ width: "100%" }}>
        <tbody>
          {noticePosts.map((v, i) => (
            <NoticeRow
              key={v.notice_Number}
              notice_Date={v.notice_Date}
              notice_Id={v.notice_Id}
              notice_Subject={v.notice_Subject}
              manager_Id={v.manager_Id}
              admin={admin}
            />
          ))}
        </tbody>
      </table>
      <footer css={footerStyle}>
        {pageArray.map((v, i) => (
          <Button
            key={i}
            variation="noborder"
            onClick={() => {
              setPage((prevPage) => v);
              window.scrollTo({ top: 0 });
            }}
          >
            {v}
          </Button>
        ))}
      </footer>
    </section>
  );
};

const headerStyle = css`
  margin: 3rem auto;
  display: flex;
  justify-content: center;
  a {
    text-decoration: none;
  }
`;

const footerStyle = css`
  width: 100%;
  margin: 1rem 0rem;
  display: flex;

  align-items: center;
  justify-content: center;
`;

export default NoticeContainer;
