/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import { Input, Button } from "../components";
import { useState } from "react";
import { fetchData } from "../library";

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
    e.preventDefault();
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
      <form onSubmit={onSubmit}>
        <table css={tableContainerWrapper}>
          <tbody>
            <tr>
              <td colSpan="2">
                <Input
                  name="item_Name"
                  width="140%"
                  autoFocus={true}
                  placeholder="제목을 입력해 주세요"
                  value={item_Name}
                  onChange={setValues}
                />
              </td>
            </tr>
            <tr>
              <td>거래 위치</td>
              <td>
                <Input
                  name="deal_Location"
                  width="13rem"
                  value={deal_Location}
                  onChange={setValues}
                />
              </td>
            </tr>
            <tr>
              <td>연락처</td>
              <td>
                <Input
                  name="sales_Contact"
                  width="13rem"
                  value={sales_Contact}
                  onChange={setValues}
                />
              </td>
            </tr>
            <tr>
              <td>카카오톡 ID</td>
              <td>
                <Input
                  name="sales_KakaoId"
                  width="13rem"
                  value={sales_KakaoId}
                  onChange={setValues}
                />
              </td>
            </tr>
            <tr>
              <td>삽니다/팝니다</td>
              <td>
                <Input
                  name="item_Status"
                  width="13rem"
                  value={item_Status}
                  onChange={setValues}
                />
              </td>
            </tr>
            <tr>
              <td>가격</td>
              <td>
                <Input
                  name="item_Price"
                  width="13rem"
                  value={item_Price}
                  onChange={setValues}
                />
              </td>
            </tr>
            <tr>
              <td>제조사</td>
              <td>
                <Input
                  name="item_Brand_model"
                  width="13rem"
                  value={item_Brand_model}
                  onChange={setValues}
                />
              </td>
            </tr>
            <tr>
              <td>악기 분류</td>
              <td>
                <Input
                  name="item_Sort"
                  width="13rem"
                  value={item_Sort}
                  onChange={setValues}
                />
              </td>
            </tr>
            <tr>
              <td>작성자</td>
              <td>
                <Input
                  name="item_Writer"
                  width="13rem"
                  value={item_Writer}
                  onChange={setValues}
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
                <td colSpan="2">
                  <img
                    src={uploadedImg.filePath}
                    alt="productImage"
                    width="50rem"
                    hieght="50rem"
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
            width: "100%",
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
  width: 90%;
  height: 100%;
  margin: 3rem auto;
  align-items: center;
`;

const tableContainerWrapper = css`
  margin-bottom: 3rem;
`;

const ButtonWrapper = css`
  margin-top: 1rem;
`;

export default React.memo(WriteContainer);
