import axios from '../../utils/axios';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { getUser, updateUser } from '../../utils/Constants';
import { useState } from 'react';
import Swal from 'sweetalert2';

function UpdateUser() {
    const params = useParams();
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        console.log("mounting");
        axios.get(`${getUser}/${params.id}`).then((res) => {
            setEmail(res.data.user.email)
            setUserName(res.data.user.username)
        }).catch((error) => {
            Swal.fire({
                title: 'Oops...',
                text: error.response.data.message,
                height: "5rem",
            })
            navigate('/users')
        })

    }, [])

    function formSubmit(e) {
        e.preventDefault()
        const body = { username: username, email: email }
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("fire");
                axios.put(`${updateUser}/${params.id}`, body, { headers: { "Content-Type": "application/json" } }).then((response) => {
                    Swal.fire(
                        'Updated',
                        'User Details has been updated.',
                        'success'
                    )
                    navigate('/users')
                }).catch((error) => {
                    Swal.fire({
                        title: 'Oops...',
                        text: "try again",
                        height: "5rem",
                    })
                })
            }
        })
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 outerBoxEdit ">
                        <form onSubmit={formSubmit} >

                            <div className="form-group">
                                <label htmlFor="first_name">Name</label>
                                <input
                                    type="text"

                                    className="form-control"

                                    id="name"
                                    placeholder="Enter Name"
                                    value={username}
                                    required=""
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                <span id="name-error" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"

                                    className="form-control"

                                    id="email"
                                    placeholder="Email Address"
                                    value={email}

                                    required=""
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <span id="email-error" />
                            </div>
                            <br />
                            <br />

                            <button
                                onclick="return validateForm()"
                                type="submit"
                                className="btn btn-secondary btn-sm mx-1"
                            >
                                Update
                            </button>
                            <button onClick={() => navigate('/users')} className="btn btn-secondary  btn-sm ">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser