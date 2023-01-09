import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
const AddNotes = ({handleAddNote}) => {

    const [Note, setNoteText] = useState({
        note : "",
        userId : localStorage.getItem('userId'),
    });
    const characterLimit = 200;

    const handleChange = (event) => {
        if(characterLimit - event.target.value.length >= 0)
        setNoteText({[event.target.name] : event.target.value});
    };

let history = useHistory();
    const handleSaveClick = async (post, e) => {
        if(Note.note.trim().length > 0){
            //handleAddNote(Note.text);
            // const headers={
            //     "Content-Type":"application/json",
            // };
            let data = {
                userId : localStorage.getItem('userId'),
                note : post.note,
            }
            //console.log(">>>PostData", post, typeof(post));
            //console.log(">>Saving",post);
            await axios(`http://localhost:9002/add`,{method:"POST", data: data }).then((result)=>{
                console.log("Note Added Successfully");
                // e.preventDefault();
                history.push({pathname : '/Note',state : {
                    newNote : data.note
                }});
            }).catch((e)=>{
                console.log(">>Error",e)
            });
            setNoteText({note : ''});
        }
    };

    return(
        <div className="note new">
            {/* {console.log("Note", Note, parseInt(Note.note.length), Number(Note.note.length), typeof(Note.note.length))} */}
            <textarea
            rows="8"
            cols="10"
            name = "note"
            placeholder="Type to Add a Note..."
            value={Note.note}
            onChange={handleChange}
            ></textarea>
            <div className="note-footer">
                <small>{Note.note ? Note.note.length ? characterLimit - parseInt(Note.note.length) : characterLimit : characterLimit} Remaining</small>
                <button className="save" onClick={() => handleSaveClick(Note)}>Save</button>
            </div>
        </div>

    )
}

export default AddNotes;