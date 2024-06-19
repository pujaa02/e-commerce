import express, { Application } from "express";
const app: Application = express();
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import main from "./routes/router";
dotenv.config();
const port = process.env.PORT;
import cors from "cors";

app.use(cookieParser());
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:5000',
  methods: 'GET, PUT, POST',
  credentials: true
};
app.use(cors(corsOptions))
app.options('http://localhost:5000', cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000");
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
    app.use(main);
  });
} catch (error) {
  console.log(`Error: ${error}`);
}
