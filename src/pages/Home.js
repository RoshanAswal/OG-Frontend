import {useNavigate} from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import connect from '../images/connect1.png';
import compete from '../images/compete1.png';
import { useEffect } from 'react';

export const Home=()=>{
    const navigate=useNavigate();       

    const handleClick=(event,value)=>{
        event.preventDefault();
        try{
            if(value==="img1")navigate("/contest");
            else if(value==="img2")navigate("/community");
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="home">
            <Navbar />
            <div className='choose-section'>
                <img id="second-img" src={connect} alt="" onClick={(event)=>handleClick(event,"img2")}/>
                <img id="first-img" src={compete} alt="" onClick={(event)=>handleClick(event,"img1")}/>
            </div>
        </div>
    )
}