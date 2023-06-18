import React, { useEffect } from 'react'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import HomeBanner from '../Components/HomeBanner/HomeBanner'
import Post from '../Components/Posts/Posts'

function HomePage() {

  
  return (
    <div>
        <Header/>
        <HomeBanner/>
        <Post/>
        <Footer/>
    </div>
  )
}

export default HomePage
