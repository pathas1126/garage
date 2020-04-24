import React, { useEffect, useState } from "react";
import { Detail, Loader } from "../components";
import { fetchData } from "../library";

const DetailContainer = ({ data, item_Id }) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [item_Replies, setItem_Replies] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchData({
      method: "GET",
      url: `/sales/detail/item/${item_Id}`,
    })
      .then((data) => {
        const { itemDetail, itemReply } = data.data;
        setItem_Replies((prevReplies) => itemReply);
        setItem((prevItem) => itemDetail);
        setLoading(false);
      })
      .catch((err) => {
        // 개발용
        alert("DB에 같은 아이디로 저장된 문서가 있습니다.");
        throw err;
      });
  }, [item_Id]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <Detail
          setItem_Replies={setItem_Replies}
          item_Replies={item_Replies}
          item_Number={item.item_Number}
          user_Id={item.user_Id}
          item_Writer={item.item_Writer}
          item_Sort={item.item_Sort}
          item_Price={item.item_Price}
          item_Detail={item.item_Detail}
          item_Date={item.item_Date}
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
