import React, { useEffect, useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Data } from "../interfacefile";
import Header from "./header";
import { addToCart, addwishlist } from './CartFuncationality';
import "./home.css";
import { useDispatch } from "react-redux";


const Home: React.FC = () => {
    const dispatch = useDispatch();
    const [productdata, setProductData] = useState([]);
    useEffect(() => {
        const fetchproductdata = async () => {
            const result = await axios.get(`http://192.168.10.103:3036/getproductdata`, { withCredentials: true });
            setProductData(result.data.result);
        }
        fetchproductdata()
    }, [])

    const additem = async (data: Data) => {
        dispatch(addToCart(data));
        return;
    }
    return (
        <Grid container sx={{ color: 'text.primary' }}>
            <div className="home_container">
                <Header />
                <div className="main_container_home">
                    <div className="product_row">
                        {productdata.map((data: Data) => (
                            <div className="product_col" key={data.product_data_id}>
                                <div className="product_card">
                                    <div className="cart_img">
                                        <img src={data.image} alt="none" />
                                    </div>
                                    <div className="content">
                                        <p className="rate">{data.rate}<StarIcon className="rateicon" /></p>
                                        <p className="text-truncate title">{data.title}</p>
                                        <p className="price">Price : <span className="spantag">${data.price}</span></p>
                                        <p className="text-truncate descri">Description : <span className="spantag">{data.description}</span></p>
                                    </div>
                                    <div className="flex_bottom">
                                        <p className="overlay" onClick={() => additem(data)}>
                                            <AddShoppingCartIcon />Add Item
                                        </p>
                                        <p className="wishlist" onClick={() => dispatch(addwishlist(data))}><FavoriteIcon /></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Grid>

    );
};

export default Home;
{/* <img id="logo" src={require(`../homepage/mylogo.jpg`)} alt="none" />  */ }
// http://fakestoreapi.com/PRODUCTS
{/* <p className="text-truncate descri">{data.description}</p> */ }
{/* <CurrencyRupeeIcon className="icon" /> */ }