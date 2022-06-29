import "./App.css";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import City from "./components/City/City";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/weather/:city" element={<City />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
