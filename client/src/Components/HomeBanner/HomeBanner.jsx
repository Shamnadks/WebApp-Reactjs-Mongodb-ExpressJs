import React from 'react'
import './HomeBanner.css';
import { useSelector,useDispatch } from 'react-redux';
import { change } from '../../Redux/usernameReducer';
import Arrow from '../../assets/Arrow'

function HomeBanner() {
    const username =useSelector((state)=> state.username)
    const dispatch =useDispatch()
    
    return (
        <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow> 
          </div>
          <div className="otherQuickOptions">
            <span>Cars</span>
            <span>Motorcy...</span>
            <span>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span>
          </div>
        </div>
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
      </div>
      
    </div>
    )
}

export default HomeBanner