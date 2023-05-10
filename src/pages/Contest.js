import {ContestCard} from '../components/ContestCard';
import {useState,useEffect} from 'react';
import upcoming from "../images/Upcoming.png";
import previous from "../images/Previous.png";
import right from "../images/right-chevron.png";
import left from "../images/left-chevron.png";
import axios from 'axios';

import { Navbar } from '../components/Navbar';
import { useCookies } from 'react-cookie';


export const Contest=()=>{
    const [contest,setContest]=useState([]);
    const [upContest,setUpContest]=useState([]);
    const [cookies,_]=useCookies();
    const [page,setPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [capacity,setCapacity]=useState(4);
    
    useEffect(()=>{
        const fetchContest=async ()=>{
            const response1=await axios.get(`${process.env.REACT_APP_CONNECTION}contest`);
            const response2=await axios.get(`${process.env.REACT_APP_CONNECTION}upcomingcontest`);
            
            setContest(response1.data);
            setUpContest(response2.data);
            if(contest)
                setTotalPages(Math.ceil(contest.length/capacity));
        }
        fetchContest();
    },[contest]);
    useEffect(()=>{
        let width=window.innerWidth;
        if(width<1000){
            setCapacity(6);
        }
    });

    return (
        <div className="contest">
            <Navbar />
            <div className='contestZone'>
                <img className='status' src={upcoming} alt="upcoming"></img>
                <div className="upcoming">
                    {
                        upContest.map((item,i)=>(
                            <ContestCard 
                                key={i}
                                contest_id={item._id}
                                contest_no={item.contest_no}
                                type={item.type}
                            />
                        ))
                    }
                    {/* <img id='specs' src={specs} alt='specsGuy'/> */}
                </div>

                <img className='status' src={previous} alt="previous"></img>
                <div className="previous">
                    {
                        contest.slice(page*capacity,(page*capacity)+capacity).map((item,i)=>(
                            <ContestCard 
                                key={i}
                                contest_id={item._id}
                                contest_no={item.contest_no}
                                type={item.type}
                            />
                        ))
                    }
                </div>
            </div>
            {
                contest.length>=capacity
                ?
                <div id='btnSection'>
                    <img id='slideBtn' className='btn1' src={left} onClick={()=>setPage(page > 0 ? page - 1 : page)}/>
                    <input type="number" value={page} name='pageNo' onChange={(e)=>{setPage(e.target.value)}}/>
                    {/* <span>{page}</span> */}
                    <img id='slideBtn' className='btn2' src={right} onClick={()=>setPage(page < totalPages-1 ? page+1 : page)} />
                </div>
                :""
            }

        </div>
    )
}