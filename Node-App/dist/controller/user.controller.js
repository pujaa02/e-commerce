"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequalize_1 = __importDefault(require("../models/sequalize"));
const sequelize_2 = require("sequelize");
const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/;
const User = sequalize_1.default.define("users", {
    user_id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    fname: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    lname: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
        validate: {
            validator: function (v) {
                return phoneValidationRegex.test(v);
            },
        }
    },
    gender: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    bd: {
        type: sequelize_2.DataTypes.DATEONLY,
        allowNull: false,
    },
    password: {
        type: sequelize_2.DataTypes.STRING,
    },
    access_key: {
        type: sequelize_2.DataTypes.STRING,
    },
    isdeleted: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
});
exports.default = User;
//# sourceMappingURL=user.controller.js.map