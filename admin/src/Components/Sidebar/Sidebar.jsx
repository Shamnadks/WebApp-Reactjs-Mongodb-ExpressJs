import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
<div>
  {/* ======= Sidebar ======= */}
  <aside id="sidebar" className="sidebar">
    <ul className="sidebar-nav" id="sidebar-nav">

      <li className="nav-item">
        <Link className="nav-link collapsed" to={'/dash'}>
          <i className="bi bi-grid" />
          <span>Dashboard</span>
        </Link>
      </li>      
      <li className="nav-item">
        <Link className="nav-link collapsed" to={'/users'}>
          <i className="bi bi-file-earmark" />
          <span>Users</span>
        </Link>
      </li>
     
    </ul>
  </aside>
  {/* End Sidebar*/}
</div>

  )
}

export default Sidebar