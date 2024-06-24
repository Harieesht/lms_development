import React, { useState, useEffect } from 'react';   
import Cookie from "js-cookie"  
import { logout } from "../../../utils/auth.js"; 
import { Link } from "react-router-dom";   
import jwt_decode from 'jwt-decode'


function Header({ toggleSidebar }) {    
    
  const accessToken=Cookie.get("access_token")  
  const decodedToken =jwt_decode(accessToken) ?? null

  const [isLight, setIsLight] = useState(() => { 
       const storedTheme = localStorage.getItem('light');
       return storedTheme === null ? true : storedTheme === 'set';
     });
  
  const toggleTheme = () => {
    setIsLight(prevIsLight => {
      const newIsLight = !prevIsLight;
      if (newIsLight) {
        localStorage.setItem('light', 'set');
      } else {
        localStorage.removeItem('light');
      }
      return newIsLight;
    });
  };
  
    useEffect(() => {
      const currentTheme = isLight ? 'light' : 'dark';
      document.documentElement.setAttribute('data-bs-theme', currentTheme);
    }, [isLight]); 

    return (
        <nav className="navbar navbar-expand px-3 border-bottom shadow-sm">
        <button className="btn" id="sidebar-toggle" type="button" onClick={toggleSidebar}>
            <span className="navbar-toggler-icon"></span>
        </button> 
        <div className="navbar-collapse navbar"> 
            <ul className="navbar-nav d-flex justify-content-center align-items-center"> 
               <li className='theme-toggle d-flex me-3'> 
                    <input type="checkbox" className="checkbox" id="checkbox" onClick={toggleTheme} />
                      <label for="checkbox" className="checkbox-label">  
                          <i className="bi bi-sun-fill"></i>
                          <i className="bi bi-moon-fill"></i>
                          <span className="ball"></span>
                      </label>
               </li>    
               <li className='me-3'>   
                    <Link to={`/student/ticket`} className='position-relative'><i className="bi bi-ticket-detailed fs-5"></i>
                       <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle">
                          <span class="visually-hidden">New alerts</span>
                       </span> 
                    </Link>
                </li>  
               <li className='nav-notify dropdown me-4 position-relative'>  
                    <div className="cursor-pointer navbar-link " data-bs-toggle="dropdown" aria-expanded="false"> 
                      <a href="" className='position-relative'><i className="bi bi-bell fs-5"></i>
                         <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle">
                            <span class="visually-hidden">New alerts</span>
                         </span> 
                      </a>
                    </div>
                    <div className="dropdown-menu fx-dropdown-menu">
                        <h5 className="p-3 bg-primary text-light">Notification</h5>
                        <div className="list-group list-group-flush">
                            <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                                <div className="me-auto">
                                    <div className="fw-semibold">Subheading</div>
                                    <span className="fs-7">Content for list item</span>
                                </div>
                                <span className="badge bg-primary rounded-pill">14</span>
                            </a>
                        </div>
                    </div>
                </li> 
                <li className="nav-profile">  
                  <div className='dropdown'>
                    <div data-bs-toggle="dropdown" className="d-flex justify-content-center align-items-center">  
                       <a href="" className='nav-icon'> 
                          <img src={decodedToken?.user_image} className="avatar img-fluid rounded-5" alt="" />  
                          <span className='d-none d-md-inline ms-2'>Welcome, {decodedToken?.username}!<i className="bi bi-chevron-down ps-1"></i></span>  
                        </a>     
                    </div>
                   <div className="dropdown-menu dropdown-menu-end mt-2">
                        <Link href="#" className="dropdown-item" to={`/student/profile/`}><i class="bi bi-person-fill fs-5 pe-2"></i>Profile</Link>
                        <Link href="#" className="dropdown-item" to={`/student/change-password/`} ><i className="bi bi-gear-fill fs-5 pe-2"></i>Setting</Link> 
                        <hr className='m-2'/>
                        <Link to="#" className="dropdown-item" onClick={logout} ><i className="bi bi-box-arrow-right fs-5 pe-2"></i>Logout</Link> 
                    </div> 
                  </div>
                </li>
            </ul>
        </div>
    </nav> 
    );
}

export default Header; 

 

{/* <a href=''> 
                      <i className="bi bi-bell-fill fs-6 p-1"></i> 
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger p-1"><span className="visually-hidden">messages</span></span>
                   </a>      */}