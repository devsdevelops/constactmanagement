const express= require("express");
const connectDb=require("./config/dbConnection");
const errorHandler=require("./middleware/errorHandler")
const dotenv = require("dotenv").config();
const app=express();

const port =process.env.PORT || 5000;
connectDb();
// app.get('/api/contacts',(req,res)=>{
//     res.status(200).json({message:"get all contacts"});
// });
app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));

app.use(errorHandler);
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});