const express=require("express");

const router=express.Router();
const {registerUser, getuser, getStudent}=require("../controllers/auth");
const {loginUser}=require("../controllers/auth");


router.post("/register",registerUser);

router.post("/login",loginUser);
router.get("/:username",getuser);
router.get("/",getStudent);


module.exports=router;