import { Request, Response } from "express";
import con from "../models/database";
import { cartdata, productdata, CartItem } from "../interfacefile";


const getproductData = async (req: Request, res: Response) => {
    const productdata: productdata[] = await con.getall(`select * from product_data`);
    res.json({ result: productdata })
}
const getcartdata = async (req: Request, res: Response) => {
    const cartdata: cartdata[] = await con.getall(`select * from watchlist where user_id=${req.params.id} and isDeleted=0`);
    const productdata: productdata[] = await con.getall(`select * from product_data`);
    const favdata: CartItem[] = await con.getall(`select * from favourite where user_id=${req.params.id} and isDeleted=0`);
    const resultofcartdata = cartdata.map((t1) => ({
        ...t1,
        ...productdata.find((t2) => t2.product_data_id === t1.product_data_id),
    }));
    const resultoffavdata = favdata.map((t1) => ({
        ...t1,
        ...productdata.find((t2) => t2.product_data_id === t1.product_data_id),
    }));
    res.json({ cartdata: resultofcartdata, favdata: resultoffavdata })
}
const deletecartitem = async (req: Request, res: Response) => {
    try {
        const checkdata = await con.getrow(`select * from watchlist where user_id=${req.params.user_id}`);
        if (checkdata) {
            await con.update(`update  watchlist set isDeleted=1 where user_id=${req.params.user_id}`);
        }
        res.json({ msg: "success" })
    } catch (error) {
        console.log(error);
        res.json({ msg: "failed" })

    }
}
const addtocart = async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const data: CartItem[] = req.body;
    await con.delete(`delete from watchlist where user_id=${user_id}`);
    data.forEach(async element => {
        const checkdata = await con.getrow(`select * from watchlist where user_id=${user_id} and product_data_id=${element.product_data_id}`);
        if (!checkdata) {
            await con.insert(`insert into watchlist(user_id,product_data_id,count) values(${user_id},${element.product_data_id},${element.count})`);
        }
    });
    res.json({ msg: "success" })
}

const addtofav = async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const data: CartItem[] = req.body;
    await con.delete(`delete from favourite where user_id=${user_id}`);
    data.forEach(async element => {
        const checkdata = await con.getrow(`select * from favourite where user_id=${user_id} and product_data_id=${element.product_data_id}`);
        if (!checkdata) {
            await con.insert(`insert into favourite(user_id,product_data_id) values(${user_id},${element.product_data_id})`);
        }
    });
    res.json({ msg: "success" })
}
const deletefavitem = async (req: Request, res: Response) => {
    try {
        const checkdata = await con.getrow(`select * from favourite where user_id=${req.params.user_id}`);
        if (checkdata) {
            await con.update(`update  favourite set isDeleted=1 where user_id=${req.params.user_id}`);
        }
        res.json({ msg: "success" })
    } catch (error) {
        console.log(error);
        res.json({ msg: "failed" })

    }
}
export default { getproductData, getcartdata, deletecartitem, addtocart, addtofav, deletefavitem };