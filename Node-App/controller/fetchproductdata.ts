import { Request, Response } from "express";
import con from "../models/database";
import { productdata } from "../interfacefile";


const getproductData = async (req: Request, res: Response) => {
    const productdata: productdata[] = await con.getall(`select * from product_data`);
    res.json({ result: productdata })
}

export default getproductData;