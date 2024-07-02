import React, { useState } from "react";
import { useNavigate, NavigateFunction, useLocation } from "react-router-dom";
import "./activate.css"
import axios from "axios";
import { propState } from "../interfacefile";


const Activate: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();
    const location = useLocation();
    const [display, setDisplay] = useState(false);
    const [error, setError] = useState("");
    const { user_id } = location.state as propState;
    const { actcode } = location.state as propState;
    const passpage = () => {
        navigate(`/password`, { state: { user_id: user_id, actcode: actcode } })
    }
    const myfun = async () => {
        setError("")
        const result = await axios.get(`http://192.168.10.103:3036/activatecheck/${user_id}`);
        const msg: string = result.data.message
        if (msg === "success") {
            setDisplay(true);
        } else if (msg === "failed") {
            setError("Activation Link is Expired!!");
            await axios.get(`http://192.168.10.103:3036/deleteuser/${user_id}`);
        } else {
            setError("User Not Exist, Plz Register Again!!")
        }
    }
    if (!location.state) {
        navigate("/login")
    }
    return (
        <div className="container-activate">
            <h1 id="activate-h1">Thank you for registration!!</h1>
            <p id="activate-p">To activate your account click on the below Button</p>
            <button id="btn-act" onClick={myfun}>{actcode}</button>
            {display && <div className="passact">
                <p onClick={passpage}>Activate</p>
            </div>}
            <p id="error">{error}</p>
        </div >
    );
}

export default Activate;
