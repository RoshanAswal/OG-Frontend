import { Link } from "react-router-dom";

import insta from "../../images/instagram.png";
import discord from "../../images/discord.png";
import facebook from "../../images/facebook.png";
import logo from "../../images/logo.png"

import styles from './Footer.module.css';

export const Footer=()=>{
    const GoToInsta=async (e)=>{
        e.preventDefault();
        console.log("clicked");
        const win = window.open(`https://www.instagram.com/onlygeeks.club/?igshid=ZGUzMzM3NWJiOQ%3D%3D`, '_blank');
        if (win != null) {
          win.focus();
        }
    }
    const GoToDiscord=async (e)=>{
        e.preventDefault();
        const win=window.open(`https://discord.gg/9Pb89MWm`,'_blank');
        if(win!=null){
            win.focus();
        }
    }
    const GoToFb=async (e)=>{
        e.preventDefault();
        const win=window.open(`https://www.facebook.com/profile.php?id=100092358834114`,'_blank');
        if(win!=null){
            win.focus();
        }
    }
    return (
        <div className={styles.footer}>
            <div className={styles.logoDiv}>
                <Link to="/">
                    <img id={styles.OG_logo} src={logo} alt="logo"/>     
                </Link>
                <h2>Only Geeks</h2>
            </div>
            <div className={styles.links}>
                <div className={styles.social}>
                    <div className={styles.socialHeader}>
                        <h2>Social Links</h2>
                    </div>
                    <div>
                        <img src={insta} alt="insta"></img>
                        <h3 onClick={(e)=>GoToInsta(e)}>Instagram</h3>
                    </div>
                    <div>
                        <img src={discord} alt="discrod"></img>
                        <h3 onClick={(e)=>GoToDiscord(e)}>Discord</h3>
                    </div>
                    <div>
                        <img src={facebook} alt="fb"></img>
                        <h3 onClick={(e)=>GoToFb(e)}>Facebook</h3>
                    </div>
                </div>
                <div className={styles.shortcuts}>
                    <div className={styles.ogHeader}>
                        <Link to="/">
                            <h2>Only Geeks Links</h2>
                        </Link>
                    </div>
                    <Link to="/">
                        <h3>Home</h3>
                    </Link>
                    <Link to="/community">
                        <h3>Community</h3>
                    </Link>
                    <Link to={"/contest"}>
                        <h3>Contests</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}