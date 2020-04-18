/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useState } from "react";
import { Input, Button } from "../components";
import { fetchData } from "../library";
import { COLORS } from "../assets/colors";

const WriteContainer = () => {
  const [post, setPost] = useState({
    item_Name: "",
    deal_Location: "",
    sales_KakaoId: "",
    sales_Contact: "",
    item_Status: "",
    item_Price: "",
    item_Brand_model: "",
    item_Sort: "",
    item_Writer: "",
    item_Detail: "",
    item_Number: Date.now(),
    item_Picture: "",
    user_Id: "",
  });

  const {
    item_Name,
    deal_Location,
    sales_KakaoId,
    sales_Contact,
    item_Status,
    item_Price,
    item_Brand_model,
    item_Sort,
    item_Writer,
    item_Detail,
  } = post;

  const [uploadedImg, setUploadedImg] = useState({
    fileName: "",
    filePath: "",
  });

  const setValues = (e) => {
    const { value, name } = e.target;
    setPost({ ...post, [name]: value });
  };

  const getImage = (e) => {
    const imgFile = e.target.files[0];

    const formData = new FormData();
    formData.append("img", imgFile);

    fetchData({ method: "POST", data: formData, url: "/sales/image" }).then(
      (res) => {
        if (res) {
          console.log(res);
          const { fileName } = res.data;
          setUploadedImg({
            fileName,
            filePath: `/images/${fileName}`,
          });
          setPost({ ...post, item_Picture: `/images/${fileName}` });
        }
      }
    );
  };

  const onSubmit = (e) => {
    // 데이터 전송
    const data = post;

    fetchData({
      method: "POST",
      data: { ...data, item_Price: Number(item_Price) },
      url: "/sales/write",
    }).then((res) => {
      if (res.data) {
        setPost({
          item_Name: "",
          deal_Location: "",
          sales_KakaoId: "",
          sales_Contact: "",
          item_Status: "",
          item_Price: "",
          item_Brand_model: "",
          item_Sort: "",
          item_Writer: "",
          item_Detail: "",
          item_Picture: "",
        });
        alert("글이 성공적으로 작성되었습니다.");
        window.location.href = "/sales";
      }
    });
  };

  return (
    <section css={WriteContainerWrapper}>
      <form onSubmit={onSubmit} css={formContainerWrapper}>
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <Input
                  name="item_Name"
                  width="100%"
                  autoFocus={true}
                  placeholder="제목을 입력해 주세요"
                  value={item_Name}
                  onChange={setValues}
                  required={true}
                />
              </td>
            </tr>
            <tr>
              <td>거래 위치</td>
              <td>
                <Input
                  name="deal_Location"
                  width="80%"
                  placeholder="거래 위치를 입력해 주세요"
                  value={deal_Location}
                  onChange={setValues}
                  required={true}
                />
              </td>
            </tr>
            <tr>
              <td>연락처</td>
              <td>
                <Input
                  name="sales_Contact"
                  width="80%"
                  placeholder="연락처를 입력해 주세요"
                  value={sales_Contact}
                  onChange={setValues}
                  required={true}
                />
              </td>
            </tr>
            <tr>
              <td>카카오톡 ID</td>
              <td>
                <Input
                  name="sales_KakaoId"
                  width="80%"
                  value={sales_KakaoId}
                  onChange={setValues}
                  placeholder="카카오톡 아이디를 입력해 주세요"
                />
              </td>
            </tr>
            <tr>
              <td>삽니다/팝니다</td>
              <td>
                <Input
                  name="item_Status"
                  width="80%"
                  placeholder="악기를 사실 건가요, 파실 건가요?"
                  value={item_Status}
                  onChange={setValues}
                  required={true}
                />
              </td>
            </tr>
            <tr>
              <td>가격</td>
              <td>
                <Input
                  name="item_Price"
                  width="80%"
                  value={item_Price}
                  placeholder="가격은 숫자만 입력해 주세요"
                  onChange={setValues}
                  required={true}
                />
              </td>
            </tr>
            <tr>
              <td>제조사</td>
              <td>
                <Input
                  name="item_Brand_model"
                  width="80%"
                  value={item_Brand_model}
                  onChange={setValues}
                  placeholder="제조사를 입력해 주세요"
                />
              </td>
            </tr>
            <tr>
              <td>악기 분류</td>
              <td>
                <Input
                  name="item_Sort"
                  width="80%"
                  value={item_Sort}
                  onChange={setValues}
                  required={true}
                  placeholder="악기의 종류를 입력해 주세요"
                />
              </td>
            </tr>
            <tr>
              <td>작성자</td>
              <td>
                <Input
                  name="item_Writer"
                  width="80%"
                  value={item_Writer}
                  onChange={setValues}
                  placeholder="작성자를 입력해 주세요"
                />
              </td>
            </tr>
            <tr>
              <td>이미지</td>
              <td>
                <input type="file" onChange={getImage} />
              </td>
            </tr>
            {uploadedImg.fileName ? (
              <tr>
                <td colSpan="2" css={imageWrapper}>
                  <img
                    src={uploadedImg.filePath}
                    alt="productImage"
                    width="100%"
                  />
                </td>
                <td></td>
              </tr>
            ) : null}
          </tbody>
        </table>
        <textarea
          style={{
            padding: "1rem",
            margin: "3rem auto",
            width: "90%",
            height: "14rem",
            boxSizing: "border-box",
            border: "1px solid black",
            borderRadius: "0.2rem",
            resize: "none",
          }}
          name="item_Detail"
          value={item_Detail}
          onChange={setValues}
        ></textarea>
        <div css={ButtonWrapper}>
          <Button width="100%" variation="outline">
            작성 하기
          </Button>
        </div>
      </form>
    </section>
  );
};

const WriteContainerWrapper = css`
  width: 30rem;
  padding: 2rem;
  margin: 3rem auto;
  border: 1px solid ${COLORS.primary};
  border-radius: 1rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }
`;

const formContainerWrapper = css`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const imageWrapper = css`
  width: 350px;

  img {
    margin-top: 1rem;
  }
`;

const ButtonWrapper = css`
  margin-top: 1rem;
`;

export default React.memo(WriteContainer);
