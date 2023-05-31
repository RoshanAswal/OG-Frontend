import {useState} from 'react';
import {useCookies} from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import welcomeText from "../images/welcomeback.png";
import CryptoJS from 'crypto-js';

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
    const [invalid,showInvalid]=useState(false);
    const [verify,setVerify]=useState(false);
    const [showOTP,setShowOTP]=useState(false);

    const submission=async (e)=>{
        e.preventDefault();
        setVerify(true);
        try{
            const passwordEncrypt=CryptoJS.AES.encrypt(password,process.env.REACT_APP_SECRET).toString();
            const response=await axios.post(`${process.env.REACT_APP_CONNECTION}auth/login`,
            {username,password:passwordEncrypt});;

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
        setVerify(false);
    }

    const getOtp=async (e)=>{
        e.preventDefault();
        setOtpCheck(true);
        setValid(true);
        try{
            const res=await axios.post(`${process.env.REACT_APP_CONNECTION}auth/forgotPassword`,{email});
            if(res.data==="none"){
                setShowOTP(false);
                setFound(false);return;
            }
            setShowOTP(true);
            setFound(true);
            await axios.post(`${process.env.REACT_APP_CONNECTION}auth/getOtp`,{email,OTP,username});
        }catch(err){
            console.log(err);
        }
    }
    const checkOtp=async (e)=>{
        e.preventDefault();
        setVerify(true);
        if(password.length<11){
            setVerify(false);
            return;
        }

        if(Number(otp)!==OTP){
            setOtpCheck(false);
            setVerify(false);
            return;
        }
        setOtpCheck(true);
        setShowOTP(false);
        if(invalid){
            showInvalid(true);
            return;
        }else{
            const PassEncrypt=CryptoJS.AES.encrypt(password,process.env.REACT_APP_SECRET).toString();
            const emailEncrypt=CryptoJS.AES.encrypt(email,process.env.REACT_APP_SECRET).toString();
            const res=await axios.post(`${process.env.REACT_APP_CONNECTION}auth/setNewPassword`,{password:PassEncrypt,email:emailEncrypt});
            
            setForgot(false);
            setShowOTP(false);
            setValid(true);
        }
        setVerify(false);
    }
    const checkPassword=(e)=>{
        setpassword(e.target.value);
        // const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if(password.length<11)showInvalid(true);
        else showInvalid(false);
    }
    const OtpFun=(e)=>{
        setShowOTP(false);
        setOtp(e.target.value);
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
                            <input type="text" placeholder='Otp' name="Otp" value={otp} onChange={(e)=>OtpFun(e)} required/>
                            <button id='otp' onClick={(e)=>{getOtp(e)}}>Get Otp</button>
                            <input type="password" placeholder='New Password' name="password" value={password} onChange={(e)=>checkPassword(e)} required/>
                            <button id='submit' onClick={(e)=>{checkOtp(e)}}>Login</button>
                        </div>
                        :
                        <div id='input-section'>
                            <input type="text" placeholder='Username' name="username" value={username} onChange={(e)=>setusername(e.target.value)} required/>
                            <input type="password" placeholder='Password' name="password" value={password} onChange={(e)=>checkPassword(e)} required/>
                            <div>
                                <button id='submit' type="submit">Login</button>
                                <h4 onClick={()=>setForgot(true)}>Forgot Password</h4> 
                            </div>
                        </div>
                    }

                    {!valid?<h3>invalid username or password</h3>:""}

                    {found?"":<div>User not found</div>}
                    {showOTP?<div>Otp Sent</div>:""}
                    {forgot?
                        <div>
                            {otpCheck?"":<div>Otp not correct</div>}
                            {invalid || password.length<11?<div>Password length should be above 10</div>:""}
                        </div>
                        :""
                        // <div>
                        //     <button id='submit' type="submit">Login</button>
                        //     <h4 onClick={()=>setForgot(true)}>Forgot Password</h4> 
                        // </div>
                    }
                </form>
            </div>
            {verify? <h2>Verifying...</h2>:""}
        </div>

    )
};