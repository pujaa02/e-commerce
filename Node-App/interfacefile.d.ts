
export interface Queryjson {
    query: string;
    fname: string;
    lname: string;
    email: string;
    city: string;
    bg: string;
    opa: string;
}
export interface productdata {
    product_data_id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rate: number;
    count: number;
}
export interface UserAttributes {
    id: string;
    user_id: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    gender: string;
    bd: string;
    password: string;
    access_key: string;
    isdeleted: string;
}
export interface PasswordData {
    pass: string;
    repass: string;
}
export interface PayloadData {
    id: string;
    email: string;
}
export interface RegisterData {
    user_id: number;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    gender: string;
    bd: string;
}
export interface cartdata {
    id: number;
    user_id: number
    product_data_id: number;
    isDeleted: number;
}
export interface CartItem {
    product_data_id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rate: number;
    count: number;
    id: number;
    user_id: number
    isDeleted: number;
}