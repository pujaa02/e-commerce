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
exports.default = getproductData;
//# sourceMappingURL=fetchproductdata.js.map