import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../interfacefile";
import { useAuth } from "../authcontext/AuthContext";
import { logout } from "../authcontext/authService";
import toast from "react-hot-toast";
import axios from "axios";
import { emptyCart, emptywishlist } from "./CartFuncationality";

const Header: React.FC = () => {
    const cart: State = useSelector((state: State) => state);
    const { currentUser } = useAuth();
    const { setCurrentUser } = useAuth();
    const dispatch = useDispatch();
    const user = currentUser?.user_id;
    const handleLogout = async () => {
        const cartresult = await axios.post(`http://192.168.10.103:3036/addtocart/${currentUser?.user_id}`, cart.cart, { withCredentials: true });
        const favresult = await axios.post(`http://192.168.10.103:3036/addtofav/${currentUser?.user_id}`, cart.wishlist, { withCredentials: true });
        if (cartresult.data.msg === "success" && favresult.data.msg === "success") {
            dispatch(emptyCart(cart.cart));
            dispatch(emptywishlist(cart.wishlist))
            logout();
            setCurrentUser(null);
            toast.success("Log out Successfully");
        }
    }

    return (
        <Grid container sx={{ color: 'text.primary' }}>
            <div className="home_container" >

                <div className="header">
                    <p id="shopping"> <img id="miimg" src={require(`./11.png`)} alt="none" /> </p>
                    <ul className="right">
                        <li>
                            <Link to="/"><ShoppingBagIcon className="icons_material" />Shop</Link>
                        </li>
                        {user ? <li>
                            <Link to=""><PersonOutlineIcon className="icons_material" />{currentUser.name}</Link>
                        </li> : <li>
                            <Link to="/login"><LoginIcon className="icons_material" />Login</Link>
                        </li>}
                        {user && <li onClick={handleLogout}>
                            <Link to=""><LogoutIcon className="icons_material" />Log Out</Link>
                        </li>}
                        <li id="relative_basket">
                            <Link to="/cart"><ShoppingCartIcon /><p>{cart.totalItems || 0}</p></Link>
                        </li>
                        <li id="relative_basket">
                            <Link to="/wishlist"><FavoriteIcon /> <p>{(cart.wishlist).length || 0}</p></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Grid>

    );
};

export default Header;


