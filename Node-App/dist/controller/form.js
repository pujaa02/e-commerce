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
const body_parser_1 = __importDefault(require("body-parser"));
route.use(body_parser_1.default.json());
route.use(body_parser_1.default.urlencoded({ extended: false }));
const form_controller_1 = __importDefault(require("./form.controller"));
// route.post(
//   "/submit",
const submit = async (req, res) => {
    const data = req.body.formData;
    try {
        await form_controller_1.default.create({ fname: data.fname, lname: data.lname, designation: data.designation, email: data.email, phone: data.phone, gender: data.gender, rel_status: data.rel_status, address1: data.address1, address2: data.address2, city: data.city, state: data.state, zipcode: data.zipcode, bd: data.bd });
        res.json({ msg: "success" });
    }
    catch (error) {
        res.json({ msg: "failed" });
    }
};
exports.default = { submit };
//# sourceMappingURL=form.js.map