import React from "react";
import { Button } from "./components/";
import { useState } from "react";

function App() {
  const [state, setState] = useState(false);
  const [count, setCount] = useState(8);

  function increase() {
    setCount(count + 1);
  }
  const decrease = () => {
    setCount(count - 1);
  };

  const kjs = () => {
    setState(!state);
  };

  return (
    <div className="App">
      {state ? <div>참</div> : <div>거짓</div>}
      {state || (
        <>
          <Button onClick={increase}></Button>
          <Button onClick={decrease}></Button>
          {count}
        </>
      )}
      <Button onClick={kjs}></Button>
    </div>
  );
}

export default App;
