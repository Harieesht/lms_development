import React from 'react'
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'   
import { Link } from "react-router-dom"; 

function Logout() {
  return (
    <>
      {/* <BaseHeader /> */}

      <section className="container d-flex flex-column" style={{ marginTop: "150px" }}>
        <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
          <div className="col-lg-5 col-md-8 py-8 py-xl-0">
            <div className="card shadow bg-dark rounded-4 p-2 p-lg-4">
              <div className="card-body p-6 text-center text-white "> 
                 <div className="mb-4"> 
                   <img src="/public/MH_COCKPIT_LOGO.png" alt="MH_COCKPIT" className='img-fluid w-50' />
                </div> 
                <div className="mb-4">
                  <h2 className="mb-1 fw-bold">You have been logged out!</h2>
                  {/* <span>
                    Thanks for visiing our website, come back anytime!
                  </span> */}
                </div>
                <form className="needs-validation mt-5" noValidate="">
                  <div className="d-grid d-flex flex-warp">
                   <Link to="/login" className="btn btn-primary me-2 w-100">    
                      Login <i className='fas fa-sign-in-alt'></i>
                   </Link>  
                   {/* <Link to="/register" className='btn btn-primary w-100'>
                      Register <i className='fas fa-user-plus'></i>
                    </Link> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <BaseFooter /> */}
    </>
  )
}

export default Logout