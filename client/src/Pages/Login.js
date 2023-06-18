import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import Login from "../Components/Login/Login"
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import axios from '../utils/axios'


function LoginPage() {

  const navigate = useNavigate();
  useEffect(() => {
    const Token = localStorage.getItem("token");
    if (Token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
        <Header/>
        <Login/>
        <Footer/>
    </div>
  )
}

export default LoginPage