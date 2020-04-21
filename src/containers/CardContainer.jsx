import React from "react";
import { Card } from "../components";

const CardContainer = ({ data }) => {
  return (
    <>
      {data.length > 0 &&
        data.map((v) => (
          <Card
            key={v.item_Number}
            item_Number={v.item_Number}
            user_Id={v.user_Id}
            item_Writer={v.item_Writer}
            item_Sort={v.item_Sort}
            item_Price={v.item_Price}
            item_Detail={v.item_Detail}
            sales_Contact={v.sales_Contact}
            sales_KakaoId={v.sales_KakaoId}
            deal_Location={v.deal_Location}
            item_Name={v.item_Name}
            item_Picture={v.item_Picture}
          />
        ))}
    </>
  );
};

export default CardContainer;
