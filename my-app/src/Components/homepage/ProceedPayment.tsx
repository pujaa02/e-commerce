import React from "react";
import { Grid } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import "./payment.css"
import { useDispatch, useSelector } from "react-redux";
import { CartItem, Data, State } from "../interfacefile";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../authcontext/AuthContext";
import { emptyCart, removewishlist } from "./CartFuncationality";

const ProceedPayment: React.FC = () => {
    const cart: State = useSelector((state: State) => state);
    const finaldata: CartItem[] = cart.cart;
    const { currentUser } = useAuth();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const payment = async () => {
        const result = await axios.get(`http://192.168.10.103:3036/deletecartitem/${currentUser?.user_id}`, { withCredentials: true });
        const resultfav = await axios.get(`http://192.168.10.103:3036/deletefavitem/${currentUser?.user_id}`, { withCredentials: true });
        if (result.data.msg === "success" && resultfav.data.msg === "success") {
            dispatch(emptyCart(finaldata));
            dispatch(removewishlist(cart.wishlist))
            toast.success("Payment successfully Done");
            navigate("/");
        }
    }
    return (
        <Grid container sx={{ color: 'text.primary' }}>
            <div className="payment_container">
                <p>Order Now</p>
            </div>
            <div className="wishlist_container">
                {finaldata.map((data: Data, index: number) => (
                    <div className="cart_wishlist" key={index}>
                        <div className="content_data">
                            <img className="wishlist_img" src={data.image} alt="none" />
                            <div className="right_content">
                                <p className="rate_watchlist">{data.rate} <StarIcon className="rateicon" /></p>
                                <p className="title_watchlist">{data.title}</p>
                                <div className="flex_items">
                                    <p className="price_watchlist"><b>Price : </b>${data.price}</p>
                                    <p className="total_items"><b>Total Items : </b>{data.count}</p>
                                </div>
                                <p className="descri"><b>Discription : </b>{data.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <hr id="hr_tag" />
                <div className="footer">
                    <p><b>Price : </b> ${cart.total}</p>
                    <p><b>Delivery : </b> ${(cart.totalItems) * 15}</p>
                    <p><b>Total : </b> ${(cart.total) + ((cart.totalItems) * 15)}</p>
                </div>
                <div className="back_home">
                    <p onClick={() => navigate("/cart")}>Back to Cart</p>
                </div>
                <div className="payment_btn">
                    <p onClick={() => payment()}>Go to Payment</p>
                </div>
            </div>
        </Grid>
    );
};

export default ProceedPayment;