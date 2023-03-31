import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import moment from "moment";

export const ContestDetail=(props)=>{

    const location = useLocation();
    const navigate=useNavigate();
    const data=location.state;

    const limit=59;

    const [btn,setbtn]=useState("Register");
    const [cookies,_]=useCookies(["access_token"]);
    const [loading,setLoading]=useState(true);
    const [contestDetail,setContestDetail]=useState();
    const [usersRegistered,setUsersRegistered]=useState([]);
    const [timer,setTimer]=useState(moment().format('MMMM Do YYYY, h:mm:ss a'));

    const userId=window.localStorage.getItem("userId");

    useEffect(()=>{
        const fetchContestDetail=async ()=>{
            try{
                const response=(data.type==="done")?(await axios.get(`http://localhost:3000/contest/${data.contest_id}`)):
                (await axios.get(`http://localhost:3000/contest/upcoming/${data.contest_id}`));
                if(response.data.type==="done" || response.data.usersRegistered.includes(userId)){
                    setbtn("Enter");
                }else{
                    setbtn("Register");
                }
                setContestDetail(response.data);
                if(data.type!=="done"){
                    setUsersRegistered(response.data.usersRegistered);
                }
                setLoading(false);
            }catch(err){
                console.log(err);
            }
        };
        fetchContestDetail();
    },[]);

    useEffect(()=>{
        if(loading===false && contestDetail.type==="upcoming"){
            setTimeout(()=>{
                setTimer(moment().format('ddd hh:mm:ss aa'));
            },1000);
        }
    });

    const handleClick=async (req,res)=>{
        if(userId){
            if(contestDetail.type==="upcoming" && btn==="Register"){
                try{
                    const response=await axios.put(`http://localhost:3000/contest/${data.contest_id}`
                    ,{userId:userId}
                    ,{headers:{authorization:cookies.access_token}}); 
                    setbtn("Enter");
                }catch(err){
                    navigate("/register");
                }
            }else{
                if(contestDetail.type==="upcoming" && !showTimer()){
                    alert("contest not started yet");
                    return;
                }
                navigate(`/contest/${data.contest_no}/Questions`,{
                    state:{
                        contest_no:data.contest_no   
                    }
                });
            }
        }else{
            navigate("/register");
        }
    }

    const showTimer=()=>{
        let day=timer.substring(0,3);
        let hour=timer.substring(4,6);
        let period=timer.substring(13,15);
        let min=timer.substring(7,9);
        if(parseInt(min)>limit){
            return false;
        }

        if(loading===false && contestDetail.type==="upcoming"
            && day==="Fri" && hour==="07" && period==="pm"){
            return true;
        }else return false;
    }

    const showButton=()=>{
        let min=timer.substring(7,9);
        if(!loading){
            if(contestDetail.type==="upcoming"){
                if(usersRegistered.includes(userId)){
                    if(showTimer())return true;
                    return false;
                }
            }
        }
        return true;
    }

    if(loading){
        return(
            <p>Loading...</p>
        )
    }
    return (
        <div className="contestDetail">
            <Navbar />
            <strong>{
                showTimer()?timer.substring(7,12):"" 
                // timer
            }</strong>
            <div>
                <h1>Contest {contestDetail.contest_no}</h1>
            </div>
            <div>
                <div>
                    <h2>Schedule</h2>
                    <p>{contestDetail.schedule}</p>
                </div>
                <div>
                    <h2>Sponser</h2>
                    <p>{contestDetail.sponser}</p>
                </div>
                <div>
                    <h2>Prizes</h2>
                    <ul>
                        {
                        (contestDetail.prize).map((item,i)=>(
                            <li key={i}>{item}</li>
                        ))
                        }
                    </ul>
                </div>
                <div>
                    <h2>Rules :</h2>
                    <ol>
                        {
                            (contestDetail.rules).map((item,i)=>(
                                <li key={i}>{item}</li>
                            ))
                        }
                    </ol>
                </div>
                <div>
                    {
                        showButton()?(
                            <button onClick={handleClick}>
                                {btn}
                            </button>
                        ):"Registered"
                    }
                </div>
            </div>
        </div>
    )
}