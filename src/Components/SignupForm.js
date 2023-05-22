import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import {useState} from 'react';
import { useTheme } from '../Context/ThemeContext';
import {auth} from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Uitls/errorMapping';

const SignupForm = ({handleClose}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {theme} = useTheme();
    
    const handleSubmit = ()=>{
        if(!email || !password){
            toast.warning('Fill all the details', {
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
        if(confirmPassword !== password){
            toast.warning('Password mismatch', {
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

        auth.createUserWithEmailAndPassword(email, password)
          .then((res)=>{
            toast.success('User created', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
               handleClose(); 
          })
          .catch((err)=>{
            toast.error(errorMapping[err.code || 'Some error occured'], {
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


  return (
    <Box
       p={3}
       style={{
        display:'flex',
        flexDirection:'column',
        gap:'20px'
       }} 
       >
       <TextField 
       variant='outlined'
       type='email'
       label='Enter Email'
       onChange={(e)=>setEmail(e.target.value)}
       InputLabelProps={{
        style:{
            color :theme.typeBoxText
        }
       }}
       InputProps={{
        style:{
            color :theme.typeBoxText
        }
       }}
       />
       <TextField
       variant='outlined'
       type='password'
       label='Enter Password'
       onChange={(e)=>setPassword(e.target.value)}
       InputLabelProps={{
        style:{
            color :theme.typeBoxText
        }
       }}
       InputProps={{
        style:{
            color :theme.typeBoxText
        }
       }}
       />
       <TextField
       variant='outlined'
       type='password'
       label='Enter Confirm Password'
       onChange={(e)=>setConfirmPassword(e.target.value)}
       InputLabelProps={{
        style:{
            color :theme.typeBoxText
        }
       }}
       InputProps={{
        style:{
            color :theme.typeBoxText
        }
       }}
       />
       <Button
        variant='contained'
        size='large'
        style={{
            background : theme.typeBoxText , color : theme.background
        }}
        onClick={handleSubmit}
       >Signup</Button>
    </Box>
  )
}

export default SignupForm
