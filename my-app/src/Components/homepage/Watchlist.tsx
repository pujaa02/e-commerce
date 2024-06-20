import React from "react";
import { Grid } from "@mui/material";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { Data, State } from "../interfacefile";
import "./watchlist.css";
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import { removewishlist } from "./CartFuncationality";


const Watchlist: React.FC = () => {
    const wishlist = useSelector((state: State) => state.wishlist);
    const dispatch = useDispatch();
    if (wishlist.length === 0) {
        return (
            <Grid container sx={{ color: 'text.primary' }}>
                <div className="home_container">
                    <Header />
                    <div className="empty_cart">
                        <p id="head_cart">Your WishList is Now Empty!!</p>
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
                    <h2 id="header_watchlist">Your WishList</h2>
                </header>
                <div className="wishlist_container">
                    {wishlist.map((data: Data, index: number) => (
                        <div className="cart_wishlist" key={index}>
                            <div className="content_data">
                                <img className="wishlist_img" src={data.image} alt="none" />
                                <div className="right_content">
                                    <p className="rate_watchlist">{data.rate} <StarIcon className="rateicon" /></p>
                                    <p className="title_watchlist">{data.title}</p>
                                    <p className="price_watchlist"><b>Price : </b>${data.price}</p>
                                    <p className="descri"><b>Discription : </b>{data.description}</p>
                                    <p className="remove_watchlist" onClick={() => dispatch(removewishlist(data.product_data_id))}>Remove <CancelIcon /></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Grid>
    );
};

export default Watchlist;