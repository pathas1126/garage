/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Modal = ({ title, children }) => {
  return (
    <section css={setStyle()}>
      <article>
        {title && <h1>{title}</h1>}
        {children}
      </article>
    </section>
  );
};

const setStyle = () => {
  const defaultStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(222, 222, 222, 0.6);
    article {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: white;
      width: 25rem;
      height: 32rem;
      border-radius: 1rem;
    }
  `;

  return [defaultStyle];
};

export default Modal;
