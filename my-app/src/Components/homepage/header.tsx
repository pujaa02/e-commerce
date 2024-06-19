import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import Grid from "@mui/material/Grid";

const Header: React.FC = () => {
    return (
        <Grid container sx={{ color: 'text.primary' }}>
            <div className="home_container">

                <div className="header">
                    <p id="shopping">Shopping...</p>
                    <ul className="right">
                    <li>
                            <Link to="/cart"><ShoppingBagIcon className="icons_material"/>Shop</Link>
                        </li>
                        <li>
                            <Link to="/cart"><PersonOutlineIcon className="icons_material"/>Profile</Link>
                        </li>
                        <li>
                            <Link to="/cart"><ShoppingCartIcon />Cart</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Grid>

    );
};

export default Header;
