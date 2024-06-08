import React from 'react'

function Header() {
    return ( 
     <nav className='bg-dark text-white'> 
        <div className="">
            <div className="">
                <div className="px-3 px-lg-5 py-3 shadow-sm">
                    <div className="d-flex align-items-center justify-content-between"> 
                       <div> 
                          <img src="/public/MH_COCKPIT_LOGO.png" alt="MH" width="180" class="d-inline-block img-fluid"/>
                       </div>
                        <div className="d-flex align-items-center"> 
                            <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                                <img src="/public/student.jpg" className="avatar-xl rounded-circle border border-2 border-white" alt="avatar" style={{ width: "55px", height: "55px", borderRadius: "50%", objectFit: "cover" }} />
                            </div>
                            <div className="lh-1">
                                <h5 className="mb-1"> student name</h5>
                                <p className="mb-0 d-block">@desphixs</p>
                            </div>
                        </div>
                        {/* <div>
                            <a href="profile-edit.html" className="btn btn-primary btn-sm d-none d-md-block" >
                                Account Setting <i className='fas fa-gear fa-spin'></i>
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </div> 
      </nav>
    )
}

export default Header