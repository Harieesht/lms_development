import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";

const StudentLayout = () => {    

    const [collapsed, setCollapsed] = useState(false); 

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
      }; 

  return (
    <> 
      <div className='warpper d-flex'>
         <Sidebar collapsed={collapsed} />
         <div className="main-container">
             <Header toggleSidebar={toggleSidebar} /> 
             <section className='content px-3 py-2'>  
               <Outlet /> 
             </section>  
         </div> 
      </div>
    </>
  )
}

export default StudentLayout