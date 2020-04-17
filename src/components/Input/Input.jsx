/**@jsx jsx */
import { jsx, css } from "@emotion/core";

const Input = ({ placeholder }) => {
  return (
    <input
      type="text"
      css={setStyle()}
      placeholder={placeholder}
      autofocus
    ></input>
  );
};

const setStyle = () => {
  const defaultStyle = css`
    margin: 0.2rem auto;
    padding: 0.8rem 0 0.2rem 0;

    width: 12rem;
    height: 1.4rem;
    border: none;
    border-bottom: 1px dashed;
    &:focus {
      transform: scale(1.05);
      transition: 0.1s ease-out;
    }
    & + & {
      margin-top: 1rem;
    }
  `;

  return [defaultStyle];
};
export default Input;
