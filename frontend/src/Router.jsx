import React, {useEffect} from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import Register from "./components/pages/register";
import Login from "./components/pages/login";
import Home from "./components/pages/home";
import Profile from "./components/pages/profile"

import jwt_decode from "jwt-decode";
import cookie from 'js-cookie'

const Router = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/profile" exact element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </> 
  );
};

export default Router;
