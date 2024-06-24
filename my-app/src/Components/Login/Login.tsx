import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./login.css";
import { CartItem, LoginData } from "../interfacefile";
import { login } from "../authcontext/authService";
import { useAuth } from "../authcontext/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addfav, newcart } from "../homepage/CartFuncationality";

const Login2: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");
    const { setCurrentUser } = useAuth();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit, formState: { errors }
    } = useForm<LoginData>();

    const handlelogin = async (data: LoginData) => {
        const result = await login(data.email, data.password);
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
                        {...register("email", {
                            required: "Emailis Required!!",
                        })}
                        className="form-control"
                    />
                    {errors.email && <p className="red">{errors.email.message}</p>}
                </div>
                <div className="form-div">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "password Required!!",
                        })}
                        className="form-control"
                    />
                    {errors.password && <p className="red">{errors.password.message}</p>}
                </div>
                <div className="flex">
                    <p id="frgtpass" onClick={frgtpass}>Forgot Password</p>
                    <p id="loginbtn" onClick={handleSubmit(handlelogin)}>
                        Login
                    </p>
                </div>
                <div className="flex">
                    <p>Don&apos;t have an Acoount? <Link to="/register">Register</Link></p>
                </div>
                <p id="error">{error}</p>
            </form>
        </div>
    );
};

export default Login2;