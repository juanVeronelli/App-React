import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import cookies from 'js-cookie';

const Login = () => {

  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post("http://localhost:3000/login", user);
    if(response.data) return navigate('/home', {state: {userData: response.data}});

    } catch (error) {
      console.log('no se ha iniciado sesion');
    }
  };

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              required
              value={user.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Contraseña"
              required
              value={user.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Contraseña</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  </div>

  );
};

export default Login;
