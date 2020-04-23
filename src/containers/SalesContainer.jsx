import React, { useState, useEffect, useRef } from "react";
import { fetchData } from "../library";
import { CardContainer } from "./index";
import { Loader, Button } from "../components";

const SalesContainer = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(2);

  const loaderRef = useRef();

  // page에 따라 상품 리스트 요청
  useEffect(() => {
    fetchData({ method: "GET", url: `/sales/items?page=${page}` })
      .then((data) => {
        const {
          data: { resArr, maxPage },
        } = data;
        if (resArr.length > 0) {
          setLastPage(maxPage);
          setItems((prevItems) => prevItems.concat(resArr));
        }
      })
      .catch((err) => {
        throw err;
      });
  }, [page]);

  // Loader 컴포넌트에 Intersetion Observer 연결
  useEffect(() => {
    const loaderCurrent = loaderRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.09) {
          setPage((prevPage) => prevPage + 1);
        }
      });
    });
    if (loaderCurrent) {
      observer.observe(loaderCurrent);
    }
    return () => observer.unobserve(loaderCurrent);
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
      <CardContainer data={items} />
      <div style={{ width: "100%" }}>
        {lastPage === page ? (
          <h1 style={{ textAlign: "center" }}>모든 상품을 불러왔습니다.</h1>
        ) : (
          <Loader loaderRef={loaderRef} />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "4rem",
          }}
        >
          <Button
            width="20rem"
            color="secondary"
            size="big"
            onClick={() => window.scrollTo({ top: 10 })}
          >
            위로 올라가기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SalesContainer;
