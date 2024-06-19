import React, { useEffect, useState } from "react";
// import React, { useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Data } from "../interfacefile";
import Header from "./header";


const Home: React.FC = () => {
    const [productdata, setProductData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchproductdata = async () => {
            const result = await axios.get(`http://localhost:3036/getproductdata`, { withCredentials: true });
            setProductData(result.data.result);
        }
        fetchproductdata()
    }, [])

    const checkuser = async (id: number) => {
        console.log(id);
        // const result = await axios.post(`http://localhost:3036/getproductdata`, { withCredentials: true });
        // console.log(result);
        navigate("/cart");
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
                                    <div className="overlay" onClick={() => checkuser(data.product_data_id)}>
                                        <AddShoppingCartIcon />Add to Card
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