import React from "react";
import { Link } from "react-router-dom"; 

 
function Sidebar({ collapsed, closeSidebar }) {

    return (  
        <aside id="sidebar" className={collapsed ? "collapsed" : ""}> 
            <div className="sidebar-logo m-4">
                <a href="#"><img src="/public/MH_COCKPIT_LOGO.png" alt="" className='img-fluid' /></a>
            </div> 
            <ul class="sidebar-nav" onClick={closeSidebar}>
                    <li class="sidebar-item">
                        <Link class="sidebar-link" to={`/student/dashboard/`} >
                         <i class="bi bi-grid-1x2-fill pe-2"></i>Dashboard</Link>
                    </li>
                    <li class="sidebar-item" >
                        <Link class="sidebar-link" to={`/student/wishlist/`}> 
                        <i class="bi bi-book-half pe-2"></i>MySubjects</Link>
                    </li> 
                    <li class="sidebar-item">
                        <Link class="sidebar-link" to={`/student//`}>
                        <i class="bi bi-list-task pe-2"></i>Daily Task</Link>
                    </li>  
                    <li class="sidebar-item">
                        <Link class="sidebar-link" to={`/student/`}>
                        <i class="bi bi-calendar-week pe-2"></i>Calender</Link>
                    </li>  
                    <li class="sidebar-item">
                        <Link class="sidebar-link" to={`/student/`}>
                        <i class="bi bi-question-circle-fill pe-2"></i>Interview Question</Link>
                    </li>  
                    <li class="sidebar-item">
                        <Link class="sidebar-link" to={`/student/`}>
                        <i class="bi bi-trophy pe-2"></i>Leadership Board</Link>
                    </li> 
                </ul> 
        </aside> 
    );
}

export default Sidebar;

