import React from "react";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Header from "./header";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { removeFromCart } from "./CartFuncationality";

interface State {
    cart: Data[];
    total: number;
    totalItems: number;
}

interface Data {
    product_data_id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rate: number;
    count: number;
}

interface cartdata {
    id: number;
    user_id: number;
    product_data_id: number;
    isDeleted: number;
}

const Cart: React.FC = () => {
    const cart = useSelector((state: State) => state.cart); // Corrected here
    const dispatch = useDispatch();
    
    return (
        <Grid container sx={{ color: 'text.primary' }}>
            <div className="home_container">
                <Header />
                <header>
                    <h2 id="header_h2"> Your Cart ({cart.length} items)</h2>
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
                            {cart.map((dataCart: cartdata, index: number) => (
                                <tr key={index}>
                                    <td className="flex_items">
                                        <img id="logo" src={require(`../homepage/mylogo.jpg`)} alt="" />
                                        <p>pi pizza oven</p>
                                    </td>
                                    <td>$6.99</td>
                                    <td>
                                        <table className="minitable">
                                            <tbody>
                                                <tr>
                                                    <td className="minitable_td"><RemoveIcon /></td>
                                                    <td className="minitable_td" width={50}>4</td>
                                                    <td className="minitable_td"><AddIcon /></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>$6.99</td>
                                    <td onClick={() => dispatch(removeFromCart(dataCart.id))}>
                                        <DeleteForeverIcon className="material_icon" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="subtotal_container">
                        <p>SubTotal: </p>
                        <p className="checkout_btn">Checkout</p>
                    </div>
                </div>
            </div>
        </Grid>
    );
};

export default Cart;
