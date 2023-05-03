import {useState} from 'react';
import {useCookies} from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import welcomeText from "../images/welcomeback.png";

// import {useDispatch} from 'react-redux';
// import { addUserId } from '../store/UserSlice';
// import { addCookie } from '../store/UserSlice';

export const Login=()=>{
    const navigate=useNavigate();
    // const dispatch=useDispatch();

    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const [valid,setValid]=useState(true);
    const [_,setCookie]=useCookies(["access_token"]);
    const [otp,setOtp]=useState("");
    const [email,setEmail]=useState("");
    const [OTP,setOTP]=useState(1000+Math.floor(Math.random()*9999));
    const [found,setFound]=useState(true);
    const [forgot,setForgot]=useState(false);
    const [otpCheck,setOtpCheck]=useState(true);
    const [invalid,showInvalid]=useState(true);

    const submission=async (e)=>{
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:3001/auth/login",
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

    const getOtp=async (e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://localhost:3001/auth/forgotPassword",{email});
            console.log(res.data);
            if(res.data==="none"){
                setFound(false);return;
            }
            setFound(true);
            await axios.post("http://localhost:3001/auth/getOtp",{email,OTP,username});
        }catch(err){
            console.log(err);
        }
    }
    const checkOtp=async (e)=>{
        e.preventDefault();
        if(Number(otp)!==OTP){
            setOtpCheck(false);
            return;
        }
        if(invalid){
            setOtpCheck(true);
            showInvalid(true);
            return;
        }else{
            const res=await axios.post("http://localhost:3001/auth/setNewPassword",{password,email});
            console.log("here");
            setForgot(false);
            setValid(true);
        }
    }
    const checkPassword=(e)=>{
        setpassword(e.target.value);
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        if(regex.test(password))showInvalid(false);
        else showInvalid(true);
    }

    return (
        <div className='LogPage'>
            <Navbar />
            <div className="Login">
                <form onSubmit={submission}>
                    <img src={welcomeText} />
                    {
                        forgot?
                        <div id='forgotPassword'>
                            <input type="email" placeholder='email' name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                            <input type="text" placeholder='Otp' name="Otp" value={otp} onChange={(e)=>setOtp(e.target.value)} required/>
                            <button id='otp' onClick={(e)=>{getOtp(e)}}>Get Otp</button>
                            <input type="password" placeholder='New Password' minLength={8} name="password" value={password} onChange={(e)=>checkPassword(e)} required/>
                            <button id='submit' type='submit' onClick={(e)=>{checkOtp(e)}}>Login</button>
                        </div>
                        :
                        <div id='input-section'>
                            <input type="text" placeholder='Username' name="username" value={username} onChange={(e)=>setusername(e.target.value)}/>
                            <input type="password" placeholder='Password' name="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                        </div>
                    }
                    {found?"":<div>User not found</div>}
                    {!valid?<h3>invalid username or password</h3>:""}
                    {forgot?
                        <div>
                            {otpCheck?"":<div>Otp not correct</div>}
                            {invalid?<div>Password not Strong</div>:""}
                        </div>
                        :
                        <div>
                            <button id='submit' type="submit">Login</button>
                            <h4 onClick={()=>setForgot(true)}>Forgot Password</h4> 
                        </div>
                    }
                </form>
            </div>
        </div>

    )
};