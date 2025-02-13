
import mongoose from "mongoose";

const connectDb=()=>{
    const url='mongodb://localhost:27017/test-task';
    mongoose.connect(url,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then((res)=>{
        console.log("database connected")
    }).catch((error)=>{
        console.log(error)
    })
}

export default connectDb;

