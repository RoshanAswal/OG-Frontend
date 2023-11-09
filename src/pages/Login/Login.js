import {useState,useEffect} from 'react';
import {useCookies} from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../../components/Navbar/Navbar';
import welcomeText from "../../images/welcomeback.png";
import CryptoJS from 'crypto-js';

import ram from '../../images/ram.png';
import rem from '../../images/rem.png';
import styles from './Login.module.css';

import aos from 'aos';


export const Login=()=>{
    const navigate=useNavigate();

    useEffect(()=>{
        aos.init({duration:1500});
    },[]);

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
        if(password.length<11)return;
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
        <div className={styles.LoginPage}>
            <Navbar />
            <div id={styles.remImg} data-aos='fade-right'>
                <img src={rem} alt='rem'/>
            </div>
            <div className={styles.LoginDiv}>
                <form onSubmit={submission}>
                    <h1>Welcome Geek</h1>
                    {
                        forgot?
                        <div id={styles.forgotPassword}>
                            <input type="email" placeholder='email' name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                            <input type="text" placeholder='Otp' name="Otp" value={otp} onChange={(e)=>OtpFun(e)} required/>
                            <button id={styles.otp} onClick={(e)=>{getOtp(e)}}>Get Otp</button>
                            <input type="password" placeholder='New Password' name="password" value={password} onChange={(e)=>checkPassword(e)} required/>
                            <button id={styles.submit} onClick={(e)=>{checkOtp(e)}}>Login</button>
                        </div>
                        :
                        <div id={styles.inputSection}>
                            <input type="text" placeholder='Username' name="username" value={username} onChange={(e)=>setusername(e.target.value)} required/>
                            <input type="password" placeholder='Password' name="password" value={password} onChange={(e)=>checkPassword(e)} required/>
                            <div>
                                <button id={styles.submit} type="submit">Login</button>
                                <h4 onClick={()=>setForgot(true)}>Forgot Password</h4> 
                            </div>
                        </div>
                    }

                    {!valid?<h3>invalid username or password</h3>:""}

                    {found?"":<h3>User not found</h3>}
                    {showOTP?<h3>Otp Sent</h3>:""}
                    {forgot?
                        <div>
                            {otpCheck?"":<h3>Otp not correct</h3>}
                            {invalid?<h3>Password length should be above 10</h3>:""}
                        </div>
                        :""
                    }
                </form>
            </div>
            <div id={styles.ramImg} data-aos='fade-left'>
                <img src={ram} alt='ram'/>
            </div>
            {verify? <h2 className={styles.verifyText}>Verifying...</h2>:""}
        </div>

    )
};