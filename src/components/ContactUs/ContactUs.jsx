/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import emailjs from "emailjs-com";
import { SERVICE_ID, TEMPLATE_ID, EMAILJS_KEY } from "../../assets/keys";
import { Input, Button } from "../index";

const ContactUs = ({ contactInfo, setContactInfo }) => {
  const { user_name, user_email, message } = contactInfo;

  // 인풋 값 가져오는 함수
  const getValues = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  // 이메일 전송 함수
  const sendEmail = (e) => {
    e.preventDefault();

    console.log(e.target);
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, EMAILJS_KEY).then(
      (result) => {
        setContactInfo({
          user_name: "",
          user_email: "",
          message: "",
        });
        alert("성공적으로 메일을 보냈습니다.");
      },
      (error) => {
        alert("메일을 보낼 수 없습니다.");
      }
    );
  };

  return (
    <section css={ContactUsStyle}>
      <h1>Contact US</h1>
      <form onSubmit={sendEmail}>
        <input type="hidden" name="contact_number" />
        <div>
          <label htmlFor="user_name">Name</label>
          <Input
            type="text"
            name="user_name"
            onChange={getValues}
            value={user_name}
            autoFocus
            required
          />
        </div>
        <div>
          <label htmlFor="user_email">Email</label>
          <Input
            type="email"
            onChange={getValues}
            name="user_email"
            value={user_email}
            required
          />
        </div>
        <label htmlFor="message">Message</label>
        <textarea
          onChange={getValues}
          value={message}
          name="message"
          id="message"
          required
        />
        <Button
          variation="outline"
          color="teritiaty"
          width="100%"
          type="submit"
        >
          보내기
        </Button>
      </form>
    </section>
  );
};

const ContactUsStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 1.3rem;
    margin-bottom: 0;
  }

  form {
    margin: 2rem auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div > label {
      display: inline-block;
      width: 3rem;
      margin-right: 1rem;
    }
    div + label {
      margin-top: 1.5rem;
    }
    textarea {
      margin-top: 1rem;
      margin-bottom: 1.8rem;
      display: inline-block;
      width: 100%;
      height: 10rem;
      resize: none;
    }
  }
`;

export default ContactUs;
