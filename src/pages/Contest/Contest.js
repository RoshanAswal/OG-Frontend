import {ContestCard} from '../../components/ContestCard/ContestCard';
import {useState,useEffect} from 'react';
import upcoming from "../../images/Upcoming.png";
import previous from "../../images/Previous.png";
import right from "../../images/right-chevron.png";
import left from "../../images/left-chevron.png";
import confuse from '../../images/confuse.png';
import axios from 'axios';
import styles from './Contest.module.css';

import { Navbar } from '../../components/Navbar/Navbar';
import { useCookies } from 'react-cookie';

import upcomingContestImg from '../../images/UpcomingContestImg.png';
import preiousContestImg from '../../images/previousContestImg.png';

import card1 from '../../images/card1.png';
import card2 from '../../images/card2.png';
import card3 from '../../images/card3.png';
import card4 from '../../images/card4.png';

import { Footer } from '../../components/Footer/Footer';


export const Contest=()=>{
    const [contest,setContest]=useState([]);
    const [upContest,setUpContest]=useState([]);
    const [cookies,_]=useCookies(["access_token"]);
    const [page,setPage]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [capacity,setCapacity]=useState(4);

    let cardImgs=[card1,card2,card3,card4];

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
    },[]);

    useEffect(()=>{
        if(cookies.access_token){}
        else{
            if(window.localStorage.getItem("userId")){
                window.localStorage.removeItem("userId");
                window.location.reload();
            }
        }
    });

    return (
        <div className={styles.contest}>
            <Navbar />
            <div className={styles.contestZone}>
                <div className={styles.previousContest}>
                    <div className={styles.contestImg}>
                        <img src={preiousContestImg} alt='warrior'></img>
                    </div>
                    <div className={styles.cards}>
                        <h2>Previous Contests</h2>
                        <div className={styles.cardsDetail}>
                        {contest.length>0?
                            
                            contest.map((item,i)=>(
                                <ContestCard 
                                    key={i}
                                    contest_id={item._id}
                                    contest_no={item.contest_no}
                                    type={item.type}
                                    cardImg={card1}
                                />
                            ))              
                            :<div className={styles.notFound}>
                                <img src={confuse} alt='confuse'/>
                                <h3>No contest found</h3>
                            </div>          
                        }
                        </div>
                    </div>

                </div>

                <div className={styles.upcoming}>
                    <div className={styles.cards}>
                        <h2>Upcoming Contests</h2>
                        <div className={styles.cardsDetail}>
                        {upContest.length>0?
                            upContest.map((item,i)=>(
                                <ContestCard 
                                    key={i}
                                    contest_id={item._id}
                                    contest_no={item.contest_no}
                                    type={item.type}
                                />
                            ))              
                            :<div className={styles.notFound}>
                                <img src={confuse} alt='confuse'/>
                                <h3>No contest found</h3>
                            </div>          
                        }
                        </div>
                    </div>
                    <div className={styles.upcomingImg}>
                        <img src={upcomingContestImg} alt='goku'></img>
                    </div>
                </div>


            </div>
            {
                contest.length>=capacity
                ?
                <div id={styles.btnSection}>
                    <img alt='slideBtn' className={styles.btn1} src={left} onClick={()=>setPage(page > 0 ? page - 1 : page)}/>
                    <input type="number" value={page} name='pageNo' onChange={(e)=>{setPage(e.target.value)}}/>
                    {/* <span>{page}</span> */}
                    <img alt='slideBtn' className={styles.btn2} src={right} onClick={()=>setPage(page < totalPages-1 ? page+1 : page)} />
                </div>
                :""
            }
            <Footer/>
        </div>
    )
}