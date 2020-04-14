import React from "react";
import { Button } from "./components/";

function App() {
  return (
    <div className="App">
      {/* primary 색상 버튼, 크기 별로 확인 */}
      <div style={{ marginBottom: "1rem" }}>
        <Button color="primary" size="big">
          BUTTON
        </Button>
        <Button color="primary">BUTTON</Button>
        <Button color="primary" size="small">
          BUTTON
        </Button>
      </div>
      {/* secondary 색상 버튼, 크기 별로 확인 */}
      <div style={{ marginBottom: "1rem" }}>
        <Button color="secondary" size="big">
          BUTTON
        </Button>
        <Button color="secondary">BUTTON</Button>

        <Button color="secondary" size="small">
          BUTTON
        </Button>
      </div>
      {/* teritiaty 색상 버튼, 크기 별로 확인 */}
      <div style={{ marginBottom: "1rem" }}>
        <Button color="teritiaty" size="big">
          BUTTON
        </Button>
        <Button color="teritiaty">BUTTON</Button>
        <Button color="teritiaty" size="small">
          BUTTON
        </Button>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <Button variation="outline" size="big">
          BUTTON
        </Button>
        <Button variation="outline">BUTTON</Button>
        <Button variation="outline" size="small">
          BUTTON
        </Button>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <Button variation="outline" color="teritiaty" size="big" width="100%">
          BUTTON
        </Button>
      </div>
    </div>
  );
}

export default App;
