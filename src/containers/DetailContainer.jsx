import React, { useEffect, useState } from "react";
import { Detail, Loader } from "../components";
import { fetchData } from "../library";

const DetailContainer = ({ data, item_Id }) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData({
      method: "POST",
      url: `/sales/detail/`,
      data: { item_Id },
    })
      .then((data) => {
        setItem((prevItem) => data.data);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, [item_Id]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <Detail
          item_Number={item.item_Number}
          user_Id={item.user_Id}
          item_Writer={item.item_Writer}
          item_Sort={item.item_Sort}
          item_Brand_model={item.item_Brand_model}
          item_Price={item.item_Price}
          item_Detail={item.item_Detail}
          item_Status={item.item_Status}
          sales_Contact={item.sales_Contact}
          sales_KakaoId={item.sales_KakaoId}
          deal_Location={item.deal_Location}
          item_Name={item.item_Name}
          item_Picture={item.item_Picture}
        />
      )}
    </>
  );
};

export default DetailContainer;
