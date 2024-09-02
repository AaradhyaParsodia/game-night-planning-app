import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/check", (req, res)=>{
    res.status(200).send("<h1>All Good<h1/>");
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
});

app.listen(port, (err)=>{
    if(!err){
        console.log(`shhhhhhhhhhhhhhhhhhhhh it is listening over ${port} using [Express]`);
    }
    else{
        console.error(err);
    }
});