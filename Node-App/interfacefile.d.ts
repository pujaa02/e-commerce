interface City {
    id: number | string;
    city: string;
    state_id: number | string;
}
interface State {
    id: number | string;
    name: string;
    country_id: number | string;
}
export interface Edu {
    edu_id: number | string;
    emp_id: number | string;
    type_of_result: string;
    Name_of_board_or_course: string;
    Passing_year: number | string;
    Percentage: number | string;
}
export interface Language {
    emp_id: number | string;
    lan_id: number | string;
    language_know: string;
    rws: string;
}
export interface PreferedLocation {
    emp_id: number | string;
    pre_id: string;
    prefered_location: string;
    notice_period: string;
    expected_ctc: string;
    current_ctc: string;
    department: string;
}
export interface Reference {
    emp_id: number | string;
    name: string;
    ref_id: number | string;
    contact_number: number | string;
    relation: string;
}
export interface Technology {
    emp_id: number | string;
    id: number | string;
    tech_know: string;
    level_of_technology: string;
}
export interface Workexp {
    id: number | string;
    emp_id: number | string;
    from_date: Date | string;
    to_date: Date | string;
    work_id: number | string;
    tech_id: number | string;
    company_name: string;
    designation: string;
}
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
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rate: number;
    count: number;
}
export interface Ids {
    id: number | string;
    ref_id: number | string;
    edu_id: number | string;
    work_id: number | string;
    tech_id: number | string;
}
export interface Emp {
    emp_id: number;
    fname: string;
    lname: string;
    designation: string;
    email: string;
    phone: string | number;
    gender: string;
    rel_status: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: string;
    bd: string | Date;
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
export interface getIds {
    ref_id: number;
    edu_id: number;
    work_id: number
}