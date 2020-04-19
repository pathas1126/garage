/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";

const Input = ({
  placeholder,
  width,
  autoFocus,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) => {
  return (
    <input
      id={name}
      type={type}
      css={setStyle({ type, width })}
      name={name}
      value={value}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onChange={onChange}
      required={required}
    ></input>
  );
};

const setStyle = ({ type, width }) => {
  const TYPES = {
    text: css`
      padding: 0.8rem 0 0.2rem 0;
      width: 12rem;
      height: 1.4rem;
      border: none;
      border-bottom: 1px solid #0c0c0c;
      &:focus {
        transform: scale(1.05);
        transition: 0.1s ease-out;
      }
      & + & {
        margin-top: 1rem;
      }
    `,
  };

  return [TYPES[type], { width }];
};
export default React.memo(Input);
