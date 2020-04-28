/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";
import { Input, Button, Form } from "../components";
import { COLORS } from "../assets/colors";
import { fetchData } from "../library";

const NoticeUpdateContainer = ({ notice_Number }) => {
  const [noticePost, setNoticePost] = useState({
    notice_Number: "",
    manager_Id: "",
    notice_Subject: "",
    notice_Content: "",
    notice_Date: "",
    notice_Readcount: 0,
  });

  const { notice_Subject, notice_Content } = noticePost;

  useEffect(() => {
    if (!sessionStorage.getItem("admin")) {
      alert("관리자만 조회 가능합니다.");
      return (window.location.href = "/");
    }
  }, []);

  useEffect(() => {
    fetchData({ method: "GET", url: `/notice/${notice_Number}` }).then(
      (res) => {
        setNoticePost((prevPost) => ({ ...res.data }));
      }
    );
  }, [notice_Number]);

  const setValues = (e) => {
    const { name, value } = e.target;
    setNoticePost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetchData({
      method: "PUT",
      url: `/notice/${notice_Number}`,
      data: {
        ...noticePost,
      },
    })
      .then((res) => {
        if (res.data) {
          alert("공지사항을 수정했습니다.");
          return (window.location.href = "/notice");
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  return (
    <section css={WriteContainerWrapper}>
      <Form onSubmit={onSubmit}>
        <Input
          width="87%"
          name="notice_Subject"
          value={notice_Subject}
          placeholder="제목을 입력해 주세요."
          onChange={setValues}
          required
        ></Input>
        <textarea
          name="notice_Content"
          value={notice_Content}
          placeholder="내용을 입력해 주세요."
          onChange={setValues}
          required
        ></textarea>
        <Button type="sumbit" width="90%">
          글 쓰기
        </Button>
      </Form>
    </section>
  );
};

const WriteContainerWrapper = css`
  width: 30rem;
  padding: 2rem;
  margin: 3rem auto;
  border: 1px solid ${COLORS.primary};
  border-radius: 1rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }
`;

export default NoticeUpdateContainer;
