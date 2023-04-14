import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/header";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home";


const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/home" exact element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
