import React from "react";
import { Detail } from "../components";

const DetailContainer = ({ data, exitDetail }) => {
  return (
    <Detail
      item_Number={data.item_Number}
      user_Id={data.user_Id}
      item_Writer={data.item_Writer}
      item_Sort={data.item_Sort}
      item_Brand_model={data.item_Brand_model}
      item_Price={data.item_Price}
      item_Detail={data.item_Detail}
      item_Status={data.item_Status}
      sales_Contact={data.sales_Contact}
      sales_KakaoId={data.sales_KakaoId}
      deal_Location={data.deal_Location}
      item_Name={data.item_Name}
      item_Picture={data.item_Picture}
      exitDetail={exitDetail}
    />
  );
};

export default DetailContainer;
