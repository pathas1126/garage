/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { Input } from "../Input";
import { useState, useEffect } from "react";
import { Button } from "../Button";
import { FaLock, FaUnlockAlt } from "react-icons/fa";
import { QnADetail } from "../QnADetail";

const QnA = ({
  qna_Number,
  qna_Writer,
  qna_Password,
  qna_Subject,
  qna_Content,
  qna_Date,
  setQna,
}) => {
  const [unlocked, setUnlocked] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const getPassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === qna_Password) {
      setShowInput(false);
      setUnlocked(true);
    } else {
      alert("비밀번호가 맞지 않습니다.");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin")) {
      setAdmin(sessionStorage.getItem("admin"));
    }
  }, []);

  return (
    <section css={QnAWrapperStyle}>
      <header css={headerStyle}>
        <h3>{qna_Subject}</h3>
        <div css={headerRightWrapper}>
          {showInput ? (
            <form onSubmit={onSubmit}>
              <Input
                type="password"
                name="password"
                value={password}
                width="85%"
                onChange={getPassword}
                onBlur={() => {
                  setShowInput(false);
                }}
                placeholder="비밀번호 입력 후 Enter"
              />
            </form>
          ) : (
            <div>
              <span>{qna_Date}</span>
              <span>{qna_Writer}</span>
              {unlocked ? (
                <Button variation="outline" color="warning" disabled>
                  <FaUnlockAlt />
                </Button>
              ) : (
                <Button
                  variation="outline"
                  color="teritiaty"
                  onClick={() => {
                    setShowInput(true);
                  }}
                >
                  <FaLock />
                </Button>
              )}
            </div>
          )}
        </div>
      </header>

      {(unlocked || admin) && (
        <QnADetail
          qna_Content={qna_Content}
          setQna={setQna}
          qna_Number={qna_Number}
          qna_Writer={qna_Writer}
          qna_Password={qna_Password}
          qna_Subject={qna_Subject}
          qna_Date={qna_Date}
        />
      )}
    </section>
  );
};

const QnAWrapperStyle = css`
  margin: 1rem auto;
  width: 100%;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);
    transition: 0.3s;
  }
`;

const headerStyle = css`
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    margin: 0;
  }
`;

const headerRightWrapper = css`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  div + span {
    font-size: 0.1rem;
  }
  span:first-of-type {
    padding-top: 0.4rem;
    font-size: 0.8rem;
  }
  span {
    text-align: right;
    min-width: 3rem;
    margin-right: 1rem;
  }
`;
export default QnA;
