"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const route = express.Router();
const user_controller_1 = __importDefault(require("./user.controller"));
const body_parser_1 = __importDefault(require("body-parser"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
route.use(body_parser_1.default.json());
route.use(body_parser_1.default.urlencoded({ extended: false }));
const jwtsecret = process.env.JWT_SECRET;
function createRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
// route.post("/register",
const register = async (req, res) => {
    const Registerresult = req.body;
    const accesskey = createRandomString(12);
    const { fname, lname, email, phone, gender, bd } = Registerresult;
    try {
        const registerinsert = await user_controller_1.default.create({ fname: fname, lname: lname, email: email, phone: phone, gender: gender, bd: bd, access_key: accesskey });
        const finalres = JSON.parse(JSON.stringify(registerinsert));
        const user_id = finalres.user_id;
        res.json({ message: "success", actcode: accesskey, user_id });
    }
    catch (error) {
        res.json({ message: "failed" });
    }
};
// route.get("/activatecheck/:user_id", 
const activatecheck = async (req, res) => {
    const user_id = req.params.user_id;
    const result = await user_controller_1.default.findOne({ where: { user_id: user_id } });
    const d1 = new Date();
    if (result) {
        const d2 = new Date(result?.dataValues.createdAt);
        var diff = (d1.getTime() - d2.getTime()) / 1000;
        var diffsec = d1.getSeconds() - d2.getSeconds();
        diff /= 60 * 60;
        const final2 = Math.round(diffsec);
        if (final2 <= 60 && final2 >= 0) {
            return res.json({ message: "success" });
        }
        else {
            return res.json({ message: "failed" });
        }
    }
};
// route.get("/deleteuser/:id", 
const deleteuser = async (req, res) => {
    const user_id = req.params.id;
    await user_controller_1.default.update({ isdeleted: 1, deleted_at: new Date() }, { where: { user_id: user_id } });
    res.json({ msg: "User Deleted !!" });
};
// route.post("/password/:user_id",
const password = async (req, res) => {
    const user_id = req.params.user_id;
    const { pass } = req.body.PassData;
    bcryptjs_1.default.hash(pass, 7, async (error, hashedPassword) => {
        if (error) {
            console.log(error);
        }
        try {
            await user_controller_1.default.update({ password: hashedPassword }, { where: { user_id: user_id } });
            res.json({ msg: "Success" });
        }
        catch (error) {
            res.json({ msg: "Something Went Wrong!!" });
        }
    });
};
// route.get("/checkuser/:email/:pass",
const checkuser = async (req, res) => {
    const email = req.params.email;
    const pass = req.params.pass;
    try {
        const result = await user_controller_1.default.findOne({ where: { email: email } });
        if (result?.dataValues) {
            const isPassSame = await bcryptjs_1.default.compare(pass, result?.dataValues.password);
            if (isPassSame === true) {
                const token = jsonwebtoken_1.default.sign({ email: result?.dataValues.email }, jwtsecret, { expiresIn: "1h" });
                res.cookie("token", token, { httpOnly: false, secure: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none' }).json({ msg: "Success", token, user_id: result?.dataValues.user_id });
            }
            else {
                res.json({ msg: "wrong Data" });
            }
        }
        else {
            res.json({ msg: "wrong Data" });
        }
    }
    catch (error) {
        res.json({ msg: "No data found!!" });
    }
};
// route.get("/finduser/:email",
const finduser = async (req, res) => {
    const email = req.params.email;
    try {
        const result = await user_controller_1.default.findOne({ where: { email: email, isdeleted: 0 } });
        if (result?.dataValues) {
            const dbuser = result?.dataValues;
            res.json({ msg: "Success", id: dbuser.user_id });
        }
        else {
            res.json({ msg: "wrong Data" });
        }
    }
    catch (error) {
        res.json({ msg: "No data found!!" });
    }
};
exports.default = { register, activatecheck, deleteuser, password, checkuser, finduser };
//# sourceMappingURL=userauthenticate.js.map