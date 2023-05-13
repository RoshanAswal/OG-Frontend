import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import user from "../images/user.png"
import { useCookies } from "react-cookie";
import { Navbar } from "../components/Navbar";
 
export const ProfileEdit=()=>{

    const userId=window.localStorage.getItem("userId");
    const navigate=useNavigate();

    const [cookies,_]=useCookies(["access_token"]);
    const [caption,setcaption]=useState("");
    const [gender,setgender]=useState("");
    const [country,setcountry]=useState("");
    const [socialURL,setsocialURL]=useState("");
    const [favAnime,setfavAnime]=useState("");
    const [favGame,setfavGame]=useState("");
    const [favCharacter,setfavCharacter]=useState("");
    const [img,setImg]=useState(null);
    const [editing,setEditing]=useState(false);
    const [isdisable,setIsDisable]=useState(false);

    useEffect(()=>{
        const fetch=async (req,res)=>{
            try{
                const response=await axios.get(`${process.env.REACT_APP_CONNECTION}profile/${userId}`,{headers:cookies.access_token});
                setcaption(response.data.caption);
                setgender(response.data.gender);
                setcountry(response.data.country);
                setsocialURL(response.data.socialURL);
                setfavAnime(response.data.favAnime);
                setfavGame(response.data.favGame);
                setfavCharacter(response.data.favCharacter);
                
            }catch(e){
                console.log("not found here");
            }
        }
        fetch();
    },[]);


    const handleSubmit=async (e)=>{
        e.preventDefault();
        setEditing(true);
        setIsDisable(true);
        try{
            await axios.post(`${process.env.REACT_APP_CONNECTION}profile/${userId}/edit`,
            {caption:caption,gender:gender,country:country,socialURL:socialURL,favAnime:favAnime,
                favGame:favGame,favCharacter:favCharacter,img:img?img:null,headers:cookies.access_token}
            );

            navigate(`/profile/${userId}`,{
                state:{userId:userId}
            });
        }catch(err){
            console.log(err);
        }
        setEditing(false);
    }
    
    const setFileToBase = (e) => {
        const reader = new FileReader();
        const file=e.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImg(reader.result);
        };
      };

    if(!userId){
        return(
            <h1>Profile not found</h1>
        )
    }

    return (
        <div className="ProEditPage">
            <Navbar />
            <div className="ProfileEdit">
                <form onSubmit={handleSubmit}>
                    <h1>What's to change Geek?</h1>
                    <div id='input-section'>
                        <input type="text" placeholder='Your Caption   (optional)' name="caption" value={caption} onChange={(e)=>setcaption(e.target.value)}/>
                        <select id='gender' name='gender' value={gender} onChange={(e)=>setgender(e.target.value)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="text" placeholder='Country' name="country" value={country} onChange={(e)=>setcountry(e.target.value)}/>
                        <input type="url" placeholder='Social URL' name="socialURL" value={socialURL} onChange={(e)=>setsocialURL(e.target.value)}/>
                        <input type="text" placeholder='Fav Anime' name="favAnime" value={favAnime} onChange={(e)=>setfavAnime(e.target.value)}/>
                        <input type="text" placeholder='Fav Game' name="favGame" value={favGame} onChange={(e)=>setfavGame(e.target.value)}/>
                        <input type="text" placeholder='Fav Character' name="favCharacter" value={favCharacter} onChange={(e)=>setfavCharacter(e.target.value)}/>

                        <input id="file" type="file" accept="image/*"
                            onChange={(e)=>setFileToBase(e)}
                        />
                    </div>
                    <button type="submit" disabled={isdisable}>change</button>
                </form>
            </div>
            {editing?<h3>Saving...</h3>:""}
        </div>

    )
}