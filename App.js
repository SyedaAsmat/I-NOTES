import { useState } from "react";
import {BrowserRouter as Routes, Switch, Route} from "react-router-dom";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import NotesList from "./components/NotesList";
import Header from "./components/Header";
// import axios from "axios";
// import { useHistory } from "react-router";

const App = () => {
  //search bar

  const[darkMode, setDarkMode] = useState(false);//dark mode toggle btn

  // const deleteNote = (id) => {
  //   const newNotes = notes.filter((note)=> note.id !== id);
  //   setNotes(newNotes);
  // };//delete a node

  // const [user, setLoginUser] = useState({});//login connection
  let dataUser = localStorage.getItem('userId');

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
      <Header handleToggleDarkMode={setDarkMode}/>
        <Routes>
          <Switch>
            <Route exact path="/">
              <Register/>
            </Route>
            <Route exact path="/LogIn">
              <LogIn/>
            </Route>
            <Route exact path="/Note">
              {/* {console.log(">>>Printed", dataUser)} */}
              {
                (dataUser) ? 
                <div>
                <NotesList/>
                </div>
                :<LogIn/>}
            </Route>
          </Switch>
        </Routes>
        
      </div>
    </div>
  )
};

export default App;

//front end code
//to run use: npm start