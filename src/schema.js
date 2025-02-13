import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        default:'patient'
    }
})

const userIns=mongoose.model('users',userSchema);
export default userIns;