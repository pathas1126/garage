import React, { useEffect, useState } from "react";
import { fetchData } from "../library";
import CardContainer from "./CardContainer";
import { Button, Loader } from "../components";
import { Link } from "react-router-dom";

const MyPagePostsContainer = ({ user_Id }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `/users/myposts?id=${user_Id}`,
    })
      .then((res) => {
        const { data } = res;
        setItems((prevItems) => prevItems.concat(data));
        setLoading(false);
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
          width: "100%",
          display: "flex",
          flexDirection: "column",
          margin: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ width: "100%", textAlign: "center" }}>
          최근 10개의 게시글만 표시됩니다.
        </h1>
      </header>
      {loading ? <Loader /> : <CardContainer data={items} />}
      <footer
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          margin: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/mypage" style={{ textDecoration: "none", width: "50%" }}>
          <Button width="100%" color="secondary" variation="outline">
            돌아가기
          </Button>
        </Link>
      </footer>
    </section>
  );
};

export default MyPagePostsContainer;
