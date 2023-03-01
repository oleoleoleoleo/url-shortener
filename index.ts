import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {  
    res.send("ok")
});

app.listen(3000);