import insta from "../images/instagram.png";
import discord from "../images/discord.png";
import facebook from "../images/facebook.png";

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
        <div className="footer">
            <div>
                <img src={insta} onClick={(e)=>GoToInsta(e)}></img>
                <img src={discord} onClick={(e)=>GoToDiscord(e)}></img>
                <img src={facebook} onClick={(e)=>GoToFb(e)}></img>
            </div>
        </div>
    )
}