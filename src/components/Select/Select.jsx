/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import propTypes from "prop-types";

const Select = ({ value, name, onChange }) => {
  return (
    <select onChange={onChange} name={name} id={name} css={selectWrapper}>
      {value.length > 0 &&
        value.map((v, i) => (
          <option value={v} key={i}>
            {v}
          </option>
        ))}
    </select>
  );
};

const selectWrapper = css`
  margin: 0.5rem 0;
  padding: 0.2rem;
  outline: none;
  width: 80%;
  &:hover {
    transform: scale(1.02);
  }
`;

Select.propTypes = {
  value: propTypes.array.isRequired,
};

export default Select;
