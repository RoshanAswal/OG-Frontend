// import logo from "../images/logo.png"
import naruto from "../../images/contestImg.png"
import { useNavigate } from 'react-router-dom';
import styles from './ContestCard.module.css';

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
        <div className={styles.mainCard} onClick={handleClick}>
            <div className={styles.frontCard}>
                <h2>Contest</h2>
                <h2>{props.contest_no}</h2>
            </div>
            <img src={props.cardImg} alt='cardImg'></img>
        </div>
    );
}