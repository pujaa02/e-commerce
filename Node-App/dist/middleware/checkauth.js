"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const database_1 = __importDefault(require("../models/database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getToken = (req) => {
    return req.cookies.token;
};
const jwtOptions = {
    jwtFromRequest: getToken,
    secretOrKey: `${process.env.JWT_SECRET}`,
};
const strategy = new passport_jwt_1.Strategy(jwtOptions, async (jwt_payload, done) => {
    try {
        const id = jwt_payload.id;
        const user = await database_1.default.getrow(`select * from users where user_id=${id} `);
        console.log(user);
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (error) {
        return done(error);
    }
});
passport_1.default.use(strategy);
//# sourceMappingURL=checkauth.js.map