"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../models/database"));
const getproductData = async (req, res) => {
    const productdata = await database_1.default.getall(`select * from product_data`);
    res.json({ result: productdata });
};
const getcartdata = async (req, res) => {
    const cartdata = await database_1.default.getall(`select * from watchlist where user_id=${req.params.id} and isDeleted=0`);
    const productdata = await database_1.default.getall(`select * from product_data`);
    const favdata = await database_1.default.getall(`select * from favourite where user_id=${req.params.id} and isDeleted=0`);
    const resultofcartdata = cartdata.map((t1) => ({
        ...t1,
        ...productdata.find((t2) => t2.product_data_id === t1.product_data_id),
    }));
    const resultoffavdata = favdata.map((t1) => ({
        ...t1,
        ...productdata.find((t2) => t2.product_data_id === t1.product_data_id),
    }));
    res.json({ cartdata: resultofcartdata, favdata: resultoffavdata });
};
const deletecartitem = async (req, res) => {
    try {
        const checkdata = await database_1.default.getrow(`select * from watchlist where user_id=${req.params.user_id}`);
        if (checkdata) {
            await database_1.default.update(`update  watchlist set isDeleted=1 where user_id=${req.params.user_id}`);
        }
        res.json({ msg: "success" });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: "failed" });
    }
};
const addtocart = async (req, res) => {
    const user_id = req.params.user_id;
    const data = req.body;
    await database_1.default.delete(`delete from watchlist where user_id=${user_id}`);
    data.forEach(async (element) => {
        const checkdata = await database_1.default.getrow(`select * from watchlist where user_id=${user_id} and product_data_id=${element.product_data_id}`);
        if (!checkdata) {
            await database_1.default.insert(`insert into watchlist(user_id,product_data_id,count) values(${user_id},${element.product_data_id},${element.count})`);
        }
    });
    res.json({ msg: "success" });
};
const addtofav = async (req, res) => {
    const user_id = req.params.user_id;
    const data = req.body;
    await database_1.default.delete(`delete from favourite where user_id=${user_id}`);
    data.forEach(async (element) => {
        const checkdata = await database_1.default.getrow(`select * from favourite where user_id=${user_id} and product_data_id=${element.product_data_id}`);
        if (!checkdata) {
            await database_1.default.insert(`insert into favourite(user_id,product_data_id,count) values(${user_id},${element.product_data_id},${element.count})`);
        }
    });
    res.json({ msg: "success" });
};
const deletefavitem = async (req, res) => {
    try {
        const checkdata = await database_1.default.getrow(`select * from favourite where user_id=${req.params.user_id}`);
        if (checkdata) {
            await database_1.default.update(`update  favourite set isDeleted=1 where user_id=${req.params.user_id}`);
        }
        res.json({ msg: "success" });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: "failed" });
    }
};
exports.default = { getproductData, getcartdata, deletecartitem, addtocart, addtofav, deletefavitem };
//# sourceMappingURL=fetchproductdata.js.map