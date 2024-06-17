"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(`${process.env.DATABASE}`, `${process.env.DBUSER}`, `${process.env.DBPASSWORD}`, {
    host: `${process.env.HOST}`,
    dialect: "mysql",
    logging: false
});
sequelize.sync().then(() => {
    console.log("models created succesfully");
}).catch((error) => {
    console.log(error);
});
exports.default = sequelize;
//# sourceMappingURL=sequalize.js.map