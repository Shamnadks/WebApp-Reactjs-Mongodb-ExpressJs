import React from 'react'
import BodyTitle from '../Components/BodyTitle/BodyTitle'

import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import UpdateUser from '../Components/UpdateUser/UpdateUser'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function UserUpdatePage() {
 

  const navigate = useNavigate();
  useEffect(() => {
    const Token = localStorage.getItem("adminToken");
   
    if (!Token) {
      navigate("/");
    }
  }, [navigate]);


  return (
    <div>

      <Header />
      <Sidebar />
      <main id="main" className="main">
        <BodyTitle data={"Update User"} />
        <section className="section dashboard">
          <UpdateUser />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default UserUpdatePage