const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"please add the user name"],
    },

    email:{
        type:String,
        required:[true,"please add thr email"],
        unique:[true,"Email adress already taken"],

    },
    password:{
        type:String,
        required:[true,"pleasr add the user password"],
    },
},
    {
        timestamps:true,
    }

    


)

module.exports=mongoose.model("User",userSchema);