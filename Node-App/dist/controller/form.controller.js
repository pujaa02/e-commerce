"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequalize_1 = __importDefault(require("../models/sequalize"));
const sequelize_2 = require("sequelize");
const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/;
const Employee = sequalize_1.default.define("emp_detail", {
    emp_id: {
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
    designation: {
        type: sequelize_2.DataTypes.STRING,
    },
    email: {
        type: sequelize_2.DataTypes.STRING,
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
    },
    rel_status: {
        type: sequelize_2.DataTypes.STRING,
    },
    address1: {
        type: sequelize_2.DataTypes.STRING,
    },
    address2: {
        type: sequelize_2.DataTypes.STRING,
    },
    city: {
        type: sequelize_2.DataTypes.STRING,
    },
    state: {
        type: sequelize_2.DataTypes.STRING,
    },
    zipcode: {
        type: sequelize_2.DataTypes.STRING,
    },
    bd: {
        type: sequelize_2.DataTypes.DATEONLY,
    },
});
exports.default = Employee;
//# sourceMappingURL=form.controller.js.map