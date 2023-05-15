import {useEffect, useMemo, useState} from 'react';
import { useLocation, useNavigate,Prompt } from 'react-router-dom';
import { Question } from '../components/Question';
import axios from 'axios';
import moment from 'moment';
import {useCookies} from 'react-cookie';

export const ContestPage=()=>{
    const location=useLocation();
    const navigate=useNavigate();

    const userId=window.localStorage.getItem("userId");

    let selected=null;
    const [cookies,_]=useCookies(["access_token"]);
    const [questions,setQuestions]=useState([]);
    const [ind,setInd]=useState(0);
    const [time,setTime]=useState('');
    const [saving,setSaving]=useState(false);

    const data=location.state;
    
    useEffect(() => {
        const getCurrentTime=async ()=>{
          const response = await axios.get(`${process.env.REACT_APP_CONNECTION}api/currentTime`);
          setTime(response.data);
        }
        setTimeout(()=>{
            getCurrentTime();
        },1000);
    });

    useEffect(()=>{
        const fetchQuestions=async ()=>{
            try{
                const response= await axios.get(`${process.env.REACT_APP_CONNECTION}questionForUsers/${data.contest_no}`);
                setQuestions(response.data.questions);
                
                let storedInd=window.localStorage.getItem("a11d2g3");
                if(storedInd===null){
                    storedInd=(((ind*32)+36)-8)*2;
                    window.localStorage.setItem("a11d2g3",storedInd);
                }
                // storedInd=window.localStorage.getItem("a11d2g3");
                storedInd=(((storedInd/2)+8)-36)/32;
                setInd(storedInd);
            }catch(err){
                console.log(err);
            }
        }
        fetchQuestions();

    },[]);

    useEffect(()=>{
        if(time.substring(7,9)==="10"){
            GotoThanksPage();
        }
    });

    const GotoThanksPage=async ()=>{
        const min=time.substring(7,9);
        const sec=time.substring(10,12);
        const totalTime=(parseInt(min)*60)+parseInt(sec);
        try{
            await axios.put(`${process.env.REACT_APP_CONNECTION}${data.contest_no}/setTime`,
            {userId:userId,totalTime:totalTime,headers:cookies.access_token}); 
            
            window.localStorage.removeItem("a11d2g3"); 
            navigate("/ThanksPage");
        }catch(err){
            console.log(err);
        }
    }

    const handleClick=async (e)=>{
        e.preventDefault();
        setSaving(true);
        const min=time.substring(7,9);
        const sec=time.substring(10,12);
        const totalTime=(parseInt(min)*60)+parseInt(sec);
        try{
            let correct=false;
            if(e.target.value===questions[ind].answer)correct=true;
            await axios.put(`${process.env.REACT_APP_CONNECTION}contest/${data.contest_no}/submission`,
            {userId:userId,index:ind,totalTime,correct,headers:cookies.access_token});  
             
            if(ind<(questions.length-1)){
                const num=((((ind+1)*32)+36)-8)*2;
                window.localStorage.setItem("a11d2g3",num);
                setInd(ind+1);
                setSaving(false);
            }else{
                GotoThanksPage();
            }
        }catch(err){
            console.log(err);
        }
    }

    if(questions.length==0){
        return(
            <h1>Loading...</h1>
        )
    }

    return(
        <div className="ContestPage">
            <div id='timer'>
                <h2>{time.substring(7,12)}</h2>
            </div>
            <div className="question-section">
                    <form>
                        <label id='question'>{questions[ind].question}</label><br/>
                        <input type="radio" id="q1a" name="q1" value="a" checked={selected==='a'} onChange={handleClick}></input>
                        <label htmlFor="q1a">a. {questions[ind].options[0]}</label><br/>
                        <input type="radio" id="q1b" name="q1" value="b" checked={selected==='b'} onChange={handleClick}></input>
                        <label htmlFor="q1b">b. {questions[ind].options[1]}</label><br/>
                        <input type="radio" id="q1c" name="q1" value="c" checked={selected==='c'} onChange={handleClick}></input>
                        <label htmlFor="q1c">c. {questions[ind].options[2]}</label><br/>
                        <input type="radio" id="q1d" name="q1" value="d" checked={selected==='d'} onChange={handleClick}></input>
                        <label htmlFor="q1d">d. {questions[ind].options[3]}</label><br/>
                    </form>
            </div>

            <div className="saving-section">
                {saving?<h1>saving...</h1>:""}
            </div>
        </div>
    )
};