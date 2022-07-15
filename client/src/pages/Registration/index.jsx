import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';


import { useNavigate } from "react-router-dom";
import {useDispatch , useSelector } from 'react-redux'
import {fetchAuth, fetchRegister, selectIsAuth} from '../../redux/slices/auth'
import {useForm} from 'react-hook-form'

export const Registration = () => {





  let navigate = useNavigate();
  const  isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch() ;  
  const {register , handleSubmit , setError , formState : {errors , isValid}} = useForm({
    defaultValues : {
      fullName : '' ,
      email : '' ,
      password : '',
    } ,
    mode: 'onChange'
  }) 


  if(isAuth){
    return navigate('/')
  }
  
  const onSubmit = async (values) =>{
   const data = await dispatch(fetchRegister(values)) ;
  
  //  if('token' in data.payload){
  //   window.localStorage.setItem('token' , data.payload.token)
  //  }else{
  //   alert("Can't login ")
  //  }
  }

  return (
    <Paper classes={{ root: styles.root }}>

      <Typography classes={{ root: styles.title }} variant="h5">
        Create Account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} >

      <TextField 
         className={styles.field}
        label="FullName"
        error ={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName' , {required: 'Enter fullname'})}
        fullWidth />

      <TextField className={styles.field} label="E-Mail" fullWidth 
         error ={Boolean(errors.email?.message)}
         helperText={errors.email?.message}
         {...register('email' , {required: 'Enter Email'})} />

      <TextField className={styles.field} label="Password" fullWidth 
      error ={Boolean(errors.password?.message)}
      helperText={errors.password?.message}
      {...register('password' , {required: 'Enter Password'})}/>


      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
      Registration
      </Button>
      </form>

    </Paper>
  );
};
