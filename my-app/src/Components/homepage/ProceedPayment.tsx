import React from "react";
import { Grid } from "@mui/material";
import Header from "./header";


const ProceedPayment: React.FC = () => {
    return (
        <Grid container sx={{ color: 'text.primary' }}>
            <div className="home_container">
                <Header />
                <p>Your Items Succesfully Placed!!</p>
            </div>
        </Grid>
    );
};

export default ProceedPayment;