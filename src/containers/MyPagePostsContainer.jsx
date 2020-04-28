import React, { useEffect, useState } from "react";
import { fetchData } from "../library";
import CardContainer from "./CardContainer";
import { Button } from "../components";

const MyPagePostsContainer = ({ user_Id }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `/users/myposts?id=${user_Id}`,
    })
      .then((res) => {
        const { data } = res;
        setItems((prevItems) => prevItems.concat(data));
      })
      .catch((err) => {
        throw err;
      });
  }, [user_Id]);

  return (
    <section
      style={{
        width: "100%",
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <header
        style={{
          display: "flex",
          marginTop: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Button variation="outline" color="teritiaty">
          상품
        </Button>
        <Button variation="outline" color="teritiaty">
          후기
        </Button>
        <Button variation="outline" color="teritiaty">
          QnA
        </Button>
      </header>
      <h1 style={{ width: "100%", textAlign: "center" }}>
        최근 8개의 게시글만 표시됩니다.
      </h1>
      <CardContainer data={items} />
    </section>
  );
};

export default MyPagePostsContainer;
