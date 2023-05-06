// import logo from "../images/logo.png"
import naruto from "../images/contestImg.png"
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
            }
        }
        );
    }

    return (
        <div className="contestCard">
            <div className="mainCard" onClick={handleClick}>
                <div className="frontCard">
                    <img src={naruto} alt="chibi"></img>
                    <div>
                        <h2>Contest</h2>
                        <h2>{props.contest_no}</h2>
                    </div>

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