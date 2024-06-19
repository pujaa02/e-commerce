const initialState = {
    cart: []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        // Define your actions here
        default:
            return state;
    }
};

export default cartReducer;


import { combineReducers } from "redux";
import cartReducer from "./cartReducer"; // Adjust the path accordingly

const rootReducer = combineReducers({
    cart: cartReducer,
    // other reducers can be added here
});

export default rootReducer;


import { createStore } from "redux";
import rootReducer from "./reducers"; // Adjust the path accordingly

const store = createStore(rootReducer);

export default store;


import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store"; // Adjust the path accordingly

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);


const cart = useSelector((state) => state.cart);


import React from "react";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Header from "./header";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { removeFromCart } from "./CartFuncationality";
import { cartdata } from "../interfacefile";

const Cart: React.FC = () => {
    const cart = useSelector((state) => state.cart);
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
                                    <td>$6.99 </td>
                                    <td onClick={() => dispatch(removeFromCart(dataCart.id))}><DeleteForeverIcon className="material_icon" /></td>
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
