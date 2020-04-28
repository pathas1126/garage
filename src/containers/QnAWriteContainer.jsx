/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { Input, Button } from "../components";
import { useState, useEffect, Fragment } from "react";
import { fetchData } from "../library";

const QnAWriteContainer = ({ qna, setQna }) => {
  const [qnaData, setQnaData] = useState({
    qna_Number: 0,
    qna_Writer: "",
    qna_Password: "",
    qna_Subject: "",
    qna_Content: "",
    qna_Date: "",
  });
  const [haveSession, setHaveSession] = useState(false);
  const [qna_Writer_Fixed, setQna_Writer_Fixed] = useState("");

  const { qna_Writer, qna_Password, qna_Subject, qna_Content } = qnaData;

  const getValues = (e) => {
    const { name, value } = e.target;
    setQnaData((prevQna) => ({ ...prevQna, [name]: value }));
  };

  useEffect(() => {
    const sessionName = sessionStorage.getItem("user_Name");
    if (sessionName) {
      setQnaData((prevQna) => ({
        ...prevQna,
        qna_Writer: sessionName,
      }));
      setQna_Writer_Fixed(sessionName);
      setHaveSession(true);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    // 게시글 비밀번호 체크
    const pwdCheck = /^[0-9]{4,6}$/;

    if (qna_Subject.trim().length === 0) {
      return alert("제목은 한 글자 이상 입력해 주세요.");
    }
    if (qna_Content.trim().length === 0) {
      return alert("제목은 한 글자 이상 입력해 주세요.");
    }
    if (!pwdCheck.test(qna_Password)) {
      return alert("비밀번호는 4~6자리 숫자만 가능합니다.");
    }
    if (qna_Writer.trim().length === 0) {
      return alert("작성자를 입력해 주세요!");
    }

    const date = new Date();
    const data = {
      ...qnaData,
      qna_Number: Date.now(),
      qna_Date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date
        .toString()
        .slice(16, 24)}`,
    };
    fetchData({
      method: "POST",
      url: "qna",
      data,
    })
      .then((res) => {
        if (res.data) {
          setQna((prevQna) => [data].concat(prevQna));
          setQnaData({
            qna_Number: 0,
            qna_Password: "",
            qna_Subject: "",
            qna_Content: "",
            qna_Date: "",
            qna_Writer: "",
          });

          const sessionName = sessionStorage.getItem("user_Name");
          if (sessionName) {
            setQnaData((prevQna) => ({
              ...prevQna,
              qna_Writer: sessionName,
            }));
          }
          alert("질문을 등록했습니다.");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <section css={sectionWrapper}>
      <h1>질문 등록하기</h1>
      <form css={formStyle} onSubmit={onSubmit}>
        <Input
          width="100%"
          placeholder="제목을 입력하세요"
          name="qna_Subject"
          value={qna_Subject}
          onChange={getValues}
          autoFocus
        />
        <div>
          <label htmlFor="qna_Writer">닉네임</label>
          {haveSession ? (
            <span>{qna_Writer_Fixed}</span>
          ) : (
            <Fragment>
              <Input
                name="qna_Writer"
                value={qna_Writer}
                placeholder="닉네임을 입력하세요."
                onChange={getValues}
              />
            </Fragment>
          )}
        </div>
        <div>
          <label htmlFor="qna_Writer">게시글 비밀번호</label>
          <Input
            name="qna_Password"
            value={qna_Password}
            type="password"
            placeholder="4~6자리 숫자 입력"
            onChange={getValues}
          />
        </div>
        <textarea
          name="qna_Content"
          value={qna_Content}
          onChange={getValues}
          placeholder="질문하실 내용을 입력하세요."
        ></textarea>
        <Button
          variation="outline"
          color="teritiaty"
          type="submit"
          width="100%"
        >
          등록하기
        </Button>
      </form>
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
`;

const formStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  textarea {
    margin: 1rem;
    width: 100%;
    resize: none;
    height: 10rem;
  }
  div {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  div > label {
    display: inline-block;
    width: 12rem;
    margin-right: 1rem;
  }
`;
export default QnAWriteContainer;
