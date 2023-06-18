import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import axios from '../../utils/axios'
import { verifyToken } from '../../utils/Constants';
import { changeAdmin } from '../../Redux/adminReducer';


function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        const Token = localStorage.getItem("adminToken");
        if (!Token) {
            navigate("/");
        } else {
            axios.post(verifyToken, JSON.stringify({ Token }), { headers: { "Content-Type": "application/json" } }).then((res) => {
                dispatch(changeAdmin(res.data.email))
            }).catch((err) => {
                localStorage.removeItem('adminToken');

            })

        }
    }, []);

    const logoutHandle = () => {
        localStorage.removeItem('adminToken');

    };

    const admin = useSelector((state) => state.username)
    return (
        <div>
            {/* ======= Header ======= */}
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-between">
                    <Link to={'/'} className="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt="" />
                        <span className="d-none d-lg-block">Admin Page</span>
                    </Link>
                    <i className="bi bi-list toggle-sidebar-btn" />
                </div>
                {/* End Logo */}
                <div className="search-bar">
                    <form
                        className="search-form d-flex align-items-center"
                        method="POST"
                        action="#"
                    >
                        <input
                            type="text"
                            name="query"
                            placeholder="Search"
                            title="Enter search keyword"
                        />
                        <button type="submit" title="Search">
                            <i className="bi bi-search" />
                        </button>
                    </form>
                </div>
                <h3>{admin}</h3>
                {/* End Search Bar */}
                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">

                        <li className="nav-item dropdown pe-3">
                            <a
                                className="nav-link nav-profile d-flex align-items-center pe-0"
                                href="#"
                                data-bs-toggle="dropdown"
                            >
                                
                                <span className="d-none d-md-block dropdown-toggle ps-2">
                                    Admin
                                </span>
                            </a>
                            {/* End Profile Iamge Icon */}
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">

                                
                                <li>
                                    <Link className="dropdown-item d-flex align-items-center" onClick={logoutHandle} to={'/'}>
                                        <i className="bi bi-box-arrow-right" />
                                        <span>Sign Out</span>
                                    </Link>
                                </li>
                            </ul>
                            {/* End Profile Dropdown Items */}
                        </li>
                        {/* End Profile Nav */}
                    </ul>
                </nav>
                {/* End Icons Navigation */}
            </header>
            {/* End Header */}
        </div>

    )
}

export default Header