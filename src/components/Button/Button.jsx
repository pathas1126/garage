/**  @jsx jsx */
import { jsx, css } from "@emotion/core";

const Button = ({ children, onClick, color, size = "medium" }) => {
  console.log(color);
  return (
    <button css={setStyle({ color, size })} onClick={onClick}>
      {children}
    </button>
  );
};

const setStyle = ({ color, size }) => {
  const COLORS = {
    primary: "#cd6133",
    secondary: "#2C3A47",
    teritiaty: "#706fd3",
  };

  const SIZES = {
    small: css`
      padding: 0.2rem;
      width: 3rem;
      height: 2rem;
    `,
    medium: css`
      padding: 0.4rem;
      width: 4.5rem;
      height: 3.3rem;
    `,
    big: css`
      padding: 1rem;
      width: 6rem;
      height: 4.3rem;
    `,
  };

  const defaultStyle = css`
    ${SIZES[size]}
    background: ${COLORS[color]};
    border: none;
    color: white;
    font-size: 1.3rem;
    border-radius: 8%;

    &:active {
      transform: scale(0.99);
    }

    & + & {
      margin-left: 100px;
    }
  `;
  return defaultStyle;
};

export default Button;
