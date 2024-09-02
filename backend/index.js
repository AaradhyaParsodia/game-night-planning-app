import express from "express";
import "dotenv/config";
import connectionDB from "./src/config/config.js";
import { rootRouter } from "./src/routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1", rootRouter);

app.get("/check", (req, res)=>{
    res.status(200).send("<h1>All Good<h1/>");
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
});

connectionDB();

app.listen(port, (err)=>{
    if(!err){
        console.log(`shhhhhhhhhhhhhhhhhhhhh it is listening over ${port} using [Express]`);
    }
    else{
        console.error(err);
    }
});