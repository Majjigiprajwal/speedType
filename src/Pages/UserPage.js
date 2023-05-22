import React from 'react'
import {useState,useEffect} from 'react';
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableUserData from '../Components/TableUserData';
import Graph from '../Components/Graph';
import UserInfo from '../Components/UserInfo';
import { useTheme } from '../Context/ThemeContext';

const UserPage = () => {

    const [data, setData] = useState([]);

    const [user, loading] = useAuthState(auth);

    const [graphData, setGraphData] = useState([]);

    const [dataLoading, setDataLoading] = useState(true);

    const {theme} = useTheme();


    const navigate = useNavigate();


    const fetchUserData = ()=>{
        const resultsRef = db.collection('Results');
        const {uid} = auth.currentUser;
        let tempData = [];
        let tempGraphData = [];
        resultsRef.where("userId","==",uid)
             .orderBy('timeStamp','desc')
             .get()
             .then((snapshot)=>{
                snapshot.docs.forEach((doc)=>{
                    tempData.push({...doc.data()})
                    tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(",")[0],doc.data().wpm]);
                })
                setData(tempData);
                setGraphData(tempGraphData.reverse());
                setDataLoading(false);
              })
    }
    
    useEffect(()=>{
        if(!loading){
        fetchUserData();
        }
        if(!loading && !user){
           navigate('/');
        }
    },[loading])

    if(loading || dataLoading){
        return (
        <div className="center-of-screen">
        <CircularProgress size={100} style={{color:theme.typeBoxText}} />
        </div>
    )}

  return (
    <div className='canvas'>
      <UserInfo totalTestTaken={data.length}/>
      <div className="graph-user-page">
      <Graph  graphData={graphData} type='data'/>
      </div>
        <TableUserData  data={data}/>
    </div>
  )
}

export default UserPage
