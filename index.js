import express from 'express'
import cors from 'cors'
import connectDb from './src/connectDb.js';
import userIns from './src/userService.js'

const app = new express();


app.use(express.json())
app.use(cors())
connectDb()

app.post("/login",async(req,res)=>{
    try{
        const userData=req?.body;
        const getUSerData=await userIns.login(userData);
        return res.status(200).json(getUSerData);
    }catch(error){

    }
})

app.post("/",async(req,res)=>{
    try {
        const userData=req?.body;
        const isSaveUser=await userIns.createUser(userData);
        return res.status(200).json(isSaveUser);
    } catch (error) {
        return res.status(400).json({ success: false, message: error?.message })
    }
})

app.post("/book-appointment",async(req,res)=>{
    try {
        const userData=req?.body;
        const isSaveUser=await userIns.bookAppointment(userData);
        return res.status(200).json(isSaveUser);
    } catch (error) {
        return res.status(400).json({ success: false, message: error?.message })
    }
})

app.get('/user-list', async(req, res) => {
    try {
        const getUSerData=await userIns.userList();
        return res.status(200).json(getUSerData);
    } catch (error) {
        return res.status(400).json({ success: false, message: error?.message })
    }
})

app.get('/list', async(req, res) => {
    try {
        const getUSerData=await userIns.userdata();
        return res.status(200).json(getUSerData);
    } catch (error) {
        return res.status(400).json({ success: false, message: error?.message })
    }
})


app.delete('/:id', async(req, res) => {
    try {
        const {id}=req?.params
        const getUSerData=await userIns.cancelAppointMent(id);
        return res.status(200).json(getUSerData);
    } catch (error) {
        return res.status(400).json({ success: false, message: error?.message })
    }
})

app.listen(3000,()=>{
    console.log("Server is running")
})