import React from 'react'
import BodyTitle from '../Components/BodyTitle/BodyTitle'

import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import Users from '../Components/Users/Users'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function UsersManagementPage() {

  const navigate = useNavigate();
  
  return (
    <div>

      <Header />
      <Sidebar />
      <main id="main" className="main">
        <BodyTitle data={"User management"} />
        <section className="section dashboard">
          <Users />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default UsersManagementPage