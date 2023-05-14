import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../helpers/header";


const Register = () => {
  const navigator = useNavigate();
  const [user, setUser] = useState(
    {
      username: "",
      password: "", 
      email: "",
    },
    []
  );

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/register", user);
      navigator('/login')
    } catch (error) {
      console.error(error);
    }
  };

  return (<>
    <Header />
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5 col-xl-4">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">Registro</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3 animate__animated animate__fadeIn">
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder=" "
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="inputUsername">Nombre de usuario</label>
                </div>
                <div className="form-floating mb-3 animate__animated animate__fadeIn">
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder=" "
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email">Correo electrónico</label>
                </div>
                <div className="form-floating mb-3 animate__animated animate__fadeIn">
                  <input
                    className="form-control"
                    id="password"
                    type="password"
                    placeholder=" "
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="password">Contraseña</label>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4 mb-0 animate__animated animate__fadeIn">
                  <button className="btn btn-primary" type="submit">
                    Registrarse
                  </button>
                  <a className="small" href={"/login"}>
                    ¿Ya tienes una cuenta? Inicia sesión
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

export default Register;
