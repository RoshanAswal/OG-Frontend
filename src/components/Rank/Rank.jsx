import { useNavigate } from "react-router-dom";
import user from '../../images/userDp.png';
import rankHeading from "../../images/ranking.png"
import totalContest from '../../images/totalContest.png';
import contestWon from '../../images/contestWon.png';
import contestLost from '../../images/contestLost.png';
import styles from './Rank.module.css';


export const Rank=(props)=>{
    const navigate=useNavigate();
    const colors=['red','blue','yellow'];

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
        <div className={styles.rankComponent}>
            {/* <img className={styles.rankHeading} src={rankHeading} /> */}
            <div className={styles.ranks}>
                {props.users.map((item,key)=>(
                    <div key={item._id} className={styles.rankCard}>
                        <div className={styles.rankUser}>
                            <h3 
                            style={{fontSize:(key+1)+props.index<4?'40px':''}} 
                            >{(key+1)+props.index}</h3>
                            
                            <img src={item.img?item.img.url:user} alt="user"></img>
                            
                        </div>  
                        <div className={styles.contestInfo}>
                            <div>
                                <img src={totalContest} alt="total" />
                                <span>{item.contestAttempted}</span>
                            </div>
                            <div>
                                <span>{item.contestWon}</span>
                                <img src={contestWon} alt="won" />
                            </div>
                            <div>
                                <span>{item.contestAttempted-item.contestWon}</span>
                                <img src={contestLost} alt="lost" />
                            </div>
                        </div>
                        <div className={styles.rankBtn}>
                            <button value={item._id} 
                                    onClick={GoToProfile}>
                                {item.username}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}