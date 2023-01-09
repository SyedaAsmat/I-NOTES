import {MdDeleteForever} from "react-icons/md";
//import { useEffect } from "react";
import axios from "axios";

const Note = ({id, text, date, setList, list}) => {
    let userId = localStorage.getItem('userId');
    //console.log(">>>Note ID -1", id)
        const handleDeleteClick = (userId, noteId) => {
            let data ={
                userId : userId,
                noteId : noteId,
            }
            const headers={
                "Content-Type":"application/json",
            };
            console.log(">>>Inside note component", data);
            axios.delete(`http://localhost:9002/delete?userId=${userId}&noteId=${noteId}`,headers, data).then(() => {
                let newList = list.filter( item => item._id !== id);
                setList(newList);
            }).catch((e) => {
                console.log(">>>Error in Deletion -> ", e);
            });
        }
    return (
        <div className="note">
            <span>{text}</span>
            <div className="note-footer">
                <small>{date}</small>
                <MdDeleteForever 
                    onClick={() => handleDeleteClick(userId, id)} className="delete-icon" 
                    size="1.3em"
                />
            </div>
        </div>
    )
};

export default Note;