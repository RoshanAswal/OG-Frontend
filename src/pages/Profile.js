import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate,useLocation} from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useCookies } from 'react-cookie';
import flip from "../images/btn.png";
import socialURL from "../images/socialLink.png";
import userDP from "../images/user.png";
import edit from "../images/edit.png";
import logout from "../images/logout.png";
import del from "../images/delete.png";
// import { useSelector } from 'react-redux';

export const Profile=(props)=>{
    const userId=window.localStorage.getItem("userId");
    const [user,setUser]=useState([]);
    const [showOptions,setShowOptions]=useState(true);
    const [cookies,_]=useCookies(["access_token"]);
    // const UserInfo=useSelector((state)=>{return state.user;})

    const [sameId,setSameId]=useState(false);
    const [confirmation,setConfirmation]=useState(false);
    const [deleting,setDeleting]=useState(false);
    const navigate=useNavigate();
    const location=useLocation();
    const data=location.state;
    

    useEffect(()=>{
        if(!data)navigate("/");
        const fetch=async (req,res)=>{
            try{
                if(data){
                    const response=await axios.get(`http://localhost:3001/profile/${data?.userId}`,{headers:cookies.access_token});
                    setUser(response.data);
                }
            }catch(e){
                console.log("not found here");
            }
        }
        fetch();
        if(data?.userId===userId){
            setSameId(true);
        }else{
            setSameId(false);
        }
    },[]);
    
    const handleClick=()=>{
        window.localStorage.removeItem("userId");
        navigate("/");
    };

    const deleteAccount=async (e)=>{
        e.preventDefault();
        try{
            await axios.put(`http://localhost:3001/profile/${data?.userId}/delete`,{headers:cookies.access_token});
            setDeleting(true);
            handleClick();
        }catch(err){
            console.log(err);
        }
    }
    const editClick=async ()=>{
        navigate("/Profile/edit");
    }

    const goToLink=()=>{
        window.location.href=user.socialURL;
    }

    const checkDP=()=>{
        if(user.img.url){
            return user.img.url;
        }else return userDP;
    }
    if(confirmation){
        return (
            <div className='confirm'>
                <form>
                    <label htmlFor='confirmation'>Do you wish to delete your account ? All data related to you will be deleted </label><br />
                    <button id='no' onClick={()=>setConfirmation(false)}>NO</button>
                    <button id='yes' onClick={(e)=>deleteAccount(e)}>Yes</button>
                </form>
            </div>

        )
    }

    if(user.length==0 || deleting){
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div className='ProPage'>
            <Navbar />
            <div className='profileCols'>
                {
                    showOptions
                    ?
                    <div className='Profile'>    
                        <div className='name-section'>
                            {/* <img id='userImg' src={()=>checkDP} /> */}
                            <img id='userImg' src={user.img?user.img.url:userDP} alt={userDP}/>
                            <h3 id='name'>{user.username}</h3>
                            <h3 id='caption'>{user.caption}</h3>
                        </div>
                        <div className='detail-section'>
                            <div>
                                <h3 id='label'>Gender</h3>
                                <h3 id='data'>{user.gender}</h3>
                            </div>
                            <div>
                                <h3 id='label'>Country</h3>
                                <h3 id='data'>{user.country}</h3>
                            </div>
                            <div>
                                <h3 id='label'>Social link</h3>
                                {
                                    user.socialURL
                                    ?<img id='social' src={socialURL} onClick={goToLink}/>
                                    :"none"
                                }
                            </div>
                            <div>
                                <h3 id='label'>Favourite Anime</h3>
                                <h3 id='data'>{user.favAnime}</h3>
                            </div>
                            <div>
                                <h3 id='label'>Favourite Game</h3>
                                <h3 id='data'>{user.favGame}</h3>
                            </div>
                            <div>
                                <h3 id='label'>Favourite Character</h3>
                                <h3 id='data'>{user.favCharacter}</h3>
                            </div>
                        </div>
                        <div className='rank-section'>
                            <div>
                                <h3 id='label'>Attempted</h3>
                                <h3 id='data'>{user.contestAttempted}</h3>
                            </div>
                            <div>
                                <h3 id='label'>Won</h3>
                                <h3 id='data'>{user.contestWon}</h3>
                            </div>
                            <div>
                                <h3 id='label'>Top Score</h3>
                                <h3 id='data'>{user.bestRank}</h3>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='Options'>
                        <img src={edit} onClick={editClick}/>
                        <h3>Edit</h3>
                        <img src={logout} onClick={handleClick}/>
                        <h3>Logout</h3>
                        <img src={del} onClick={()=>setConfirmation(true)}/>
                        <h3>Delete</h3>
                    </div> 
                }
                <div>
                {
                    sameId
                    ?
                    <div className='flipBtn'>
                        <img  src={flip} alt='img' onClick={()=>setShowOptions(!showOptions)}/>
                    </div>
                    :""
                }
                </div>
            </div>
        </div>
    )
}
