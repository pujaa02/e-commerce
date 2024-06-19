import React from "react";
import "./cart.css";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Header from "./header";
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import { removeFromCart } from "./CartFuncationality";
// import { State, Data } from "../interfacefile";
import { State } from "../interfacefile";

const Cart: React.FC = () => {
    const cart = useSelector((state: State) => state.cart); // Corrected here
    // const dispatch = useDispatch();
    console.log(cart, "cart");

    return (
        <Grid container sx={{ color: 'text.primary' }}>
            <div className="home_container">
                <Header />
                <header>
                    <h2 id="header_h2"> Your Cart ( items)</h2>
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
                            {/* {cart.map((dataCart: Data, index: number) => (
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
                            ))} */}
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


import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { State } from "../interfacefile";

const initialState: State = {
    cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart") || "")
        : [],
    total: localStorage.getItem("total")
        ? JSON.parse(localStorage.getItem("total") || "")
        : 0,
    totalItems: localStorage.getItem("totalItems")
        ? JSON.parse(localStorage.getItem("totalItems") || "")
        : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            state.cart.push(item)
            state.totalItems++
            state.total += item.price
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            toast.success("Item added to cart")
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload
            const index = state.cart.findIndex((item: { product_data_id: number; }) => item.product_data_id === itemId)
            if (index >= 0) {
                state.totalItems--
                state.total -= state.cart[index].price
                state.cart.splice(index, 1)
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                toast.success("Item removed from cart")
            }
        },

    }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer;