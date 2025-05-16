const {constants}=require("../constants");
const errorHandler =(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode:500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title:"validation Failed",message:err.message,stackTrace:err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({
                title:"NOT Found",
                message:err.message,
                stackTrace:err.stack,
            });
        case constants.SERVER_ERROR:
            res.json({
                title:"Server Error",
                message:err.message,
                stackTrace:err.stack,

            });
            
    }
    res.json({title:"Not Found",Message:err.message,stackTrace:err.stack});
    res.json({title:"validation Failed",message:err.message,stackTrace:err.stack});
    
};
module.exports = errorHandler;

