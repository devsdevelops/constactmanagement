//register user
//@acess public
const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt");
const User =require("../models/userModel")
const jwt= require("jsonwebtoken");

const registeUser=asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body;
    if(!username || !email || !password){
        throw new Error("All fields are mandatory!");
    }
    const userAvailable= await User.findOne({email});
    if(userAvailable){
        // res.status(400);
        throw new Error("User already registered!");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);
    const user =await User.create({
        username,
        email,
        password:hashedPassword,
    });
    console.log(`user created ${user}`);
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    }else{
        res.status(400);
        throw new Error("user data us not valid");
    }   
    res.json({message:"register the user"});

});

const loginUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const user=await User.findOne({email});
    if (user && (await bcrypt.compare(password,user.password))){
        const acessToken = jwt.sign({
        user:{
            username:user.username,
            email:user.email,
            id:user.id
        },
        },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"1h"}
    );
        res.status(200).json({acessToken});
    }
    else{
        res.status(401)
        throw new Error("email or password is not valid  ")

    }
    res.status(200).json({message:"login user"});

});

const currentUser=asyncHandler(async(req,res)=>{
     
    res.json(req.user);

});



module.exports={registeUser,loginUser,currentUser};