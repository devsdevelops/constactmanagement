const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization || req.header.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("user is not authorized  ");

            }
            req.user=decoded.user;
            next();

            // console.log(decoded);
        });
    }
        else {
            res.status(401);
            throw new Error("User not authorized or token is missing");
        }
    }
);

module.exports = validateToken;