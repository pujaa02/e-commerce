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
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item.product_data_id === action.payload.product_data_id);
            if (itemInCart) {
                itemInCart.count++;
                state.totalItems++;
                state.total += itemInCart.price;
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
                localStorage.setItem("total", JSON.stringify(state.total));
                toast.success("Item added to cart");
            } else {
                const item = action.payload;
                state.cart.push({ ...item, count: 1 });
                state.totalItems++;
                state.total += item.price;
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
                toast.success("Item added to cart");
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.product_data_id === action.payload);
            if (item) {
                item.count++;
                state.total += item.price;
                state.totalItems++;
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.product_data_id === action.payload);
            if (item) {
                if (item.count === 1) {
                    state.cart = state.cart.filter((item) => item.product_data_id !== action.payload);
                    state.totalItems--;
                    state.total -= item.price;
                    localStorage.setItem("total", JSON.stringify(state.total));
                    localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
                } else {
                    item.count--;
                    state.total -= item.price;
                    state.totalItems--;
                    localStorage.setItem("total", JSON.stringify(state.total));
                    localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
                }
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            const item = state.cart.find((item) => item.product_data_id === itemId);

            if (item) {
                state.totalItems -= item.count;
                state.total -= item.price * item.count;

                state.cart = state.cart.filter((item) => item.product_data_id !== itemId);

                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

                toast.success("Item removed from cart");
            }
        },
    },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;