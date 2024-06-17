"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_async_1 = __importDefault(require("mysql2-async"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const con = new mysql2_async_1.default({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    dateStrings: true,
    skiptzfix: true
});
exports.default = con;
//# sourceMappingURL=database.js.map