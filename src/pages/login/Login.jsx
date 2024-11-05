import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: " ",
    password: " ",
  });

  //   const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "hhttps://peace-tab-database.onrender.com/api/auth/login",
        credentials
      );
      const usss = res.data.details.username;

      localStorage.setItem("user", usss);
      navigate("/dashboard");
      setCredentials({ username: " ", password: " " });
    } catch (error) {
      alert("Credential Incorrect");
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button onClick={handleClick} className="lButton">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
