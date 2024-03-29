import { Link, useNavigate} from "react-router-dom";
import OG from "../../images/OG.png";
import logo from "../../images/logo.png"
import user from "../../images/user.png";
import login from "../../images/login.png";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import styles from './Navbar.module.css';

export const Navbar=()=>{
    const navigate=useNavigate();
    const [_,__,removeCookies]=useCookies(["access_token"]);
    const [islog,setIsLog]=useState(null);
    const userId=window.localStorage.getItem("userId");

    useEffect(()=>{
        if(userId){
            setIsLog(true);
        }else {
            setIsLog(false);
            removeCookies("access_token",{path:'/'});
        }
    },[]);

    const toRegister=(res,req)=>{navigate("/register");}
    
    const goToProile=()=>{
        navigate(`/profile/${userId}`,
        {
            state:{
                userId:userId
            }
        }
        );
    }
    if(islog===null){
        return(
            <p>loading...</p>
        )
    }
    return (
        <div className={styles.navbar}>
            <Link to="/">
                <img id={styles.OG_logo} src={logo} alt="logo"/>     
            </Link>
            <div id={styles.profile_logo}>
                <img id={styles.user_logo} src={islog?user:login} alt="logo" onClick={islog?goToProile:toRegister}/>     
                {islog?"":<h3>Sign Up</h3>}
            </div>
        </div>
    )
}
