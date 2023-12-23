import express from "express"
import User from "../models/User.model.js"
import ErrorHandler from "../utils/error.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken"


const router = express.Router();

// ---------------------------------------------- SIGN-UP ---------------------------------------------------------//
router.post("/signUp", async (req,res,next)=>{
    const {userName,email,password} = req.body
    console.log(req.body)
    try{   
        // using bycrypt module to hash password 
            const hashedPassword = bycrypt.hashSync(password,10)
            console.log(hashedPassword)
            const user = await User.create({userName,email,password:hashedPassword});
            res.status(201).json("User created")
    }catch(error){
        next(error);
    } 
})

//----------------------------------------------- SIGN-IN ---------------------------------------------------------//

router.post("/signIn", async(req,res,next)=>{
    const {email,password} = req.body;
    // Checking if the user has entered the email before contacting DB
    if(!email){
        return next(ErrorHandler(401,"Unauthorised"))
    }
    try{
        // Checking the user is present in the DB by using user email
        const validUser = await User.findOne({email})
        if(!validUser){
            return next(ErrorHandler(401,"Invalid Credentials"));
        }
        // Comparing user password with hashed password by using bycrypt.compareSync() functions
        const validPassword = bycrypt.compareSync(password,validUser.password);
        if(!validPassword){
            return next(ErrorHandler(401,"Invalid Credentials"))
        }
        // Separating the user password from rest of the user data. So that we can send the rest data as response
        const {password:pass,...rest} = validUser._doc;
        // Creating a jwt token by using jsonweb-token
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET)
        res.cookie("access_token",token,{httpOnly:true}).status(200).json(rest)
    }catch(error){
        next(error)
    }
})

//----------------------------------------USER SIGN-OUT---------------------------------------------------------//
router.post("/signOut",(req,res,next)=>{
    try{
        res.clearCookie("access_token").status(200).json("User sign-out successfull")
    }catch(error){
        next(error)
    }
})
export default router;