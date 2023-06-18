import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../../Redux/usernameReducer';
import { changeImage } from '../../Redux/userImageReducer';
import axios from '../../utils/axios'
import {verifyToken}from '../../utils/Constants'
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import './Header.css'
import jwt_decode from 'jwt-decode'

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
  
    useEffect(() => {
        const Token = localStorage.getItem("token");
        if (Token) {
            axios.post(verifyToken, JSON.stringify({ Token }), { headers: { "Content-Type": "application/json" } }).then((res) => {
               
                dispatch(change(res.data.user.username))
                dispatch(changeImage(res.data.user.image))
            }).catch((err) => {
                localStorage.removeItem('adminToken');

            })
        }
    }, []);

    const username1 = useSelector((state) => {
        return state.username;
    })
    const userImage = useSelector((state) => {
        return state.userImage;
        
    })
    
    const logout = () => {
        localStorage.clear();
        dispatch({type:'logout'})
    };

    const username = useSelector((state) => state.username)
    return (
        <>
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo onClick={()=>{
            navigate('/')
          }}></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{ username  ? <span>{username}  <button onClick={logout}><Link className='Link' to="/login">Logout</Link></button></span> : <button><Link className='Link' to="/login">Login</Link></button>}</span>
          <hr />
        </div>
        <div className="loginPage">
          <img
            onClick={()=>{
                navigate('/profile')
            }}
            src={userImage}
            className="rounded-circle"
            height={40}
            width={40}
            alt="Black and White Portrait of a Man"
            loading="lazy"
        />
        </div>
      </div>
    </div>
      {/* <ToastContainer/> */}
    </>
    )
}

export default Header