/**  @jsx jsx */
import { jsx, css } from "@emotion/core";

const Button = ({ onClick }) => {
  return (
    <button css={ButtonStyle} onClick={onClick}>
      Button
    </button>
  );
};

const ButtonStyle = css`
  border: 1px solid red;

  &:hover {
    border: 2px solid blue;
  }

  div {
    color: white;
  }
`;

export default Button;
