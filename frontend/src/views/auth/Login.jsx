import { login } from '../../utils/auth'  
import apiInstance from '../../utils/axios' 
import { useState,useEffect } from 'react'    
import React from 'react'
import { Link,useNavigate } from 'react-router-dom' 

function Login() {
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");
  const [isLoading,setIsLoading]=useState(false);


  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const {error} =await login(username,password);
    if (error){
      setIsLoading(false);
      alert(error)
    }else{  
        navigate('/student/Dashboard');
        setIsLoading(false);
    }

  } 
  return (
    <>  
      {/* <BaseHeader /> */}
      <section className="container d-flex flex-column" style={{ marginTop: "150px" }}>
        <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8 ">
          <div className="col-lg-4 col-md-8 py-8 py-xl-0  ">
            <div className="card shadow bg-dark rounded-4">
              <div className="card-body p-4 p-lg-5 p-md-5 p-sm-5 text-white">
                <div className="mb-4 text-center"> 
                  <img src="/public/MH_COCKPIT_LOGO.png" alt="MH_COCKPIT" className='img-fluid w-50' />
                </div>
                {/* Form */}
                <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
                  {/* Username */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="johndoe@gmail.com"
                      required=""
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please enter valid username.
                    </div>
                  </div>
                  {/* Password */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Please enter valid password.
                    </div>
                  </div>
                  {/* Checkbox */}
                  <div className="d-lg-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberme"
                        required=""
                      />
                      <label className="form-check-label" htmlFor="rememberme">
                        Remember me
                      </label>
                      <div className="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                    <div>
                      <Link to="/forgot-password/">Forgot password?</Link>
                    </div>
                  </div>
                  <div>
                    <div className="d-grid">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                         {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Log in'}
                    </button>
                    </div> 
                    <div className='text-center mt-4'> 
                      <span className='fs-7'> 
                        Copyright © MH Academy Pvt. Ltd. 2024 
                         {/* Don’t have an account?
                        <Link to="/register/" className="ms-1">
                         Sign up
                        </Link> */}
                       </span>
                    </div>
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

export default Login