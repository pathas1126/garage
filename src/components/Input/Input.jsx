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
  onBlur,
  type = "text",
  required = false,
  noborder,
}) => {
  return (
    <input
      id={name}
      type={type}
      css={setStyle({ type, width, noborder })}
      name={name}
      value={value}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
    ></input>
  );
};

const setStyle = ({ type, width, noborder }) => {
  const defaultStyle = css`
    padding: 0.8rem 0 0.2rem 0;
    width: 12rem;
    height: 1.4rem;
    border: none;
    border-bottom: 1px solid #0c0c0c;
    outline: none;
    &:focus {
      transform: scale(1.05);
      transition: 0.1s ease-out;
    }
    & + & {
      margin-top: 1rem;
    }
  `;

  const TYPES = {
    number: css`
      outline: none;
      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    `,
    file: css`
      display: none;
    `,
    radio: css`
      width: 1rem;
    `,
  };

  return [defaultStyle, TYPES[type], { width }, noborder && { border: "none" }];
};
export default React.memo(Input);
