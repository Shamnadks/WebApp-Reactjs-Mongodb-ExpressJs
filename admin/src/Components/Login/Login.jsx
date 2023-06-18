import React from 'react'
import Footer from '../Footer/Footer'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from '../../utils/axios'
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';
import { change, changeAdmin } from '../../Redux/adminReducer';
import { adminLogin } from '../../utils/Constants';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('Sabeeh@123')
    const Submit = (e) => {
        e.preventDefault()
        const body = JSON.stringify({
            email,
            password,
        })
        axios.post(adminLogin, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
            localStorage.setItem('adminToken', res.data.adminToken)
            let token = res.data.adminToken
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login Successfully',
                showConfirmButton: false,
                timer: 1500
        })
            let {email} = jwt_decode(token);
            dispatch(changeAdmin(email))
            navigate('/dash')
        }).catch((err) => {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 1500
              })

        })
    }
    return (
        <div>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="Sample image"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={Submit}>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Sign In</p>

                                </div>
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0"></p>
                                </div>
                                {/* Email input */}
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                    <label className="form-label" htmlFor="form3Example3">
                                        Email address
                                    </label>
                                </div>
                                {/* Password input */}
                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="form3Example4"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                    <label className="form-label" htmlFor="form3Example4">
                                        Password
                                    </label>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* Checkbox */}
                                    <div className="form-check mb-0">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            defaultValue=""
                                            id="form2Example3"
                                        />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button

                                        type="submit"

                                        className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                    >
                                        Login
                                    </button>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    )
}
export default Login