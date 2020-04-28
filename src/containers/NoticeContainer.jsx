/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useContext, useState, useEffect, Fragment } from "react";
import { LoginContext } from "../store";
import { Button, NoticeRow, Loader } from "../components";
import { Link } from "react-router-dom";
import { fetchData } from "../library";

const NoticeContainer = () => {
  const [noticePosts, setNoticePosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageArray, setPageArray] = useState([]);
  const {
    loginStatus: { admin },
  } = useContext(LoginContext);

  // 공지사항 목록 조회
  useEffect(() => {
    setLoading(true);
    fetchData({ method: "GET", url: `/notice?page=${page}` })
      .then((res) => {
        const { resArr, maxPage } = res.data;
        setNoticePosts((prevPosts) => resArr);
        setPageArray((prevPageArray) => maxPage);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, [page]);

  // 공지사항 세부내용 조회

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
      {!loading ? (
        <Fragment>
          <table style={{ width: "100%" }}>
            <tbody>
              {noticePosts.map((v, i) => (
                <NoticeRow
                  key={v.notice_Number}
                  notice_Date={v.notice_Date}
                  notice_Number={v.notice_Number}
                  notice_Subject={v.notice_Subject}
                  manager_Id={v.manager_Id}
                  notice_Readcount={v.notice_Readcount}
                  notice_Content={v.notice_Content}
                  setNoticePosts={setNoticePosts}
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
        </Fragment>
      ) : (
        <Loader />
      )}
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
