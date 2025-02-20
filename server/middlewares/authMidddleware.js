const jwt=require("jsonwebtoken");

require("dotenv").config();

const authMiddleware=(req,res,next)=>{

    const token =req.header('x-uth-token');
    if(!token) {
        return res.status(401).json({message:"Access denied"});
    }

    try {
        
        const decode=jwt.verify(token ,process.env.SECRET_KEY);
        req.key=decoded;

        next();


    } catch (error) {
        res.status(400).json({
            error:error.message,
            message:"token is invalid"
        }); 
    }
}

module.exports=authMiddleware;