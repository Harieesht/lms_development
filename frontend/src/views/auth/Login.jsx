import { login } from '../../utils/auth'  
import apiInstance from '../../utils/axios' 
import { useState,useEffect } from 'react'    
import { Link,useNavigate } from 'react-router-dom'  
import "../student/Css/Login.css"

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
        navigate('/student');
        setIsLoading(false);
    }

  } 
  return (
    <>   
    <section className="login-container px-3 p-sm-5"> 
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
              <div className="login-card my-sm-4 px-4 px-md-5 py-5 rounded-4 shadow-lg ">
                <div className="mb-4 text-center"> 
                  <img src="/public/MH_COCKPIT_LOGO.png" alt="MH_COCKPIT" className='img-fluid w-50' />
                </div>
                <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
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
                  <div className="d-flex justify-content-end align-items-center mb-3">
                 {/*    <div className="form-check">
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
                    </div>*/}
                    <div>
                      <Link to="/forgot-password/" className='link-dark'>Forgot password?</Link>
                    </div>
                  </div>
                  <div>
                    <div className="d-grid">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                         {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Sign in'}
                    </button>
                    </div> 
                    <div className='text-center mt-4'> 
                      <span className='fs-7'> 
                        Copyright © MH Academy Pvt. Ltd. 2024 
                       </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </section>
    </>
  )
}

export default Login