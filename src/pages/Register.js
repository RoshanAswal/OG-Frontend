import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import loginText from "../images/logintext.png";
import registerText from "../images/registeryourself.png";
import alreadyText from "../images/alreadygeek.png";

export const Register=()=>{
    const navigate=useNavigate();
    const [OTP,setOTP]=useState(1000+Math.floor(Math.random()*9999));

    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const [email,setemail]=useState("");
    const [caption,setcaption]=useState("");
    const [gender,setgender]=useState("Male");
    const [country,setcountry]=useState("");
    const [socialURL,setsocialURL]=useState("");
    const [favAnime,setfavAnime]=useState("");
    const [favGame,setfavGame]=useState("");
    const [favCharacter,setfavCharacter]=useState("");
    const [otp,setOtp]=useState("");
    const [showError,setShowError]=useState(false);
    const [usernameWarning,setUsernameWarning]=useState(false);
    const [emailWarning,setEmailWarning]=useState(false);
    const [otpSent,setOtpSent]=useState(false);
    const [invalid,showInvalid]=useState(false);
    const [unique,setUnique]=useState(false);

    const submission=async (e)=>{
        e.preventDefault();
        try{
            let temp=parseInt(otp);
            if(temp!==OTP){
                setShowError(true);
                return;
            }else{
                setShowError(false);
            }
            // if(emailWarning || showError || usernameWarning || invalid || unique){
            //     return;
            // }
            const response=await axios.post(`${process.env.REACT_APP_CONNECTION}auth/register`,
            {username,password,email,caption,gender,country,socialURL,favAnime,favGame,favCharacter});
            const msg=response.data.message;
            if(msg==="email"){
                setEmailWarning(true);
                setUsernameWarning(false);
                setUnique(false);
            }else if(msg==="username"){
                setUsernameWarning(true);
                setEmailWarning(false);
                setUnique(false);
            }else if(msg==="notUnique"){
                setUnique(true);
                setUsernameWarning(false);
                setEmailWarning(false);
            }else if(invalid)return;
            else{
                navigate("/login");
            }

        }catch(err){
            console.log(err);
        }
    }

    const checkPassword=(e)=>{
        setpassword(e.target.value);
        // const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if(password.length>10)showInvalid(false);
        else showInvalid(true);
    }

    const getOtp=async (e)=>{
        e.preventDefault();
        setOtpSent(true);
        // setOTP(1000+Math.floor(Math.random()*9999));
        try{
            await axios.post(`${process.env.REACT_APP_CONNECTION}auth/getOtp`,{email,OTP,username});
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className='RegPage'>
            <Navbar />
            <div className="Register">
                <form onSubmit={submission}>
                    {/* <h1>Register Yourself Geek</h1> */}
                    <img className='img1' src={registerText}></img>
                    <div id='input-section'>
                        <input type="text" placeholder='Username' name="username" value={username} onChange={(e)=>setusername(e.target.value)} required/>
                        <input type="password" placeholder='Password' name="password" minLength={8} value={password} onChange={(e)=>checkPassword(e)} required/>
                        <input type="email" placeholder='E-mail' name="email" value={email} onChange={(e)=>setemail(e.target.value)} required/>
                        <button id='otp' onClick={getOtp}>Get Otp</button>
                        <input type="text" placeholder='OTP' name="otp" value={otp} onChange={(e)=>setOtp(e.target.value)}/>
                        <label></label>
                        <input type="text" placeholder='Your Caption   (optional)' name="caption" value={caption} onChange={(e)=>setcaption(e.target.value)}/>
                        <select id='gender' name='gender' value={gender} onChange={(e)=>setgender(e.target.value)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="text" placeholder='Country (optional)' name="country" value={country} onChange={(e)=>setcountry(e.target.value)}/>
                        <input type="url" placeholder='Social URL (optional)' name="socialURL" value={socialURL} onChange={(e)=>setsocialURL(e.target.value)}/>
                        <input type="text" placeholder='Fav Anime (optional)' name="favAnime" value={favAnime} onChange={(e)=>setfavAnime(e.target.value)}/>
                        <input type="text" placeholder='Fav Game (optional)' name="favGame" value={favGame} onChange={(e)=>setfavGame(e.target.value)}/>
                        <input type="text" placeholder='Fav Character (optional)' name="favCharacter" value={favCharacter} onChange={(e)=>setfavCharacter(e.target.value)}/>
                    </div>
                    <div>
                    {
                        emailWarning?<h3>Email already exists</h3>:""
                    }
                    {
                        showError?<h4>Enter correct otp</h4>:""
                    }
                    {
                        usernameWarning?<h4>Username already exists</h4>:""
                    }
                    {
                        invalid?<h4><br/>Password must contain more than 10 characters</h4>:""
                    }
                    {
                        otpSent?<h4>Otp Sent to given mail</h4>:""
                    }
                    {
                        unique?<h4>UserName not available</h4>:""
                    }
                    </div>
                    <button id='submit' type="submit">Register</button>
                    <div>
                        <img className='img2' src={alreadyText}></img><h2><Link to="/login" id='loginText'>Login</Link></h2>
                    </div>
                </form>
            </div>
        </div>
    )
};