import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/register", user);
      console.log(response.data);
      // Aquí puedes redirigir al usuario a otra página
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register">
      <div id="formulario" className="card mx-auto mb-3 mt-5">
        <div className="card-header text-dark">
          <h4> Registrarse </h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label> Username </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Username"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label> Password </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label> Email </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="submit"
                className="form-control btn btn-primary"
                id="push"
                value="Register"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;