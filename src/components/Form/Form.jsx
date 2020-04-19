/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Form = ({ children, onSubmit }) => {
  return (
    <form css={formWrapper} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

const formWrapper = css`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  textarea {
    margin: 2rem 0;
    padding: 1rem;
    width: 90%;
    height: 14rem;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 0.2rem;
    resize: none;
  }
  td > button {
    margin-top: 1rem;
  }
`;

export default Form;
