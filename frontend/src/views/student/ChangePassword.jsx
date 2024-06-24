import { useState } from "react"; 
import useAxios from "../../utils/useAxios";

function ChangePassword() {
  const [currentPassword,setCurrentPassword]=useState("")  
  const [newPassword,setNewPassword]=useState("")  
  const [confirmPassword,setConfirmPassword]=useState("")   
  const [error, setError] = useState("");  
  const [success, setSuccess] = useState("");
   
  const handleResetPassword= async(e)=>{ 
     e.preventDefault()
    
     if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      setSuccess("");
      return;
    } 

    const formData = new FormData();
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
 
    try {
      const response = await useAxios().post("/user/password-reset", formData);  
 
      console.log(response.status === 201)
      if (response.status === 201) { 
        setSuccess("Password has been successfully changed.");
        setError("");
      } else {
        setError(response.message || "An error occurred.");
        setSuccess("");
      }
    } catch (error) {
      setError("An error occurred: " + error.message);
      setSuccess("");
    }
  };
     
  
  

  return ( 
    <section className="section px-2 px-lg-5 py-4">
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <div className="card hover-overlay shadow-lg p-4 rounded-4 w-lg-100">
          <div className="p-3"> 
             <h1 className="card-title fs-5 fw-bold">Create new password</h1>
             <span className="fs-7 text-muted">Your new password must be different from previous used passwords.</span>
          </div>
          <div className="card-body"> 
             {error && <div className="alert alert-danger">{error}</div>}
             {success && <div className="alert alert-success">{success}</div>}
              <form className="d-block gx-3 needs-validation" noValidate="">
                <div className="mb-3">
                  <label className="form-label" htmlFor="currentPassword">Current Password</label>
                  <input type="password" id="currentPassword" className="form-control" placeholder="********" required="" onChange={(e)=>setCurrentPassword(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor=" NewPassword" > New Password</label>
                  <input type="password" id="NewPassword" className="form-control" placeholder="********" required="" onChange={(e)=>setNewPassword(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="confirmPassword"> Confirm New Password</label>
                  <input type="password" id="confirmPassword" className="form-control" placeholder="********" required="" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div> 
                <div className="mt-4">
                  <button className="btn btn-primary btn-sm px-3" type="submit" onClick={handleResetPassword}>
                    Save <i class="bi bi-check-circle-fill"></i>
                  </button> 
                </div>
              </form>
            </div>
          </div>
        </div> 
      </section>
  );
}

export default ChangePassword;
