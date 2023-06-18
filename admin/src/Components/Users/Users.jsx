import React from 'react'
import { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import axios from '../../utils/axios'
import { getUsers, searchUser } from '../../utils/Constants';
import Swal from "sweetalert2";
import { deleteUser } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom'

function Users() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

    useEffect((key) => {

      getUsersList()
  
    },[])
    
  const getUsersList = () => {
    axios.get(getUsers).then((response) => {
        setUsers(response.data.user)
    }).catch((error) => {
      console.log("inside catch");
      console.log(error);
    })

  }

  const searchHandle = () => { }
  const deleteUserBtn = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${deleteUser}/${id}`).then((res) => {
          getUsersList()
          console.log(res);

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

        }).catch((err) => {
          Swal.fire(
            'Not Deleted!',
            'Some Error.',
            // 'success'
          )

        })

      }
    })
  }
  const searchBy=(e)=>{
    let key= e.target.value;
    if(!key){
      getUsersList()
    }else{
      axios.get(`${searchUser}/${key}`).then((response) => {
        console.log(response.data.users);
        setUsers(response.data.users)
      }).catch((error) => {
       
      })
    }

  }

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          name="query"
          placeholder="Search"
          title="Enter search keyword"
          onChange={searchBy}
        />
      </div>
      <table className="table table-bordered  " id="myTable">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((obj, index) =>
            <tr>
              <td>{index + 1}</td>
              <td>{obj.username}</td>
              <td>{obj.email}</td>
              <td><button type="button" onClick={() => deleteUserBtn(obj._id)} className="btn badge rounded-pill bg-danger">Delete</button></td>
              <td><button type="button" onClick={() => navigate(`/updateUser/${obj._id}`)} className=" btn   badge rounded-pill bg-secondary"> Edit </button></td>
            </tr>
          )
          }
        </tbody>
      </table>
    </div>

  )
}

export default Users