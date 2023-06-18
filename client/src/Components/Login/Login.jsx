import React from 'react';
import { useState } from 'react';
import './Login.css';
import axios from '../../utils/axios'
import { loginPost } from '../../utils/Constants';
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import { change } from '../../Redux/usernameReducer';

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault()

    const body = JSON.stringify({
      email,
      password,
    })
    
    axios.post(loginPost, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
      localStorage.setItem('token', res.data.token)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login Successfully',
        showConfirmButton: false,
        timer: 1500
     })
      // window.alert("Login success")
      dispatch(change(res.data.user))
      navigate('/')
    }).catch((err) => {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: err.response.data.message,
        showConfirmButton: false,
        timer:1500
    })

    })

  }

  return (
    <div>
      <section className="text-center">
        {/* Background image */}
        <div
          className="p-5 bg-image"
          style={{
            backgroundImage:
              'url("https://apkdone.com/wp-content/uploads/2020/12/OLX-poster.jpg")',
            height: 500, width:'100%', 
            
          }}
        />
        {/* Background image */}
        <div className='outer'>
          <div
            className="card mx-5 mx-md-5 shadow-5-strong w-50 outer "
            style={{
              marginTop: "-100px",
              background: "hsla(0, 0%, 100%, 0.8)",
              backdropFilter: "blur(30px)",

            }}
          >
            <div className="card-body py-5 px-md-5 ">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold mb-5">Login Form</h2>
                  <form onSubmit={handleLogin}>
                    {/* Email input */}
                    <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                      />
                      
                    </div>
                    {/* Password input */}
                    <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                      />
                      
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                      Login
                    </button><br />
                    <span>Don't have an account? <Link to='/signup'>Register</Link> </span>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login