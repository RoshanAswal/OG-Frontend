import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { WinnerCard } from "../components/WinnerCard";
import moment from "moment";
import right from "../images/right-chevron.png";
import left from "../images/left-chevron.png";
import winner from "../images/winners.png";

export const ContestDetail=(props)=>{

    const location = useLocation();
    const navigate=useNavigate();
    const data=location.state;

    const limit=50;
    const capacity=24;

    const [btn,setbtn]=useState("Register");
    const [cookies,_]=useCookies(["access_token"]);
    const [loading,setLoading]=useState(true);
    const [contestDetail,setContestDetail]=useState();
    const [usersRegistered,setUsersRegistered]=useState([]);
    const [timer,setTimer]=useState('');
    const [winners,setWinners]=useState([]);
    const [showWinners,setShowWinners]=useState(false);
    const [page,setPage]=useState(0);
    const [totalPage,setTotalPage]=useState(0);

    const userId=window.localStorage.getItem("userId");

    useEffect(()=>{
        if(cookies.access_token){}
        else{
            if(window.localStorage.getItem("userId")){
                window.localStorage.removeItem("userId");
                window.location.reload();
            }
        }
    });
    useEffect(() => {
        const getCurrentTime=async ()=>{
          const response = await axios.get(`${process.env.REACT_APP_CONNECTION}api/currentTime`);
          setTimer(response.data);
        }
        if(loading===false && contestDetail.type==="upcoming"){
            setTimeout(()=>{
                getCurrentTime();
            },1000);
        }
        console.log(timer);
    });


    useEffect(()=>{
        const fetchContestDetail=async ()=>{
            try{
                const response=(data.type==="done")?(await axios.get(`${process.env.REACT_APP_CONNECTION}contest/${data.contest_id}`)):
                (await axios.get(`${process.env.REACT_APP_CONNECTION}contest/upcoming/${data.contest_id}`));
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
        window.localStorage.removeItem("a11d2g3");
    },[]);

    useEffect(()=>{
        if(contestDetail)
            setTotalPage(Math.ceil(contestDetail.winners?.length/capacity));
    },[contestDetail]);

    // useEffect(()=>{
        // if(loading===false && contestDetail.type==="upcoming"){
        //     setTimeout(()=>{
        //         setTimer(moment().format('ddd hh:mm:ss aa'));
        //     },1000);
        // }
    // });
    // useEffect(()=>{
    //     const fun=async ()=>{
    //         let day=timer.substring(0,3);
    //         let hour=timer.substring(4,6);
    //         let period=timer.substring(13,15);
    //         let min=timer.substring(7,9);
    
    //         if(loading===false && contestDetail.type==="upcoming"
    //             && day==="Wed" && hour==="05" && period==="pm"){ // Contest starting time
    //                 await axios.put(`http://localhost:3001/${contestDetail.contest_no}/SetRanking`);
    //         }
    //     }
    //     fun();
    // });


    const handleClick=async (req,res)=>{
        if(userId){
            if(contestDetail.type==="upcoming" && btn==="Register"){
                try{
                    const response=await axios.post(`${process.env.REACT_APP_CONNECTION}payments/verification`,
                    {contest_id:data.contest_id,user_id:userId,headers:cookies.access_token});
                    if(response.data==="success"){
                        navigate("/PaymentSuccess");
                    }else{
                        navigate("/PaymentFailed");
                    }
                    // trial();
                    // handleCheckout();
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
        return false;
        // if(loading===false && contestDetail.type==="upcoming"
        //     && day==="Sat" && hour==="07" && period==="pm"){ // Contest starting time
        //     return true;
        // }else return false;
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
    // async function handleCheckout() {
    //     const stripe = await getStripe();
    //     const { error } = await stripe.redirectToCheckout({
    //       lineItems: [
    //         {
    //           price: process.env.REACT_APP_PRICE_ID,
    //           quantity: 1,
    //         },
    //       ],
    //       mode: 'payment',
    //       successUrl:`http://localhost:3000/PaymentSuccess`,
    //       cancelUrl: `http://localhost:3000/PaymentFailed`,
    //       customerEmail: 'customer@email.com',
    //     });
    //     console.warn(error.message);
    // }
    // const trial=async ()=>{
    //     try{
    //         const key=await axios.get("http://localhost:3001/getPayKey");

    //         const response=await axios.put("http://localhost:3001/payments",{amt:500,headers:cookies.access_token});
            
    //         const options = {
    //             key: key.data, // Enter the Key ID generated from the Dashboard
    //             amount: response.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //             currency: "INR",
    //             name: "OnlyGeeks", //your business name
    //             description: "Test Transaction",
    //             image: "https://drive.google.com/file/d/1h1OTFsll9iMsPYjLWdXFSUjxzneOo-Ae/view?usp=sharing",
    //             order_id: response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //             callback_url: `http://localhost:3001/payments/verification?contest_id=${data.contest_id}&user_id=${userId}`,
    //             prefill: {
    //                 name: "Gaurav Kumar", //your customer's name
    //                 email: "gaurav.kumar@example.com",
    //                 contact: "9000090000"
    //             },
    //             notes: {
    //                 "address": "Razorpay Corporate Office"
    //             },
    //             theme: {
    //                 "color": "#3399cc"
    //             }
    //         };
    //         var rzp1 = new window.Razorpay(options);
    //         rzp1.open();
    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    // const payNow=async token =>{
    //     try{
    //         const response=await axios({
    //             url:'http://localhost:3001/payment',
    //             method:'post',
    //             data:{
    //                 amount:5000,
    //                 token,
    //             }
    //         })
    //         if(response.status===200){
    //             console.log("Success");
    //         }
    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    if(loading){
        return(
            <p>Loading...</p>
        )
    }
    if(showWinners){
        return (
            <div className="winnersList">
                <Navbar />
                <img className="winnerHeading" src={winner}></img>
                <div>
                    {
                        contestDetail.type!=="done" || contestDetail.winners.length==0
                        ?<h1>Not available</h1>
                        :<WinnerCard ind={page*capacity} users={contestDetail.winners.slice(page*capacity,(page*capacity)+capacity)} />
                    }
                </div>
                
                <div className="btnControl">
                    <div>
                        <img onClick={()=>setPage(page>0?page-1:page)} 
                        src={left}
                        />
                    </div>
                    
                    <div>
                        <input type="number" name="pageNo" value={page} onChange={(e)=>{setPage(e.target.value)}}/>
                    </div>

                    <div>
                        <img                       
                            onClick={()=>setPage(page<totalPage-1?page+1:page)}
                            src={right}
                        />                    
                    </div>
                </div>
                <button onClick={()=>setShowWinners(false)}>Back</button>
            </div>

        )
    }
    return (
        <div className="contestDetail">
            <Navbar />
            {
                contestDetail.type==="done"?"":
                <strong id="timer">{
                    showTimer()?timer.substring(7,12):
                    contestDetail.type==="done"?"ended":"Starts soon" 
                    // timer
                }</strong>
            }

            <div>
                <h1 id="heading">Contest {contestDetail.contest_no}</h1>
            </div>
            <br/>
            <div>
                {
                    showButton()?(
                        <button onClick={handleClick}>
                            {btn}
                        </button>
                    ):<h3 id="reg">Registered</h3>
                }
            </div>
            <div className="details">
                <div>
                    <h2 id="sub-head">Schedule</h2>
                    <p>{contestDetail.schedule}</p>
                </div>
                <div>
                    <h2 id="sub-head">Sponser</h2>
                    <p>{contestDetail.sponser}</p>
                </div>
                <div>
                    <h2 id="sub-head">Prizes</h2>
                    <ul>
                        {
                        (contestDetail.prize).map((item,i)=>(
                            <li key={i}>{item}</li>
                        ))
                        }
                    </ul>
                </div>
                {
                    contestDetail.type==="done"?"":
                    <div>
                        <h2 id="sub-head">Rules :</h2>
                        <ol>
                            {
                                (contestDetail.rules).map((item,i)=>(
                                    <li key={i}>{item}</li>
                                ))
                            }
                        </ol>
                    </div>

                }
                {
                    contestDetail.type==="done"
                    ?<div>
                        <h2 id="sub-head">Winners : </h2>
                        {
                            contestDetail.type!=="done" || contestDetail.winners.length==0
                            ?<h3>Not available yet</h3>
                            :<div>
                                {/* {contestDetail.winners.splice(0,2).map((item,index)=>{
                                    <WinnerCard position={index} arr={item}/>
                                })} */}
                                
                                <button onClick={()=>setShowWinners(true)}>See full list</button>
                            </div>

                        }

                    </div>
                    :""
                }


                {/* <button onClick={()=>trial()}>trial Register</button> */}
            </div>
        </div>
    )
}