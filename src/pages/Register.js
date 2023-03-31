import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register=()=>{
    const navigate=useNavigate();

    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const [email,setemail]=useState("");
    const [caption,setcaption]=useState("");
    const [gender,setgender]=useState("");
    const [country,setcountry]=useState("");
    const [socialURL,setsocialURL]=useState("");
    const [favAnime,setfavAnime]=useState("");
    const [favGame,setfavGame]=useState("");
    const [favCharacter,setfavCharacter]=useState("");

    const submission=async (e)=>{
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:3000/auth/register",
            {username,password,email,caption,gender,country,socialURL,favAnime,favGame,favCharacter});
            
            navigate("/login");
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="Register">
            <form onSubmit={submission}>
                <h1>Register Yourself Geek</h1>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username} onChange={(e)=>setusername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={(e)=>setemail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="caption">Caption</label>
                    <input type="text" name="caption" value={caption} onChange={(e)=>setcaption(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="gender">Gender</label>
                    <select name='gender' value={gender} onChange={(e)=>setgender(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country" value={country} onChange={(e)=>setcountry(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="socialURL">Social URL</label>
                    <input type="url" name="socialURL" value={socialURL} onChange={(e)=>setsocialURL(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="favAnime">Fav Anime</label>
                    <input type="text" name="favAnime" value={favAnime} onChange={(e)=>setfavAnime(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="favGame">Fav Game</label>
                    <input type="text" name="favGame" value={favGame} onChange={(e)=>setfavGame(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="favCharacter">Fav favCharacter</label>
                    <input type="text" name="favCharacter" value={favCharacter} onChange={(e)=>setfavCharacter(e.target.value)}/>
                </div>

                <button type="submit">Register</button>
                <div>
                    <h2>Already a Geek ? <Link to="/login">Login</Link></h2>                
                </div>
            </form>
        </div>
    )
};