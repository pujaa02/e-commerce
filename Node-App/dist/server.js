"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(passport_1.default.initialize());
const users = []; // In-memory user store, replace with a database in production
const secretKey = 'your_jwt_secret';
// Passport JWT strategy setup
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
const JwtStrategy = passport_jwt_1.default.Strategy;
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
};
const strategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    const user = users.find(u => u.username === jwt_payload.username);
    if (user) {
        return done(null, user);
    }
    else {
        return done(null, false);
    }
});
passport_1.default.use(strategy);
// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User registered');
});
// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && await bcryptjs_1.default.compare(password, user.password)) {
        const token = jsonwebtoken_1.default.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    }
    else {
        res.status(401).send('Invalid credentials');
    }
});
// Authenticated route
app.get('/user', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ username: req.user.username });
});
app.listen(4000, () => {
    console.log('Server running on port 4000');
});
//# sourceMappingURL=server.js.map