const jwt=require("jsonwebtoken");

require("dotenv").config();

const authMiddleware=(req,res,next)=>{

    const token =req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({message:"No token autorization denied"});
    }

    try {
        
        const decode=jwt.verify(token ,process.env.SECRET_KEY);
        req.user=decode;

        next();


    } catch (error) {
        res.status(400).json({
            error:error.message,
            message:"token is invalid"
        }); 
    }
}

module.exports=authMiddleware;