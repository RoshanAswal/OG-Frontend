import moment from 'moment';
import { useEffect, useState } from 'react';
export const Timer=()=>{
    const [timer,setTimer]=useState(moment().format('MMMM Do YYYY, h:mm:ss a'));
    useEffect(()=>{
        setTimeout(()=>{
            setTimer(moment().format('ddd h:mm:ss a'));
        },1000);
    });
    return (
        <strong className='timer'>{timer.substring(0,3)}</strong>
    )
}