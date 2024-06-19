import { Request, Response } from "express";
import con from "../models/database";
import { cartdata, productdata } from "../interfacefile";


const getproductData = async (req: Request, res: Response) => {
    const productdata: productdata[] = await con.getall(`select * from product_data`);
    res.json({ result: productdata })
}
const getcartdata = async (req: Request, res: Response) => {
    const cartdata: cartdata[] = await con.getall(`select * from watchlist where user_id=${req.params.id} and isDeleted=0`);
    const productdata: productdata[] = await con.getall(`select * from product_data`);
    const resultofcartdata = cartdata.map((t1) => ({
        ...t1,
        ...productdata.find((t2) => t2.product_data_id === t1.product_data_id),
    }));

    res.json({ cartdata: resultofcartdata })
}

const deletecartitem = async (req: Request, res: Response) => {
    try {
        await con.update(`update  watchlist set isDeleted=1 where user_id=${req.params.user_id} and product_data_id=${req.params.product_data_id}`);
        res.json({ msg: "success" })
    } catch (error) {
        console.log(error);
        res.json({ msg: "failed" })

    }


}
export default { getproductData, getcartdata, deletecartitem };