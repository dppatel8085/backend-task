import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    address: {
        type: String,
        required: true
    },
    date: {   
        type: Date,
        default: Date.now 
    }
});

const bookIns = mongoose.model('book', bookSchema);
export default bookIns;
