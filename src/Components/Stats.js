import React from 'react'
import Graph from './Graph'
import { db } from '../firebaseConfig';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Stats = ({wpm,accuracy,correctChars,incorrectChars,extraChars,missedChars,graphData}) => {

  let timeSet = new Set();
  const newGraph = graphData.filter(i=>{
    if(!timeSet.has(i[0])){
        timeSet.add(i[0])
        return i;
    }
  })

  const pushDataToDB = ()=>{

    if(isNaN(accuracy)){
      toast.error('invalid test', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return;
    }

    const resultsRef = db.collection('Results');

    const {uid} =  auth.currentUser;

    resultsRef.add({
      wpm : wpm,
      accuracy : accuracy,
      timeStamp : new Date(),
      characters : `${correctChars}/${incorrectChars}/${extraChars}/${missedChars}`,
      userId : uid
    })
      .then((res)=>{
        toast.success('Data saved', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      })
      .catch((err)=>{
        toast.warning('Not able to save Data', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      })
  }

  useEffect(()=>{
    if(auth.currentUser){
      pushDataToDB();
    }
    else{
      toast.warning('Login to save results', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  },[])
  return (
    <div className="stats-box">
        <div className="left-stat">

            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}</div>
            <div className="title">Characters</div>
            <div className="subtitle">{correctChars}/{incorrectChars}/{extraChars}/{missedChars}</div>

        </div>
        <div className='right-stat'>
           <Graph graphData={newGraph} />
        </div>
      
    </div>
  )
}

export default Stats
