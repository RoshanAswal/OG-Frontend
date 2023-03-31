// import logo from "../images/logo.png"
import naruto from "../images/naruto.ico"
import { useNavigate } from 'react-router-dom';

export const ContestCard=(props)=>{
    const navigate=useNavigate();

    const handleClick=()=>{
        navigate(`/contest/${props.contest_no}`,
        {
            state:{
                contest_id:props.contest_id,
                contest_no:props.contest_no,
                type:props.type,
                // schedule:props.schedule,
                // sponser:props.sponser,
                // prize:props.prize,
                // rules:props.rules,
                // type:props.type,
                // usersRegistered:props.usersRegistered,
            }
        }
        );
    }

    return (
        <div className="ContestCard">
            <div className="mainCard" onClick={handleClick}>
                <div className="frontCard">
                    <div>
                        <h2>Contest</h2>
                        <h2>{props.contest_no}</h2>
                    </div>
                    <img src={naruto} alt="chibi"></img>
                </div>
                <div className="backCard">
                    {/* <img src={logo} alt="1st" />
                    <div>
                        <img src={logo} alt="2nd" />
                        <img src={logo} alt="3rd" />
                    </div> */}
                    {/* <h2>Winners</h2> */}
                </div>
            </div>
        </div>
    );
}