import React, { useEffect } from "react";
import { PageTemplate } from "../components";
import { fetchData } from "../library";

const Main = () => {
  useEffect(() => {
    fetchData({
      method: "POST",
      data: { test: "test" },
      url: "/add/data",
      header: new Headers(),
    });
  }, []);
  return (
    <>
      <PageTemplate>
        <h1>MAIN PAGE</h1>
      </PageTemplate>
    </>
  );
};

export default Main;
