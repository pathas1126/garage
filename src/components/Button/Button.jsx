/**  @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";

// 버튼 컴포넌트
const Button = ({
  children,
  onClick,
  color = "primary",
  size = "medium",
  variation,
  width,
}) => {
  console.log(color);
  return (
    <button css={setStyle({ color, size, variation, width })} onClick={onClick}>
      {children}
    </button>
  );
};

// 스타일 설정 함수
const setStyle = ({ color, size, variation, width }) => {
  // 색상 객체
  const COLORS = {
    primary: "#774836",
    secondary: "#82363A",
    teritiaty: "#2E2A39",
  };

  // 사이즈 객체
  const SIZES = {
    small: css`
      padding: 0 0.5rem;
      height: 2rem;
      font-size: 0.4rem;
    `,
    medium: css`
      padding: 0 1rem;
      height: 3rem;
      font-size: 0.8rem;
    `,
    big: css`
      padding: 0 1.4rem;
      height: 4rem;
      font-size: 1.2rem;
    `,
  };

  // 변형 스타일 객체
  const VARIATIONS = {
    outline: css`
      border: 1px solid ${COLORS[color]};
      color: ${COLORS[color]};
      background: #fff;
      &:active {
        background: ${COLORS[color]};
        color: white;
        transition: 0.4s;
      }
    `,
  };

  // 기본 스타일
  const defaultStyle = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0.4rem;
    background: ${COLORS[color]};
    border: none;
    color: white;
    font-size: 1.3rem;
    border-radius: 0.5rem;

    /* 버튼 클리 시 스타일 */
    &:active {
      transform: scale(0.98);
      box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.12),
        0 0 2px 2px rgba(0, 0, 0, 0.12), 0 0 4px 4px rgba(0, 0, 0, 0.12),
        0 0 8px 8px rgba(0, 0, 0, 0.12);
    }

    & + button {
      margin-left: 3rem;
    }
  `;
  // width는 인라인으로 직접 적용하는 것이기 때문에 객체로 리턴
  return [defaultStyle, SIZES[size], VARIATIONS[variation], { width }];
};

// 버튼 컴포넌트에서 받는 Props 관리
// isRequired는 필수 입력 사항으로, 미입력 시 에러 발생
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.string,
  variation: PropTypes.string,
  width: PropTypes.string,
};

export default Button;
