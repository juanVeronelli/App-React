import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import Register from "./components/pages/register";
import Login from "./components/pages/login";
import Home from "./components/pages/home";
import Profile from "./components/pages/profile";
import Dashboard from "./components/pages/dashboard";
import UploadMenu from "./components/helpers/addPhoto";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/post" exact element={<UploadMenu />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
