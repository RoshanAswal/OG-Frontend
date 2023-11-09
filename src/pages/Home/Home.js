import {useNavigate} from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import connect from '../../images/connect1.png';
import compete from '../../images/compete1.png';
import homeImage from '../../images/og_home.jpg';
import communityImg from '../../images/CommunityImg.png';
import contestImg from '../../images/contestImg.png';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import {Helmet} from 'react-helmet';
import { Footer } from '../../components/Footer/Footer';
import styles from './Home.module.css';

import Aos from 'aos';
import 'aos/dist/aos.css';

export const Home=()=>{

    const slide_div=useRef(null);
    const navigate=useNavigate();       
    const [cookies,_]=useCookies(['access_token']);
    
    const [slideDivs,setSlideDivs]=useState([styles.slide_up,styles.normal,styles.normal,styles.normal,styles.normal])
    
    const [ind,setInd]=useState(1);
    const [prev,setPrev]=useState(0);

    const fun=()=>{
        let temp=[...slideDivs];
        if(prev>=0)temp[prev]=styles.normal;
        temp[ind]=styles.slide_up;

        setInd((ind+1)%5);
        setPrev((prev+1)%5);

        setSlideDivs(temp);
    };

    useEffect(()=>{
        Aos.init({duration:1500});
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

    useEffect(()=>{
        const timer=setTimeout(()=>{
            fun();
        },3000);

        return ()=>{
            clearTimeout(timer);
        }
    },[slideDivs]);

    const handleClick=(event,value)=>{
        event.preventDefault();
        console.log(value);
        try{
            if(value==="img1")navigate("/contest");
            else if(value==="img2")navigate("/community");
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className={styles.home}>
            <Navbar />
            <div className={styles.first_div}>
                <div className={styles.message_div} ref={slide_div}>
                    <div className={`${styles.message} ${slideDivs[0]}`}>
                        <span>
                        "No matter how deep the night, it always turns to day, eventually."
                        </span>
                        <h3>- Brook, "One Piece"</h3>
                    </div >
                    <div className={`${styles.message} ${slideDivs[1]}`}>
                        <span>
                        "The moment you think of giving up, think of the reason why you held on so long."
                        </span>
                        <h3>- Natsu Dragneel, "Fairy Tail"</h3>
                    </div>
                    <div className={`${styles.message} ${slideDivs[2]}`}>
                        <span>
                        "A drop of hope can create an ocean of joy."
                        </span>
                        <h3> - Luffy, "One Piece"</h3>
                    </div>  
                    <div className={`${styles.message} ${slideDivs[3]}`}>
                        <span>
                        "It's not the face that makes someone a monster; it's the choices they make with their lives."
                        </span>
                        <h3>- Naruto Uzumaki, "Naruto"</h3>
                    </div>
                    <div className={`${styles.message} ${slideDivs[4]}`}>
                        <span>
                        "If you win, you live. If you lose, you die. If you don't fight, you can't win!"
                        </span>
                        <h3>- Eren Yeager, "Attack on Titan"</h3>
                    </div>

                </div>
            </div>
            <div className={styles.second_div}>
                <div>
                    <img src={communityImg} alt='communityImg' data-aos='fade-right'  data-aos-offset='150'></img>
                </div>
                <div className={styles.communityDes} data-aos='fade-left' data-aos-offset='150'>
                    <p>
                        Welcome to our vibrant anime community, a haven for all 
                        anime enthusiasts and fans!. Whether you're a seasoned otaku or just 
                        beginning your anime journey, you'll find a welcoming home here.
                    </p>
                    <button onClick={e=>{handleClick(e,'img2')}}>Community Page</button>
                </div>
            </div>
            <div className={styles.third_div}>
                <div className={styles.communityDes} data-aos='fade-right' data-aos-offset='150'>
                    <p>
                        Test your anime knowledge in our exciting quiz contests.
                        Challenge yourself and fellow fans with fun and challenging
                        questions. Win prizes, earn bragging rights, and showcase 
                        your expertise in all things anime!
                    </p>
                    <button onClick={e=>{handleClick(e,'img1')}}>Contest Page</button>
                </div>
                <div>
                    <img src={contestImg} alt='contestImg' data-aos='fade-left' data-aos-offset='150'></img>
                </div>
            </div>
            <Footer/>
        </div>

    )
}