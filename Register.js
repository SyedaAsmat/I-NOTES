import {useState} from "react";
import axios from "axios";
import { useHistory } from "react-router";
import validator from "validator";

const Registers = () => {

    const history = useHistory()

    const [user, setUser] =  useState({
        name:"",
        email:"",
        password:"",
        reEnterPassword:"",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        setUser({
            ...user, 
            [name]:value
        });
    };

    const register = () => {
        const {name,email,password, reEnterPassword}=user;
        if (name && validator.isEmail(email) && password.length===8 && (password === reEnterPassword)){
            axios.post("http://localhost:9002/register", user).then(res => {
                alert(res.data.message)
                history.push("/LogIn")
            })
        }
        else{
            alert("Please fill all the credentials correctly, like:\nemail@sample.com\nPassword should be of minimum 8 letters\n")
        }
    }     

    return (
        <div className="form-container">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}/>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}/>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}/>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-Enter Password" onChange={handleChange}/>
            <div className="btns">
            <button className="btn" onClick={register}>Register</button>
            <p>Already a User?{' '}
            <button className="lnk" onClick={()=>history.push("/LogIn")}>Log In</button></p>
            </div>
        </div>
    );
};

export default Registers;