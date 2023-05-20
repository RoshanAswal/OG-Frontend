import { Navbar } from "../components/Navbar"
import { Link } from "react-router-dom";
import certi from "../images/certificate.png";

export const ThanksPage=()=>{
    const GoToYT=async (e)=>{
        e.preventDefault();
        const win=window.open(`https://www.youtube.com/channel/UCDlupvNmorg_gWks_8CTMCA`,'_blank');
        if(win!=null){
            win.focus();
        }
    }
    return(
        <div className="thanksPage">
            <Navbar />
            <div id="thanks">
                <img id="certi" src={certi} alt="hands"/>
                <h1 id="thank">Thank you, Your submission is accepted</h1>
                <h2>For all references check <span onClick={GoToYT}>Here</span> </h2>
                <h2>Don't forget to share your thoughts on post section</h2>
                <Link to="/">Go Back</Link>
            </div>
        </div>
    )
}