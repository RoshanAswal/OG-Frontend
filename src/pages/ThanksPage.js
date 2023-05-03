import { Navbar } from "../components/Navbar"
import certi from "../images/certificate.png";

export const ThanksPage=()=>{
    return(
        <div className="thanksPage">
            <Navbar />
            <div id="thanks">
                <img id="certi" src={certi} alt="hands"/>
                <h1 id="thank">Thank you, Your submission is accepted</h1>
            </div>
        </div>
    )
}