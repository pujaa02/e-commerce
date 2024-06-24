"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./routes/router"));
dotenv_1.default.config();
const port = process.env.PORT;
const cors_1 = __importDefault(require("cors"));
app.use((0, cookie_parser_1.default)());
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const corsOptions = {
    origin: 'http://192.168.10.103:5000',
    methods: 'GET, PUT, POST',
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.options('http://192.168.10.103:5000', (0, cors_1.default)(corsOptions));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://192.168.10.103:5000");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/", (req, res) => {
    res.send("hello");
});
try {
    app.listen(port, () => {
        console.log(`Server is running in port: ${port} `);
        app.use(router_1.default);
    });
}
catch (error) {
    console.log(`Error: ${error}`);
}
//# sourceMappingURL=index.js.map