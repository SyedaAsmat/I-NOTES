import Express from "express";
import cors from "cors";
import mongoose from "mongoose";
import mongodb from "mongodb";

let URL = `mongodb://localhost:27017/i-notes-db`;

const app = Express()
app.use(Express.json())
app.use(Express.urlencoded({extended : true}))
app.use(cors())
mongoose.connect("mongodb://localhost:27017/i-notes-db",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log("DB Connected")
})//Connect to MongoDb

//Routes

app.post("/login",(req, res) => {
    console.log(">>>Logif", req.body);
    const {email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        console.log(">>>user in index", user);
        if(user){
            if(password === user.password){
                return res.send({status : true, message:"Log In Successful", user: user})
            }else{
                return res.send({status : false, message:"Password didn't match"})
            }
        }else{
            return res.send({status : false, message:"User Not Registered"})
        }
    });
});

app.post("/register",(req, res) => {
    const {name, email, password} = req.body
    User.findOne({email: email}, (err,user) => {
        if(user){
            return res.send({status : false, message: "User already Registered"})
        }else{
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    return res.send(err)
                }else{
                    return res.send({status : true, message: "Successfully Registered,Please Log In Now."})
                }
            });
        }
    });
});

app.post("/add",async (req, res) => {
    console.log("Route hit end", req);
    let {userId, note} = req.body;
    let date = new Date().toString();
    // const ObjectId=mongodb.ObjectId;
    // var id=req.params.id;
    // var user_id=new ObjectId(id);
    console.log(">>>req body", req.body);
    
    if(!req.body.userId){
         return res.send({status : false, message : 'User not found'});
    }
    let createNote = new Note({
        userId : userId,
        text : note,
        date : date,
    });
    console.log('Boom', createNote);
    await createNote.save(err => {
        if(err) {
            // res.send(err);
            return console.log(">>>Error Occurred");
        } else {
            return res.send({status : true, message : 'Note added'});
        }
    })
});

// app.post("/delete",async (req, res) => {
//     console.log("Route hit end", req);
//     let {userId, note} = req.body;
//     let date = new Date().toString();
//     // const ObjectId=mongodb.ObjectId;
//     // var id=req.params.id;
//     // var user_id=new ObjectId(id);
//     console.log(">>>req body", req.body);
    
//     if(!req.body.noteId){
//          return res.send({status : false, message : 'Note not found'});
//     }
//     let DeleteNote = new Note({
//         noteId : noteId,
//         text : note,
//         date : date,
//     });
//     console.log('Boom', DeleteNote);
//     await DeleteNote.delete(err => {
//         if(err) {
//             // res.send(err);
//             return console.log(">>>Error Occurred");
//         } else {
//             return res.send({status : true, message : 'Note removed from db'});
//         }
//     })
// });

app.get('/getNotes',async (req, res) => {
    let userId = req.query.userId;
    try{
        let foundNotes = await Note.find({userId : userId});
        if(!foundNotes || foundNotes.length < 1){
            return res.send({status : false, message : 'No Notes found'});
        }
         return res.send({status : true, message : 'Notes found successfully', notes : foundNotes});
    } catch(e){
        return console.log(">>Error Occurred in Getting Notes", e);
    }
    // console.log(">>>UserId", req.body, req.allparams, postData, req);
    
})
app.delete('/delete',async (req, res) => {
    // let userId = req.query.userId;
    console.log(">>>Delete api", req.body);
    let userId = req.query.userId;
    let noteId = req.query.noteId;
    if(!userId || !noteId){
        return res.send({status : false, message : 'body is missing'});
    }
    try{
        let deleted = await Note.deleteOne({userId : userId, _id : noteId});
        if(!deleted || deleted.length < 1){
            return res.send({status : false, message : 'No Notes found'});
        }
         return res.send({status : true, message : 'Notes Deleted successfully'});
    } catch(e){
        return console.log(">>Error Occurred in Deleting Notes", e);
    }
    // console.log(">>>UserId", req.body, req.allparams, postData, req);
    
})

const noteSchema = new mongoose.Schema({
    userId: String,
    text: String,
    date: String,
})//taking notes data

const Note = new mongoose.model("Note", noteSchema)

app.listen(9002,(req, res)=>{
    return console.log("Be started at port 9002")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})//taking user data

const User = new mongoose.model("User", userSchema)


//back end code
//to run use: npm start
//in this section, the update is: note table is created in the db but no value is saving yet
//Hopefull, notes will be saving in db soon
//Thank You. 