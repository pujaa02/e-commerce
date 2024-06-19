import React from "react";
import "./cart.css";
import { Grid } from "@mui/material";
import Header from "./header";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart: React.FC = () => {
    return (
        <Grid container sx={{ color: 'text.primary' }}>
            <div className="home_container">
                <Header />
                <header>
                    <h2 id="header_h2"> Your Cart (4 items)</h2>
                </header>
                <div className="cart_container">
                    <table id="cart_item">
                        <tr>
                            <th >Item</th>
                            <th>Price</th>
                            <th>Quality</th>
                            <th>Total</th>
                        </tr>
                        <tr>
                            <td className="flex_items"> <img id="logo" src={require(`../homepage/mylogo.jpg`)} alt="" /> <p>pi pizza oven</p> </td>
                            <td>$6.99</td>
                            <td>
                                <tr className="minitable">
                                    <td className="minitable_td"><RemoveIcon /></td>
                                    <td className="minitable_td" width={50}>4</td>
                                    <td className="minitable_td"><AddIcon /></td>
                                </tr>
                            </td>
                            <td>$6.99 <DeleteForeverIcon className="material_icon" /></td>
                        </tr>
                    </table>
                    <div className="subtotal_container">
                        <p>SubTotal : </p>
                        <p className="checkout_btn">Chekout</p>
                    </div>
                </div>
            </div>
        </Grid>

    );
};

export default Cart;
