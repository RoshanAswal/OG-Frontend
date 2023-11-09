import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate,useLocation} from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { useCookies } from 'react-cookie';
import flip from "../../images/btn.png";
import socialURL from "../../images/socialLink.png";
import userDP from "../../images/userDp.png";
import edit from "../../images/edit.png";
import logout from "../../images/logout.png";
import del from "../../images/delete.png";
import styles from './Profile.module.css';
// import { useSelector } from 'react-redux';
import {Footer} from '../../components/Footer/Footer';

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
                    const response=await axios.get(`${process.env.REACT_APP_CONNECTION}profile/${data?.userId}`,{headers:cookies.access_token});
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
            await axios.put(`${process.env.REACT_APP_CONNECTION}profile/${data?.userId}/delete`,{headers:cookies.access_token});
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
        <div className={styles.ProPage}>
            <Navbar />
            <div className={styles.profileCols}>
                {
                    showOptions
                    ?
                    <div className={styles.Profile}>    
                        <div className={styles.nameSection}>
                            {/* <img id='userImg' src={()=>checkDP} /> */}
                            <img id={styles.userImg} src={user.img?user.img.url:userDP} alt={userDP}/>
                            <h3 id={styles.name}>{user.username}</h3>
                            <h3 id={styles.caption}>{user.caption}</h3>
                        </div>
                        <hr></hr>
                        <div className={styles.detailSection}>
                            <div>
                                <h3 id={styles.label}>Gender</h3>
                                <h3 id={styles.data}>{user.gender}</h3>
                            </div>
                            <div>
                                <h3 id={styles.label}>Country</h3>
                                <h3 id={styles.data}>{user.country}</h3>
                            </div>
                            <div>
                                <h3 id={styles.label}>Social link</h3>
                                {
                                    user.socialURL
                                    ?<img id={styles.social} alt='social' src={socialURL} onClick={goToLink}/>
                                    :"none"
                                }
                            </div>
                            <div>
                                <h3 id={styles.label}>Favourite Anime</h3>
                                <h3 id={styles.data}>{user.favAnime}</h3>
                            </div>
                            <div>
                                <h3 id={styles.label}>Favourite Game</h3>
                                <h3 id={styles.data}>{user.favGame}</h3>
                            </div>
                            <div>
                                <h3 id={styles.label}>Favourite Character</h3>
                                <h3 id={styles.data}>{user.favCharacter}</h3>
                            </div>
                        </div>
                        <hr></hr>
                        <div className={styles.rankSection}>
                            <div>
                                <h3 id={styles.label}>Attempted</h3>
                                <h3 id={styles.data}>{user.contestAttempted}</h3>
                            </div>
                            <div>
                                <h3 id={styles.label}>Won</h3>
                                <h3 id={styles.data}>{user.contestWon}</h3>
                            </div>
                            <div>
                                <h3 id={styles.label}>Top Score</h3>
                                <h3 id={styles.data}>{user.bestRank}</h3>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={styles.options}>
                        <img src={edit} alt='edit' onClick={editClick}/>
                        <h3>Edit</h3>
                        <img src={logout} alt='logout' onClick={handleClick}/>
                        <h3>Logout</h3>
                        <img src={del} alt='del' onClick={()=>setConfirmation(true)}/>
                        <h3>Delete</h3>
                    </div> 
                }
                <div>
                {
                    sameId
                    ?
                    <div className={styles.flipBtn}>
                        <img  src={flip} alt='img' onClick={()=>setShowOptions(!showOptions)}/>
                        <h3>More Options</h3>
                    </div>
                    :""
                }
                </div>
            </div>
            <Footer/>
        </div>
    )
}
