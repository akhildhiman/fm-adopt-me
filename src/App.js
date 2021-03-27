import React, { useState } from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { Router, Link } from "@reach/router";
import ThemeContext from "./ThemeContext";

const App = () => {
  const themeHook = useState("peru");``
  console.log("themeHook=>", themeHook);
  return (
    <ThemeContext.Provider value={themeHook}>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
