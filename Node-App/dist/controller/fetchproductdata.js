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
    const resultofcartdata = cartdata.map((t1) => ({
        ...t1,
        ...productdata.find((t2) => t2.product_data_id === t1.product_data_id),
    }));
    res.json({ cartdata: resultofcartdata });
};
const deletecartitem = async (req, res) => {
    try {
        await database_1.default.update(`update  watchlist set isDeleted=1 where user_id=${req.params.user_id} and product_data_id=${req.params.product_data_id}`);
        res.json({ msg: "success" });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: "failed" });
    }
};
exports.default = { getproductData, getcartdata, deletecartitem };
//# sourceMappingURL=fetchproductdata.js.map