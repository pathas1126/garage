import React, { useState, useEffect } from "react";
import { fetchData } from "../library";
import { CardContainer } from "./index";
import DetailContainer from "./DetailContainer";

const SalesContainer = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [detail, setDetail] = useState(0);

  const fixDetail = (id) => {
    console.log(id);
    setDetail(id);
  };

  const exitDetail = () => {
    setDetail(0);
  };

  useEffect(() => {
    setLoading(true);
    fetchData({ method: "GET", url: "/sales" }).then((data) => {
      setItems((prevItems) => prevItems.concat(data.data));
      setLoading(false);
    });
  }, []);
  return (
    <section
      style={{
        width: "100%",
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {loading && <h1>LOADING...</h1>}
      {!loading && !detail && (
        <CardContainer data={items} fixDetail={fixDetail} />
      )}
      {!loading && detail > 0 && (
        <DetailContainer data={items[detail - 1]} exitDetail={exitDetail} />
      )}
    </section>
  );
};

export default SalesContainer;
