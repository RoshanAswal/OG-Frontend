import {useState} from 'react';
import {useCookies} from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
    
export const Login=()=>{
    const navigate=useNavigate();

    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const [valid,setValid]=useState(true);
    const [_,setCookie]=useCookies(["access_token"]);

    const submission=async (e)=>{
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:3000/auth/login",
            {username,password});;

            if(response.data.userId){
                setCookie("access_token",response.data.token);
                window.localStorage.setItem("userId",response.data.userId);     
                setValid(true);
                navigate("/");
            }else{
                setValid(false);
            }
            
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="Register">
            <form onSubmit={submission}>
                <h1>Welcome back Geek</h1>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username} onChange={(e)=>setusername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                </div>
                {!valid?<h1>invalid username or password</h1>:""}
                <button type="submit">Login</button>
            </form>
        </div>
    )
};