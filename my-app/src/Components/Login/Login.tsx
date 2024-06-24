import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./login.css";
import { CartItem, LoginData } from "../interfacefile";
import { Validatelogin } from "../interfacefile";
import { login } from "../authcontext/authService";
import { useAuth } from "../authcontext/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addfav, newcart } from "../homepage/CartFuncationality";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const { setCurrentUser } = useAuth();
  const dispatch = useDispatch();
  const [validaterr, setValidateerr] = useState<Validatelogin>({
    mail: "",
    pass: ""
  })
  const [LoginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const validateform = (data: LoginData) => {
    const validaterr: Validatelogin = {
      pass: "",
      mail: ""
    };
    if (!data.password) {
      validaterr.pass = 'Password is required';
    }
    if (!data.email) {
      validaterr.mail = 'Email is required';
    }
    return validaterr;
  }
  const handleSubmit = async () => {
    const newerrors: Validatelogin = validateform(LoginData);
    setValidateerr(newerrors);
    if (newerrors.mail.length === 0 && newerrors.pass.length === 0) {
      const result = await login(LoginData.email, LoginData.password);
      if (result.msg === "Success") {
        setCurrentUser(result);
        const getcartdata = await axios.get(`http://192.168.10.103:3036/getcartdata/${result.user_id}`);
        const data: CartItem[] = getcartdata.data.cartdata;
        const favdata: CartItem[] = getcartdata.data.favdata;
        data.forEach(element => {
          dispatch(newcart(element))
        });
        favdata.forEach(element => {
          dispatch(addfav(element))
        });
        const from = location.state?.from?.pathname || "/";
        navigate(from);
        toast.success("Login Successfully");
      } else if (result.msg === "wrong Data") {
        setError("wrong Data!!")
      } else {
        setError("No data found!!")
      }
    } else {
      console.log("validation error!!");
    }
  };
  const frgtpass = () => {
    navigate('/forget')
  }
  return (
    <div className="container">
      <form className="form">
        <h2>Login</h2>
        <div className="form-div">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={LoginData.email}
            onChange={handleChange}
            className="form-control"
          />
          {validaterr.mail && <span className="error-message">{validaterr.mail}</span>}
        </div>
        <div className="form-div">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={LoginData.password}
            onChange={handleChange}
            className="form-control"
          />
          {validaterr.pass && <span className="error-message">{validaterr.pass}</span>}
        </div>
        <div className="flex">
          <p id="frgtpass" onClick={frgtpass}>Forgot Password</p>
          <p id="loginbtn" onClick={handleSubmit}>
            Login
          </p>
        </div>
        <div className="flex">
          <p>Don&apos;t have an Acoount? <Link to="/">Register</Link></p>
        </div>
        <p id="error">{error}</p>
      </form>
    </div>
  );
};

export default Login;