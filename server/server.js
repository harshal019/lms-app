const express=require("express");
const app=express();
const {dbConnect}=require("../server/config/connectDB");
const userRouter=require("../server/routes/userRouter");
const bookRouter=require("../server/routes/bookRouter");
const issuedBookRouter=require("../server/routes/issueBookRouter");
require("dotenv").config();

const db = dbConnect();
app.use(express.json());

app.use("/user",userRouter);
app.use("/book",bookRouter);
app.use("/issedBook",issuedBookRouter);




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

