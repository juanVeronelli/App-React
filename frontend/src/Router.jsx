import React from "react" ;
import Header from "./components/header"
import Register from "./components/register"
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
