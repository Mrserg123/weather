import * as React from "react";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import City from "./components/City/City";

function App() {
  return (
    <>
      {/* <BrowserRouter> */}
      <HashRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/weather/:city" element={<City />} />
        </Routes>
      </HashRouter>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
