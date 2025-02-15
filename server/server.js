const express=require("express");
const app=express();
const {dbConnect}=require("../server/config/connectDB");
const userRouter=require("../server/routes/userRouter");
require("dotenv").config();

const db = dbConnect();
app.use(express.json());

app.use("/api/v1",userRouter);



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

