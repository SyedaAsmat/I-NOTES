import Note from "./Note";
import axios from "axios";
import AddNotes from "./AddNotes";
//import Search from "../Search";
import { useHistory, useLocation } from "react-router";
import { useEffect, useState } from 'react';

const NotesList = () => {
   
    // // let list = localStorage.getItem('notes');
    //  let list = [];
    const [list,setList] = useState('');
    let history = useHistory();
    let location = useLocation();
    

    useEffect(() => {
        const getNotes = ()=> {
            let userId = localStorage.getItem('userId');
            axios.get(`http://localhost:9002/getNotes?userId=${userId}`).then(res => {
                //console.log("Working", res);
                // <Redirect to = '/Note'/>
                //console.log(">>>Notes", res, res.data, typeof(res.data.notes), res.data.status);
                // if(res.data.status){
                    // localStorage.setItem('notes', res.data.notes);
                    //  list.push(res.data.notes);
                    // setList({notes : res.data.notes})
                    // console.log('>>>Vlahaf', location);
                    if(location.state){
                        //setList('');
                        setList([...res.data.notes, location.state.newNote]);
                    } else {
                        setList(res.data.notes);
                    }
                    
                // }
                // history.push("/Note");
                // else {
                //     return false;
                // }
                // return res
                // window.location.href = '/Note'
            }).catch(e => console.error("Error -> ", e));//function to login
        };
        getNotes();
        //console.log(">>>notes",getNotes());
        //console.log(">>>lists", list);
        return <Note/>
    }, [location]);

    
    // list=list.filter(list =>{
    //     return list.text.length>0
    // })
    // console.log(">>>lists", list);
    if(list && list.length > 0){
        list.filter(list => !list.text || !list.date || !list._id);
        return (
            <>
            <div>
                <div className="notes-list">
                    {list.map((note, index) => 
                    (
                        <Note
                        id ={note._id}
                        key={note._id}
                        text={note.text}
                        date={note.date}
                        setList = {setList}
                        list = {list}
                        />
                    ))}
                    <AddNotes/>
                    
                </div>
                <div className="form-container">
                    <button className="btn" onClick={() => {
                        localStorage.clear('userId')
                        history.push('/LogIn')
                    }}>Log Out</button>
                </div>
            </div>
            </>
        )
    } else {
        return (
            <>
            <AddNotes/>
            <div  className="form-container">
                    <button className="btn" onClick={() => {
                        localStorage.clear('userId')
                        history.push('/LogIn')
                    }}>Log Out</button>
                </div>
            </>
        )
    }
   
};

export default NotesList;