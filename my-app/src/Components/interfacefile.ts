export interface RegData2 {
    fname?: string;
    lname?: string;
    email?: string;
    phone?: string;
    gender?: string;
    bd?: string;
}
export interface LoginData {
    email: string;
    password: string;
}
export interface Data {
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
export interface propState {
    id: string;
    user_id: string;
    actcode: string;
}
export interface PassData {
    pass: string;
    repass: string;
}

export interface Validatepass {
    password: string;
    confirmpass: string;
}
export interface Value {
    id: string;
    code: string;
}

export interface ProtectedRouteProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>;

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
export interface State {
    wishlist: CartItem[],
    cart: CartItem[];
    total: number;
    totalItems: number;
}
export interface cartdata extends Data { }

