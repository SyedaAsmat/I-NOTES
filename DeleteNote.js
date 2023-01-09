import { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router";
const URL='http://localhost:9002/';

const DeleteNote = ({handleDeleteNote}) => {
    const [Note, delNote] = useState({
        note : "",
        noteId : localStorage.getItem('_id'),
    });

    let history = useHistory();

    const handleDeleteClick = async (get, e) => {
        if(Note.note.length > 0){
            handleDeleteNote(Note.text);
            // const headers={
            //     "Content-Type":"application/json",
            // };
            let data = {
                noteId : localStorage.getItem('_id'),
                note : get.note,
            }
            console.log(">>Deleting",get);
            await axios(`http://localhost:9002/delete`,{method:"GET", data: data}).then((result)=>{
                console.log("Note Deleted Successfully");
                // e.preventDefault();
                history.push({pathname : '/Note',state : ""});
            }).catch((e)=>{
                console.log(">>Error",e)
            });
            DeleteNote({note : ''});
        }
    };
}