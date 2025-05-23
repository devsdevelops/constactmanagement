const mongoose=require("mongoose");
const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user", 
    },
    name:{
        type:String,
        required:[true,"pleasse add the contact name"],

    },
    email:{
        type:String,
        required:[true,"pleasse add the contact name"],

    },
    phone:{
        type:String,
        required:[true,"pleasse add the contact name"],

    },
},
    {
        timestamps:true,
    }

);

module.exports = mongoose.model("Contact", contactSchema);