const express=require("express");

const router=express.Router();
const {registerUser, getuser}=require("../controllers/auth");
const {loginUser}=require("../controllers/auth");


router.post("/register",registerUser);

router.post("/login",loginUser);
router.get("/:username",getuser);


module.exports=router;