import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { State } from "../interfacefile";

const Header: React.FC = () => {
    const cart: State = useSelector((state: State) => state);
    return (
        <Grid container sx={{ color: 'text.primary' }}>
            <div className="home_container">

                <div className="header">
                    <p id="shopping"> <img id="miimg" src={require(`./11.png`)} alt="none" /> </p>
                    <ul className="right">
                        <li>
                            <Link to="/"><ShoppingBagIcon className="icons_material" />Shop</Link>
                        </li>
                        <li>
                            <Link to="/profile"><PersonOutlineIcon className="icons_material" />Profile</Link>
                        </li>
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
