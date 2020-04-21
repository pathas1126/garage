/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { COLORS } from "../../assets/colors";

const Label = ({ htmlFor, children, file }) => {
  return (
    <label htmlFor={htmlFor} css={[labelStyle, file && fileStyle]}>
      {children}
    </label>
  );
};

const labelStyle = css`
  margin-right: 1.5rem;
`;

const fileStyle = css`
  display: inline-block;
  padding: 0.25rem 0.4rem;
  background: ${COLORS.secondary};
  color: white;
  border-radius: 0.2rem;
  cursor: pointer;
  &:active {
    transform: scale(0.99);
    box-shadow: inset 0 0 10px #000000;
  }
`;

export default Label;
