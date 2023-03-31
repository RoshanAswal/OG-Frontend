import {useEffect, useMemo, useState} from 'react';
import { useLocation, useNavigate,Prompt } from 'react-router-dom';
import { Question } from '../components/Question';
import axios from 'axios';
import moment from 'moment';

export const ContestPage=()=>{
    const location=useLocation();
    const navigate=useNavigate();

    const userId=window.localStorage.getItem("userId");

    let selected=null;
    const [questions,setQuestions]=useState([]);
    const [ind,setInd]=useState(0);
    const [time,setTime]=useState(moment().format('ddd hh:mm:ss aa'));

    const data=location.state;
    useEffect(()=>{
        const fetchQuestions=async ()=>{
            const response= await axios.get(`http://localhost:3000/questionForUsers/${data.contest_no}`);
            setQuestions(response.data.questions);
            
            let storedInd=window.localStorage.getItem("a11d2g3");
            if(storedInd===null){
                storedInd=(((ind*32)+36)-8)*2;
                window.localStorage.setItem("a11d2g3",storedInd);
            }
            storedInd=window.localStorage.getItem("a11d2g3");
            storedInd=(((storedInd/2)+8)-36)/32;
            setInd(storedInd);
        }
        fetchQuestions();

    },[]);

    useEffect(()=>{
        setTimeout(()=>{
            setTime(moment().format('ddd hh:mm:ss aa'));
        },1000);
        if(time.substring(7,9)==="10"){
            GotoThanksPage();
        }
    });

    const GotoThanksPage=async ()=>{
        const min=time.substring(7,9);
        const sec=time.substring(10,12);
        const totalTime=(parseInt(min)*60)+parseInt(sec);
        await axios.put(`http://localhost:3000/${data.contest_no}/setTime`,
        {userId:userId,totalTime:totalTime}); 
        window.localStorage.removeItem("a11d2g3"); 
        navigate("/ThanksPage");
    }

    const handleClick=async (e)=>{
        e.preventDefault();

        if(e.target.value===questions[ind].answer){
            await axios.put(`http://localhost:3000/contest/${data.contest_no}/submission`,
            {userId:userId});  
        }
        if(ind<(questions.length-1)){
            const num=((((ind+1)*32)+36)-8)*2;
            window.localStorage.setItem("a11d2g3",num);
            setInd(ind+1);
        }else{
            GotoThanksPage();
        }
    }

    if(questions.length==0){
        return(
            <h1>Loading...</h1>
        )
    }

    return(
        <div className="ContestPage">
            {/* <Prompt 
                when={isPrompt}
                message={()=>"Want to end it Geek?"}
            /> */}
            <div>
                {time.substring(7,12)}
            </div>
            <div className="question-section">
                {/* <Question
                    key={ind}
                    question={questions[ind].question}
                    options={questions[ind].options}
                    answer={questions[ind].answer}
                /> */}
                <form>
                    <label>{questions[ind].question}</label><br/>
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
            {/* <div className="submit-section">
                <button onClick={GotoThanksPage}>Submit</button>
            </div> */}
        </div>
    )
};