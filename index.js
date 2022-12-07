import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

main()
.then((res) =>console.log(res))
.catch((err) =>console.log(err));

async function main(){
    await mongoose.connect("process.env.CONN");
}
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get ("/", (req, res)=>{
    res.send("Hello world");
});

app.listen(8080,()=>{
    console.log("Server Running on port 8080");
})