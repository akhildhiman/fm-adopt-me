import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import "core-js/stable";
import "regenerator-runtime/runtime";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <SearchParams />
    </div>
  );
};

render(<App />, document.getElementById("root"));
