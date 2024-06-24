import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { State } from "../interfacefile";

const initialState: State = {
    wishlist: localStorage.getItem("wishlist")
        ? JSON.parse(localStorage.getItem("wishlist") || "")
        : [],
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
            } else {
                const item = action.payload;
                state.cart.push({ ...item, count: 1 });
                state.totalItems++;
                state.total += item.price;
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            toast.success("Item added to cart");
        },
        newcart: (state, action) => {
            const itemInCart = state.cart.find((item) => item.product_data_id === action.payload.product_data_id);
            if (itemInCart) {
                const newCount = itemInCart.count + action.payload.count;
                state.totalItems += action.payload.count;
                state.total += itemInCart.price * action.payload.count;
                itemInCart.count = newCount;
            } else {
                const item = action.payload;
                state.cart.push({ ...item });
                state.totalItems += item.count;
                state.total += item.price * item.count;
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
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
                } else {
                    item.count--;
                    state.total -= item.price;
                    state.totalItems--;
                }
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
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
        }, emptyCart: (state, action) => {
            const cart = action.payload;
            console.log(cart, "cart");
            state.cart = [];
            state.total = 0;
            state.totalItems = 0
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        },
        addwishlist: (state, action) => {
            const itemInCart = state.wishlist.find((item) => item.product_data_id === action.payload.product_data_id);
            if (itemInCart) {
                toast.success("Item Already Exist in WishList");
            } else {
                const item = action.payload;
                state.wishlist.push({ ...item });
                localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
                toast.success("Item added to WishList");
            }
        },
        addfav: (state, action) => {
            const itemInCart = state.wishlist.find((item) => item.product_data_id === action.payload.product_data_id);
            if (!itemInCart) {
                const item = action.payload;
                state.wishlist.push({ ...item });
                localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
            }
        },
        removewishlist: (state, action) => {
            state.wishlist = state.wishlist.filter((item) => item.product_data_id !== action.payload);
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
            toast.success("Item Removed from WishList");
        },
        emptywishlist: (state, action) => {
            const wishlist = action.payload;
            console.log(wishlist, "cart");
            state.wishlist = [];
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
        }
    },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, emptyCart, addwishlist, removewishlist, newcart, addfav, emptywishlist } = cartSlice.actions;
export default cartSlice.reducer;