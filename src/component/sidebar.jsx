import React, { useState } from 'react';
import Logo from "../assests/image/logo.svg";
import DashboardIcon from "../assests/image/dasboard-icon.svg";
import ProjectIcon from "../assests/image/project-icon.svg";
import Milestones from "../assests/image/milestones.svg";
import Logout from "../assests/image/icon-logout.svg";
import Myteam from "../assests/image/my-team.svg";
import Planing from "../assests/image/planing.svg";


function Sidebar() {
  return (
    <aside id="sidebar" className="sidebar">
       <div className='top-part'>
        <img src={Logo} className='logo-left' alt='logo' />
         <div className='welkom'>
         <div className='flex-welkom'>
          <div className="profile-image"></div>
            <div className='name-profile'>Welkom, Martijn</div>
          </div>
          <p><span className='profile-circle-dot'></span>Bekijk notificaties</p>
        </div>
        <li className="nav-item">
    <a className="nav-link collapsed cover-ul" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#" aria-expanded="false">
      <img src={ProjectIcon} alt='icon'/><span>Projects</span>
      <i class="bi bi-chevron-down ms-auto"></i>
    </a>
    <ul id="tables-nav" className="nav-content submenus collapse" data-bs-parent="#sidebar-nav">
      <li>
        <a href="#">
          <span>All projects</span>
        </a>
      </li>
      <li>
        <a href="#">
          <span>Create new project</span>
        </a>
      </li>
    </ul>
  </li>
      </div>

     <div className='fit-navbar-bottom'>
        <ul className="sidebar-nav top-line" id="sidebar-nav">
         <li className="nav-item">
           <a href="#" className="nav-link">
             <img src={Myteam} alt='icon'/>
             <span>My team</span>
          </a>
       </li>
       <li className="nav-item">
           <a href="#" className="nav-link">
             <img src={Myteam} alt='icon'/>
             <span>Clients</span>
          </a>
          </li>
          <li className="nav-item">
           <a href="#" className="nav-link">
             <img src={Myteam} alt='icon'/>
             <span>Sub-Contractors</span>
            </a>
           </li>
          </ul>
        </div>
        <div className='setting-bottom'>
            <p>Settings</p>
            <p><img src={Logout} alt='icon' /></p>
          </div>
      </aside>
  )
}

export default Sidebar