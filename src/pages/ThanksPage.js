import { Navbar } from "../components/Navbar"
import certi from "../images/certificate.png";
import insta from "../images/instagram.png";
import yt from "../images/youtube.png";
import discord from "../images/discord.png";

export const ThanksPage=()=>{
    const goToInsta=()=>{
        window.location.href="https://instagram.com/onlygeeks.club?igshid=ZGUzMzM3NWJiOQ==";
    }
    const goToYT=()=>{
        window.location.href="";
    }
    const goToDiscord=()=>{
        window.location.href="https://discord.gg/Px3E6KAr";
    }

    return(
        <div className="thanksPage">
            <Navbar />
            <div id="thanks">
                <img id="certi" src={certi} alt="hands"/>
                <h1 id="thank">Thank you, Your submission is accepted</h1>
                <img src={insta} alt="insta" onClick={goToInsta}/>
                <img src={yt} alt="youtube" onClick={goToYT}/>
                <img src={discord} alt="discord" onClick={goToDiscord}/>
            </div>
        </div>
    )
}