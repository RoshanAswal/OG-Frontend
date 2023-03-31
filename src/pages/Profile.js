import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import logo from "../images/logo.png";

export const Profile=(props)=>{
    const userId=window.localStorage.getItem("userId");
    const [username,setusername]=useState("Hello");
    const [caption,setcaption]=useState("Hello");
    const [gender,setgender]=useState("Hello");
    const [country,setcountry]=useState("Hello");
    const [socialURL,setsocialURL]=useState("Hello");
    const [favAnime,setfavAnime]=useState("Hello");
    const [favGame,setfavGame]=useState("Hello");
    const [favCharacter,setfavCharacter]=useState("Hello");
    const [bestRank,setbestRank]=useState("Hello");
    const [contestAttempted,setcontestAttempted]=useState("Hello");
    const [contestWon,setcontestWon]=useState("Hello");
    
    const navigate=useNavigate();


    useEffect(()=>{
        const fetch=async (req,res)=>{
            try{
                const response=await axios.get(`http://localhost:3000/profile/${userId}`);
                setusername(response.data.username);
                setcaption(response.data.caption);
                setgender(response.data.gender);
                setcountry(response.data.country);
                setsocialURL(response.data.socialURL);
                setfavAnime(response.data.favAnime);
                setfavGame(response.data.favGame);
                setfavCharacter(response.data.favCharacter);
                setbestRank(response.data.bestRank);
                setcontestAttempted(response.data.contestAttempted);
                setcontestWon(response.data.contestWon);

            }catch(e){
                console.log("not found here");
            }
        }
        fetch();
    });
    
    const handleClick=async ()=>{
        window.localStorage.removeItem("userId");
        navigate("/");
    };

    return (
        <div className='Profile'>
            <Navbar />
            <div>
                <img src={logo}></img>
                <h1>{username}</h1>
                <h1>{caption}</h1>
            </div>
            <div className='Profile_col1'>
                <h1>{gender}</h1>
                <h1>{favAnime}</h1>
                <h1>{country}</h1>
                <h1>{favGame}</h1>
                <h1>{socialURL}</h1>
                <h1>{favCharacter}</h1>
            </div>
            <div className='Profile_col2'>
                <h1>{bestRank}</h1>
                <h1>{contestAttempted}</h1>
                <h1>{contestWon}</h1>
            </div>
            <button onClick={handleClick}>logout</button>
        </div>
    )
}