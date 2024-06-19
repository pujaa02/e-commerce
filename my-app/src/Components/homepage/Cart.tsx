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

interface cartdata {
    id: number;
    user_id: number
    product_data_id: number;
    isDeleted: number;
} interface Data {
    product_data_id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rate: number;
    count: number;
}
const Cart: React.FC = () => {
    // const [cart, setCart] = useState([]);
    const { cart } = useSelector((state: State) => state.cart);
    const dispatch = useDispatch();
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
                        {cart.map((dataCart: cartdata, index: number) => (
                            <tr key={index}>
                                < td className="flex_items" >
                                    <img id="logo" src={require(`../homepage/mylogo.jpg`)} alt="" />
                                    <p>pi pizza oven</p>
                                </td>
                                <td>$6.99</td>
                                <td>
                                    <tr className="minitable">
                                        <td className="minitable_td"><RemoveIcon /></td>
                                        <td className="minitable_td" width={50}>4</td>
                                        <td className="minitable_td"><AddIcon /></td>
                                    </tr>
                                </td>
                                <td>$6.99 </td>
                                <td onClick={() => dispatch(removeFromCart(dataCart.id))}><DeleteForeverIcon className="material_icon" /></td>
                            </tr>
                        ))}
                    </table>
                    <div className="subtotal_container">
                        <p>SubTotal : </p>
                        <p className="checkout_btn">Chekout</p>
                    </div>
                </div>
            </div >
        </Grid >

    );
};

export default Cart;
