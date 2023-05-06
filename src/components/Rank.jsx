import { useNavigate } from "react-router-dom";
import user from '../images/userDp.png';
import rankHeading from "../images/ranking.png"

export const Rank=(props)=>{
    const navigate=useNavigate();

    const GoToProfile=(e)=>{
        e.preventDefault();
        const id=e.target.value;
        navigate(`/profile/${id}`,{
            state:{
                userId:id
            }
        }
        );
    }

    return (
        <div className="rankPage">
            <img className="rank-heading" src={rankHeading} />
            <div className="rank">
                {props.users.map((item,key)=>(
                    <div key={item._id}>
                        <div className="rank-sec1">
                            <h3>{(key+1)+props.index}</h3>
                            <img src={item.img?item.img.url:user}></img>
                        </div>
                        <button className="rank-btn" value={item._id} onClick={GoToProfile}>
                            {item.username}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}