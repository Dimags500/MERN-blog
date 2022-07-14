import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';

import {useDispatch , useSelector } from 'react-redux'
import {fetchAuth, logout, selectIsAuth} from '../../redux/slices/auth'

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch() ;

  const onClickLogout =( ) =>{
    if(window.confirm('Are you shure you want to logout ?')){
      dispatch(logout());
      window.localStorage.removeItem('token')
    }
  }


  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Some BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <a href="/posts/create">
                  <Button variant="contained">Add post </Button>
                </a>
                <Button onClick={()=>onClickLogout()} variant="contained" color="error">
                  LogOut
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create Account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
