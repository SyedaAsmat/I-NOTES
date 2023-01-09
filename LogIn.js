import {useState} from "react";
import axios from "axios";
import { useHistory } from "react-router";

const LogIn = () => {

    const history = useHistory()

    const [user, setUser] =  useState({
        email:"",
        password:"",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        setUser({
            ...user, 
            [name]:value
        });
    };

    const login = async ()=> {
        await axios("http://localhost:9002/login",{method:"POST", data: user }).then(res => {
            //console.log("Working login", res, user,res.data.user._id);
            if(res.data.status){
                localStorage.setItem('userId' , res.data.user._id);
                history.push({pathname : '/Note',state : {
                    newNote : ''
                }});
                //<Redirect to="/Note"/>
            } else{
                alert('Please Check your credentials')
            }
            // window.location.href = '/Note'
        });//function to login
    };

return (
    <div className="form-container">
        <h1>Log In</h1>
        <input type="text" name="email" value={user.email} placeholder="Enter your Email" onChange={handleChange} autoComplete="off"/>
        <input type="password" name="password" value={user.password} placeholder="Enter your Password" onChange={handleChange} autoComplete="off"/>

        <div className="btns">
            <button className="btn" onClick={login}>Log In</button>
            <p>Not a User?{' '}
            <button className="lnk" onClick={()=>history.push("/")}>Register</button> Now!</p>
        </div>
    </div>
    );
};

export default LogIn;