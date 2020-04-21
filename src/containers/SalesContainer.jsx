import React, { useState, useEffect } from "react";
import { fetchData } from "../library";
import { CardContainer } from "./index";
import { Loader } from "../components";

const SalesContainer = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchData({ method: "GET", url: "/sales/items" })
      .then((data) => {
        setItems((prevItems) => prevItems.concat(data.data));
        setLoading(false);
      })
      .catch((err) => {
        throw err;
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
      {loading && <Loader />}
      {!loading && <CardContainer data={items} />}
    </section>
  );
};

export default SalesContainer;
