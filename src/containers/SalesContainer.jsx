import React, { useState, useEffect } from "react";
import { fetchData } from "../library";

const SalesContainer = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetchData({ method: "GET", url: "/sales" }).then((data) => {
      setItems((prevItems) => prevItems.concat(data.data));
      setLoading(false);
    });
  }, []);
  return (
    <section>
      {loading && <h1>LOADING...</h1>}
      {!loading &&
        items.map((v) => {
          return <></>;
        })}
    </section>
  );
};

export default SalesContainer;
