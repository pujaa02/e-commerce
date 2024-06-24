import React from "react";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Header from "./header";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { removeFromCart, incrementQuantity, decrementQuantity } from "./CartFuncationality";
import { State, Data, CartItem } from "../interfacefile";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const cart = useSelector((state: State) => state);
    const finaldata: CartItem[] = cart.cart;
    console.log(finaldata.length !== 0, "length");

    const dispatch = useDispatch();
    if (finaldata.length === 0) {
        return (
            <Grid container sx={{ color: 'text.primary' }}>
                <div className="home_container">
                    <Header />
                    <div className="empty_cart">
                        <p id="head_cart">Your Cart is Now Empty!!</p>
                        <img id="empty_cart" src={require(`./empty_cart.gif`)} alt="none" />
                    </div>
                </div>
            </Grid>
        )
    }
    return (
        <Grid container sx={{ color: 'text.primary' }}>
            <div className="home_container">
                <Header />
                <header>
                    <h2 id="header_h2"> Your Cart ({cart.totalItems} items)</h2>
                </header>
                <div className="cart_container">
                    <table id="cart_item">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finaldata?.map((dataCart: Data, index: number) => (
                                <tr key={index}>
                                    <td className="flex_items">
                                        <img id="logo" src={`${dataCart.image}`} alt="none" />
                                        <p>{dataCart.title}</p>
                                    </td>
                                    <td>${dataCart.price}</td>
                                    <td>
                                        <table className="minitable">
                                            <tbody>
                                                <tr>
                                                    <td className="minitable_td" onClick={() => dispatch(decrementQuantity(dataCart.product_data_id))}><RemoveIcon /></td>
                                                    <td className="minitable_td" width={50}>{dataCart.count}</td>
                                                    <td className="minitable_td" onClick={() => dispatch(incrementQuantity(dataCart.product_data_id))}><AddIcon /></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>${dataCart.price * dataCart.count}</td>
                                    <td onClick={() => dispatch(removeFromCart(dataCart.product_data_id))}>
                                        <DeleteForeverIcon className="material_icon" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="subtotal_container">
                        <p className="subtotal"><b >SubTotal : </b> ${cart.total} </p>
                    </div>
                    <p className="checkout_btn" onClick={() => navigate("/payment")}>Proceed to Buy ({cart.totalItems} items) </p>
                </div>
            </div>
        </Grid>
    );
};

export default Cart;