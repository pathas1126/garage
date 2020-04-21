/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useState } from "react";
import { Input, Button, Form, Select } from "../components";
import { fetchData } from "../library";
import { COLORS } from "../assets/colors";
import { Label } from "../components/Label";

const WriteContainer = () => {
  const [post, setPost] = useState({
    item_Name: "",
    deal_Location: "",
    sales_KakaoId: "",
    sales_Contact: "",
    item_Status: "",
    item_Price: "",
    item_Brand_model: "",
    item_Sort: "기타",
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
    item_Price,
    item_Brand_model,
    item_Detail,
  } = post;

  const [uploadedImg, setUploadedImg] = useState({
    fileName: "",
    filePath: "",
  });

  const setValues = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
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
    const user_Id = sessionStorage.getItem("user_Id");
    const data = post;

    fetchData({
      method: "POST",
      data: {
        ...data,
        user_Id,
        item_Price: Number(item_Price),
        item_Writer: user_Id,
      },
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
        window.location.href = "/sales";
        return alert("글이 성공적으로 작성되었습니다.");
      }
    });
  };

  return (
    <section css={WriteContainerWrapper}>
      <Form onSubmit={onSubmit}>
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
              <td>
                <Label htmlFor="deal_Location">거래 위치</Label>
              </td>
              <td>
                <Input
                  name="deal_Location"
                  placeholder="거래 위치를 입력해 주세요"
                  value={deal_Location}
                  onChange={setValues}
                  required={true}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="sales_Contact">연락처</Label>
              </td>
              <td>
                <Input
                  name="sales_Contact"
                  placeholder="연락처를 입력해 주세요"
                  value={sales_Contact}
                  onChange={setValues}
                  required={true}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="sales_KakaoId">카카오톡 ID</Label>
              </td>
              <td>
                <Input
                  name="sales_KakaoId"
                  value={sales_KakaoId}
                  onChange={setValues}
                  placeholder="카톡 아이디를 입력해 주세요"
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="item_Status">팝니다/삽니다</Label>
              </td>
              <td>
                <div css={radioWrapper}>
                  <Input
                    name="item_Status"
                    placeholder="악기를 사실 건가요, 파실 건가요?"
                    value="팝니다"
                    onChange={setValues}
                    type="radio"
                    required={true}
                  />
                  <Label htmlFor="item_Stauts">팝니다</Label>

                  <Input
                    name="item_Status"
                    placeholder="악기를 사실 건가요, 파실 건가요?"
                    value="삽니다"
                    onChange={setValues}
                    type="radio"
                  />
                  <Label htmlFor="item_Stauts">삽니다</Label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="item_Price">가격</Label>
              </td>
              <td>
                <Input
                  name="item_Price"
                  value={item_Price}
                  placeholder="가격은 숫자만 입력해 주세요"
                  onChange={setValues}
                  required={true}
                  type="number"
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="item_Brand_model">제조사</Label>
              </td>
              <td>
                <Input
                  name="item_Brand_model"
                  value={item_Brand_model}
                  onChange={setValues}
                  placeholder="제조사를 입력해 주세요"
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="item_Sort">악기 분류</Label>
              </td>
              <td>
                <Select
                  value={["기타", "드럼", "베이스", "키보드"]}
                  onChange={setValues}
                  name="item_Sort"
                ></Select>
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="item_Image" file={true}>
                  이미지 업로드
                </Label>
              </td>
              <td>
                <div>
                  <Input type="file" name="item_Image" onChange={getImage} />
                </div>
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
          name="item_Detail"
          value={item_Detail}
          onChange={setValues}
        ></textarea>
        <Button width="90%" variation="outline" type="submit">
          작성 하기
        </Button>
      </Form>
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

const radioWrapper = css`
  margin-top: 0.3rem;
  align-items: center;
  word-break: keep-all;
  flex-wrap: wrap;
`;

const imageWrapper = css`
  width: 350px;
  img {
    margin-top: 1rem;
  }
`;

export default React.memo(WriteContainer);
