export interface City {
    id: number | string;
    city: string;
    state_id: number | string;
}
export interface State {
    id: number | string;
    name: string;
    country_id: number | string;
}
export interface RegData {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    gender: string;
    bd: string;
}
export interface LoginData {
    email: string;
    password: string;
}
export interface FormData {
    fname?: string;
    lname?: string;
    designa?: string;
    bd?: string;
    email?: string;
    phone?: string;
    zipcode?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    gender?: string;
    rel_status?: string;

    experience: {
        companyname: string;
        designation: string;
        from_date: string;
        to_date: string;
    }[];
    relation: {
        name: string;
        mobileno: string;
        rel: string;
    }[];

    board_name?: string[];
    py?: number[];
    percentage?: number[];

    companyname?: string[];
    designation?: string[];
    from?: Date[];
    to?: Date[];

    hindi?: boolean;
    read1?: boolean;
    write1?: boolean;
    speak1?: boolean;
    english?: boolean;
    read2?: boolean;
    write2?: boolean;
    speak2?: boolean;
    gujarati?: boolean;
    read3?: boolean;
    write3?: boolean;
    speak3?: boolean;
    php?: boolean;
    level1?: string;
    mysql?: boolean;
    level2?: string;
    laravel?: boolean;
    level3?: string;
    oracle?: boolean;
    level4?: string;

    name?: string[];
    mobileno?: number[];
    rel?: string[];

    preloc?: string[];
    notice?: string;
    exctc?: string;
    curctc?: string;
    depa?: string;
}
export interface User {
    emp_id: number;
    fname: string;
    lname: string;
    designation: string;
    email: string;
    phone: string;
    gender: string;
    rel_status: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcodecode: string;
    bd: string;
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
export interface ValidateRegdata {
    fn: string;
    ln: string;
    mail: string;
    number: string;
    gen: string;
    dob: string;
}
export interface Validatepass {
    password: string;
    confirmpass: string;
}
export interface Validatelogin {
    mail: string;
    pass: string;
}
export interface Value {
    id: string;
    code: string;
}

