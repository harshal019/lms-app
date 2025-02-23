const express=require("express");
const app=express();
const {dbConnect}=require("../server/config/connectDB");
const userRouter=require("../server/routes/userRouter");
const bookRouter=require("../server/routes/bookRouter");
const issuedBookRouter=require("../server/routes/issueBookRouter");
require("dotenv").config();
const cors=require('cors');
const bodyParser=require('body-parser');

const db = dbConnect();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin:"http://localhost:5173",
    optionSuccessStatus:200,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies if needed
}));


app.use("/user",userRouter);
app.use("/book",bookRouter);
app.use("/issedBook",issuedBookRouter);




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

