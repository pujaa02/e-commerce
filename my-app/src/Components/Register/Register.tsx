import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
import { RegData2 } from "../interfacefile";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [display, setDisplay] = useState(false);
    const [error, setError] = useState("");
    const [actcode, setactcode] = useState("");
    const [id, setid] = useState("");
    const {
        register,
        handleSubmit, watch, formState: { errors }
    } = useForm<RegData2>();

    const enteredDate = watch("bd") || "string";
    const phoneValidationPattern = /^[7-9][0-9]{9}$/;
    const emailValidationPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const checkValidDate = (bd: string | Date) => {
        const validyear: number = 2005;
        const applieddate: Date = new Date(bd);
        const appliedyear: number = applieddate.getFullYear();
        if (appliedyear > validyear) {
            return "Your Age must be greater then 18 years";
        } else {
            return true;
        }
    }
    const changepage = () => {
        navigate(`/activate/${actcode}`, { state: { user_id: id, actcode: actcode } })
    }

    const handleRegister = async (data: RegData2) => {
        setError("");
        const result = await axios.get(`http://192.168.10.103:3036/finduser/${data.email}`, { withCredentials: true });
        const checkuser = result.data.msg;
        if (checkuser === "Success") {
            setError("Email Exists!!")
        } else {
            await axios.post('http://192.168.10.103:3036/register', data)
                .then(async (res) => {
                    const result = await res.data;
                    if (result.message === "success") {
                        setid(result.user_id);
                        setactcode(result.actcode);
                        setDisplay(true);
                    } else if (result.message === "failed") {
                        setError("something wrong!!")
                    }
                })
                .catch((err) => console.log(err));
        }
    }
    return (
        <div className="register-form-container">
            <h2>Registration Page</h2>

            <form onSubmit={handleSubmit(handleRegister)} className="register-form">
                <div className="row">
                    <div className="col form-group">
                        <label htmlFor="fname">First Name:</label>
                        <input
                            type="text"
                            id="fname"
                            {...register("fname", {
                                required: "First Name is Required!!",
                            })}
                            className="form-control"
                        />
                        {errors.fname && <p className="red">{errors.fname.message}</p>}
                    </div>
                    <div className="col form-group">
                        <label htmlFor="lname">Last Name:</label>
                        <input
                            type="text"
                            id="lname"
                            {...register("lname", {
                                required: "Last Name is Required!!",
                            })}
                            className="form-control"
                        />
                        {errors.lname && <p className="red">{errors.lname.message}</p>}
                    </div>
                </div>
                <div className="row">
                    <div className="col form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email is Required!!",
                                pattern: {
                                    value: emailValidationPattern,
                                    message: "Invalid email!!",
                                },
                            })}
                            className="form-control"
                        />
                        {errors.email && <p className="red">{errors.email.message}</p>}
                    </div>
                    <div className="col form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="text"
                            id="phone"
                            {...register("phone", {
                                required: "Mobile Number is Required!!",
                                pattern: {
                                    value: phoneValidationPattern,
                                    message: "Enter Valid Mobile Number",
                                },
                            })}
                            className="form-control"
                        />
                        {errors.phone && <p className="red">{errors.phone.message}</p>}
                    </div>
                </div>
                <div className="row">
                    <div className="col form-group">
                        <label htmlFor="bd">DOB:</label>
                        <input
                            type="date"
                            id="bd"
                            {...register("bd", {
                                required: "Birthday Date is Required!!",
                                validate: () => checkValidDate(enteredDate) || "Please Enter Valid Date!!"
                            })}
                            className="form-control"
                        /> <br />
                        {errors.bd && <p className="red">{errors.bd.message}</p>}
                    </div>
                    <div className="col formgender">
                        <label id="genderbold">Gender:</label> <br />
                        <div className="genderflex">
                            <div className="radio">
                                <input
                                    type="radio"
                                    id="male"
                                    value="male"
                                    {...register("gender", {
                                        required: "Gender is Required!!",
                                    })}
                                    className="form-check-input"
                                />
                                <label htmlFor="male" className="form-check-label">Male</label>
                            </div>
                            <div className="radio">
                                <input
                                    type="radio"
                                    id="female"
                                    value="female"
                                    {...register("gender", {
                                        required: "Gender is Required!!",
                                    })}
                                    className="form-check-input"
                                />
                                <label htmlFor="female" className="form-check-label">Female</label>
                            </div>
                            <div className="radio">
                                <input
                                    type="radio"
                                    id="other"
                                    value="other"
                                    {...register("gender", {
                                        required: "Gender is Required!!",
                                    })}
                                    className="form-check-input"
                                />
                                <label htmlFor="other" className="form-check-label">Other</label>
                            </div>
                        </div>
                        {errors.gender && <p className="red">{errors.gender.message}</p>}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">
                    Register
                </button>
                <div className="flex">
                    <p>Already Have an Account? <Link to="/login">Login</Link></p>
                </div>
                {display && <div className="activatebtn">
                    <p onClick={changepage}>Click Here</p>
                </div>}
                <p id="error">{error}</p>
            </form>
        </div>
    );
};
export default Register;


