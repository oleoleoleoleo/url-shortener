import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
import shortenRouter from "./app/controllers/shortenController";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("ok");
});

app.use(shortenRouter);

app.listen(process.env.APP_PORT);
