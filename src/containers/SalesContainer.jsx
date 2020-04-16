import React, { useState, useEffect } from "react";
import { fetchData } from "../library";
import { CardContainer } from "./index";

const SalesContainer = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchData({ method: "GET", url: "/sales/items" }).then((data) => {
      console.log(data);
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
      {!loading && <CardContainer data={items} />}
    </section>
  );
};

export default SalesContainer;
