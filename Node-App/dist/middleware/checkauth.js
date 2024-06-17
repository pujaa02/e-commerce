"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function checkAuth(req, res, next) {
    try {
        const token2 = req.cookies.token;
        const key = process.env.JWT_SECRET_KEY;
        const verified = jsonwebtoken_1.default.verify(token2, key);
        if (verified) {
            next();
        }
        else {
            res.render("frontpage/login", { error: "something went wrong!!" });
        }
    }
    catch (error) {
        res.render("frontpage/login", { error: "something went wrong!!" });
    }
}
exports.default = checkAuth;
//# sourceMappingURL=checkauth.js.map