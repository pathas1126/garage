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
    padding: 0.2rem;
    width: 12rem;
    height: 1.4rem;
    border: none;
    border-bottom: 1px dashed;
    &:focus {
      transform: scaleX(1.05);
      transition: 0.1s ease-out;
    }
    & + & {
      margin-top: 1rem;
    }
  `;

  return [defaultStyle];
};
export default Input;
