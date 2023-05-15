import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import axios from "axios";
import Header from "../helpers/header";
import cookie from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  // save values
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", user);
      if (response.data) {
        cookie.set("token", response.data.token); // save token in cookie
        return navigate("/home", { state: { userData: response.data.token } });
      }
      setData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    const token = cookie.get("token"); // get cookie token
    if (token) {
      try {
        const decoded = jwt(token);
        if (decoded.exp * 1000 < Date.now()) {
          // expired token, remove cookie and redirect to login
          cookie.remove("token");
          navigate("/login");
        } else {
          // valid token, redirect to home
          navigate("/home", { state: { userData: token } });
        }
      } catch (error) {
        // error decoding token, delete cookie and redirect to login
        cookie.remove("token");
        navigate("/login");
      }
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 w-100 col-xl-4">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  Inicio de sesión
                </h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3 animate__animated animate__fadeIn">
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      name="email"
                      value={user.email}
                      placeholder=" "
                      required
                      onChange={handleChange}
                    />
                    <label htmlFor="email">Correo electrónico</label>
                  </div>
                  <div className="form-floating mb-3 animate__animated animate__fadeIn">
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      name="password"
                      value={user.password}
                      placeholder=" "
                      required
                      onChange={handleChange}
                    />
                    <label htmlFor="password">Contraseña</label>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-4 mb-0 animate__animated animate__fadeIn">
                    <button className="btn btn-primary" type="submit">
                      Iniciar sesión
                    </button>
                    <a className="small" href="/register">
                      ¿No tienes una cuenta? Regístrate
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
