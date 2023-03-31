import {ContestCard} from '../components/ContestCard';
import {useState,useEffect} from 'react';
import Upcoming from "../images/Upcoming.png"
// import Ongoing from "../images/Ongoing.png"
import Previous from "../images/Previous.png"
import axios from 'axios';

import { Navbar } from '../components/Navbar';
import { useCookies } from 'react-cookie';


export const Contest=()=>{
    const [contest,setContest]=useState([]);
    const [upContest,setUpContest]=useState([]);
    const [cookies,_]=useCookies();
    
    useEffect(()=>{
        const fetchContest=async ()=>{
            const response1=await axios.get("http://localhost:3000/contest");
            const response2=await axios.get("http://localhost:3000/upcomingcontest");
            
            setContest(response1.data);
            setUpContest(response2.data);
        }
        fetchContest();
    },[]);

    return (
        <div className="contest">
            <Navbar />
            {/* <img className='status' src={Ongoing} alt="ongoing"></img>
            <div className="ongoing">
                {
                    onContest.map((item)=>(
                        <ContestCard contest={item.contest_no}/>
                    ))
                }
            </div> */}
            <img className='status' src={Upcoming} alt="upcoming"></img>
            <div className="upcoming">
                {
                    upContest.map((item,i)=>(
                        <ContestCard 
                            key={i}
                            contest_id={item._id}
                            contest_no={item.contest_no}
                            type={item.type}
                            // schedule={item.schedule}
                            // sponser={item.sponser}
                            // prize={item.prize}
                            // rules={item.rules}
                            // type={item.type}
                            // usersRegistered={item.usersRegistered}
                        />
                    ))
                }
            </div>
            <img className='status' src={Previous} alt="previous"></img>
            <div className="previous">
                {
                    contest.map((item,i)=>(
                        <ContestCard 
                            key={i}
                            contest_id={item._id}
                            contest_no={item.contest_no}
                            type={item.type}
                            // schedule={item.schedule}
                            // sponser={item.sponser}
                            // prize={item.prize}
                            // rules={item.rules}
                            // type={item.type}
                        />
                    ))
                }
            </div>
        </div>
    )
}