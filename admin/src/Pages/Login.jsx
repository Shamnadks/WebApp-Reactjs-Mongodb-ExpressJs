// import React from 'react'

import Footer from "../Components/Footer/Footer"
import Login from "../Components/Login/Login"


import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const Token = localStorage.getItem("adminToken");
    if (Token) {
      navigate("/dash");
    }
  }, [navigate]);

  return (
    <div>
      <Login />
    </div>
  )
}

export default LoginPage