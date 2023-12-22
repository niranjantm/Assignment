import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";

export default function verifyUser(req,res,next){
    
    const token = req.cookies.access_token;
    
    if(!token){
        return next(ErrorHandler(401,"Unathorised !"))
    }
    try{
        jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
            if(error){
                return next(ErrorHandler(401,"Forbidden"));
            }
            req.user = user
            next();
        })
    }catch(error){
        next(error);
    }
}