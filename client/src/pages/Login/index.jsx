import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import {useDispatch , useSelector } from 'react-redux'
import {fetchAuth, selectIsAuth} from '../../redux/slices/auth'
import {useForm} from 'react-hook-form'
import styles from "./Login.module.scss";

export const Login = () => {

let navigate = useNavigate();
const  isAuth = useSelector(selectIsAuth);
const dispatch = useDispatch() ;  
const {register , handleSubmit , setError , formState : {errors , isValid}} = useForm({
  defaultValues : {
    email : '' ,
    password : '',
  } ,
  mode: 'onChange'
}) 


if(isAuth){
  return navigate('/')
}

const onSubmit = async (values) =>{
 const data = await dispatch(fetchAuth(values)) ;

 if('token' in data.payload){
  window.localStorage.setItem('token' , data.payload.token)
 }else{
  alert("Can't login ")
 }
}

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        To Account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} >
      <TextField
        className={styles.field}
        label="E-Mail"
        error ={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email' , {required: 'Enter Email'})}
        fullWidth
      />
      <TextField className={styles.field} 
      label="Password" 
      error ={Boolean(errors.password?.message)}
      helperText={errors.password?.message}
      {...register('password' , {required: 'Enter Password'})}
      fullWidth />
      <Button  disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Login
      </Button>
      </form>
    </Paper>
  );
};
