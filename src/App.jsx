import React from "react";
import { Button } from "./components/";

function App() {
  return (
    <div className="App">
      <Button color="primary">확인</Button>
      <Button color="secondary">확인</Button>
      <Button color="teritiaty">확인</Button>
      <div>
        <Button size="big" color="primary">
          확인
        </Button>
        <Button color="secondary">확인</Button>
        <Button size="small" color="teritiaty">
          확인
        </Button>
      </div>
    </div>
  );
}

export default App;
