const asyncHandler=require("express-async-handler");

const Contact=require("../models/contactmodel");

const getContact=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find();
    res.status(200).json({contacts});

});

const createContact =asyncHandler(async(req,res)=>{
    console.log("the request body :",req.body);
    const {name,email,phone}=req.body;
    if(!name||!email||!phone){
       
       throw new Error("All fields are mandatory"); 
    }
    const contact= await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,
    });
    res.status(201).json(contact);

});

const updateContact =asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    // res.status(200).json({message:`update all contacts ${req.params.id}`});
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update other user");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);

});

const deleteContact =asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(403);
        throw new Error("contact not found")

    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update other user");
    }
    await Contact.deleteOne(req.params.id);
    res.status(200).json(contact);

});

module.exports={getContact,createContact,updateContact,deleteContact};