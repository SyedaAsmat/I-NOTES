import Express from "express";
import cors from "cors";
import mongoose, { Model } from "mongoose";

const app = Express()
app.use(Express.json())
app.use(Express.urlencoded())
app.use(cors())
mongoose.connect("mongodb://localhost:27017/i-notes-db",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log("DB Connected")
});//Connect to MongoDb

app.post("/Note",(req, res) => {
    const ObjectId=require('mongodb').ObjectId;
    var id=req.params.id;
    var user_id=new ObjectId(id);
    Model.find({id: user_id}) = req.body
    //fetching user id
});

const noteSchema = new mongoose.Schema({
    user_id= String,
    id: String,
    text: String,
    date: String,
})//taking notes data

const Note = new mongoose.model("Note", noteSchema)
module.exports=Note;