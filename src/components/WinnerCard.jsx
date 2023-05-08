import axios from "axios";
import { useEffect, useState } from "react"
import userDP from "../images/userDp.png";
import { Navigate, useNavigate } from "react-router-dom";

export const WinnerCard=(props)=>{

    const navigate=useNavigate();
    const [user,setUser]=useState([]);
    // let user=[];
    useEffect(()=>{
        const getUsers = async () => {
            const userPromises = props.users.map(userId =>
              axios.get(`${process.env.REACT_APP_CONNECTION}profile/${userId}`)
            );
            const userData = await Promise.all(userPromises);
            setUser(userData);
        };
          getUsers();
    },[]);

    const GoToProfile=(e,id)=>{
        e.preventDefault();
        navigate(`/profile/${id}`,{
            state:{
                userId:id
            }
        }
        );
    }
    if(user.length===0){
        return (
            <h1>Loading...</h1>
        )
    }
    return user.length && (
        <div className="winnersCard">
            {
                user.map((item,index)=>(
                    item.data?
                    <div>
                        <img id='userImg' src={item.data.img?item.data.img.url:userDP} alt={userDP}/>    
                        <h2 onClick={(e)=>{GoToProfile(e,item.data._id)}}>{(index+1)+props.ind}. {item.data.username}</h2>
                    </div>
                    :""
                ))
            }

            {/* <span>{item.correctAnswers}</span>
            <span>{item.timeTaken}</span> */}
        </div>
    )
}