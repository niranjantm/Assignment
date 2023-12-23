import express from "express";
import Task from "../models/Task.model.js";
import verifyUser from "../utils/verifyUser.js";
import ErrorHandler from "../utils/error.js";


const router = express.Router();

//----------------------------------------------CREATE TASK-----------------------------------------------------------//
router.post("/create",verifyUser,async(req,res,next)=>{ // Here userID is the mongoDB ID of the user which is passed from the frontent  
    
    let {title,description,status,userId} = req.body
    if(req.user.id!==userId){
        return next(ErrorHandler(401,"Unathorised"));
    }
    status = status.toLowerCase();
    console.log(status)
    if(status!== "incomplete" && status!== "in-progress" && status!== "completed" ){
        return next(ErrorHandler(400,"Use incomplete or in-progress or completed to describe the status"))
    }
    try{
        const task = await Task.create({title,description,status,userId});
        res.status(201).json("Task Created");
    }catch(error){
        next(error);
    }
})

//---------------------------------------------GET TASKS BY ID ----------------------------------------------------------//
router.get("/get/:taskId",async(req,res,next)=>{
    const {taskId} = req.params;
    try{
        const task = await Task.findById(taskId);
        if(!task){
            return next(ErrorHandler(404,"Task not found"));
        }
        res.status(200).json(task);
    }catch(error){
        next(error)
    }

})

//----------------------------------------GET TASKS BY STATUS -------------------------------------------------------------//

router.get("/get",async(req,res,next)=>{

const{status} = req.query
    try{
        if(status){
            const tasks = await Task.find({status:status});
            return res.status(200).json(tasks);
        }else{
            const tasks = await Task.find();
            return res.status(200).json(tasks);
        }
        
    }catch(error){
        next(error);
    }
})

//--------------------------------------------- DELETE TASK ------------------------------------------------------//
router.delete("/delete/:userId/:taskId",verifyUser,async(req,res,next)=>{
    const{userId,taskId} = req.params
    if(req.user.id!==userId){
        return next(ErrorHandler(401,"Unauthorised"))
    }
    try{
        const task = await Task.findByIdAndDelete(taskId)
        res.status(200).json("Task Deleted")
    }catch(error){
        next(error)
    }
})
//----------------------------------------------EDIT TASK----------------------------------------------------------//
router.put("/update/:userId/:taskId",verifyUser,async(req,res,next)=>{

    const{userId,taskId} = req.params
    let {status} = req.body
    status = status.toLowerCase();
 
    if(req.user.id!==userId){
        return next(ErrorHandler(401,"Unauthorised"))
    }
    if(status!=="incomplete" && status!== "in-progress" && status!== "completed" ){
        return next(ErrorHandler(400,"Use incomplete or in-progress or completed to describe the status"))
    }
    try{
        const validTask = await Task.findById(taskId);
        if(!validTask){
            return next(ErrorHandler(404,"Task not found"))
        }

        const task = await Task.findByIdAndUpdate(taskId,{status:req.body.status})
        res.status(200).json("Task Updated")
    }catch(error){
        next(error)
    }
})

export default router;