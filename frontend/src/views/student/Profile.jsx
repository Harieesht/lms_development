import React, { useState } from 'react';

const Profile = () => {
    const [formData, setFormData] = useState({
        username: 'Murali',
        firstName: 'Muralivijay',
        lastName: 'Muralivijay',
        email: 'Murali@mail.com',
        phone: '9626659448',
        birthday: 'May 3, 1995',
        address: 'knfnnbtrbnrtnbn',
        gender: 'Male', 
        state: 'Tamilnadu',
        country: 'India',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form submitted', formData);
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        let validationErrors = {};
        if (!formData.email.includes('@')) {
            validationErrors.email = 'Invalid email address';
        }
        if (formData.phone.length < 10) {
            validationErrors.phone = 'Phone number must be at least 10 digits';
        }
        return validationErrors;
    }; 
     
    const [activeSelect, setActiveSelect] = useState(null);

    const handleSelectClick = (index) => {
        setActiveSelect(index);
    };

    const handleBlur = () => {
        setActiveSelect(null);
    };
    

    return ( 
    <section className="section px-2 px-lg-5 py-4">
        <div className="container-fluid">
            <div className="card shadow-lg py-3 px-2 px-lg-5">
                <div className="row card-body media d-flex align-items-center justify-content-between mb-4">  
                  <div className='col'><h1 className='fw-bold fs-3'>Welcome ,back <br/><span className='text-success'>{formData.username}!</span></h1></div>  
                  <div className='col d-flex align-items-center justify-content-end'>
                    <div className="media-body text-end ml-4">
                        <label className="me-2 btn btn-outline-primary btn-sm">
                            Update<input type="file" className="d-none"/>
                        </label>
                        <button type="button" className="btn btn-outline-secondary btn-sm">Delete</button>
                        <div className="small mt-2">Allowed JPG or PNG. Max size of 800K</div>
                    </div> 
                    <img src="/public/student.jpg" alt="" className="ms-3 rounded-circle" style={{ width: '120px', height: '120px' }} /> 
                  </div>
                </div>
                <hr className="m-0" />
                <div className="card-body mt-3">
                    <h4>Personal Details</h4>
                    <p className="mb-5">Edit your personal information and address.</p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`form-control mb-3 ${errors.email ? 'is-invalid' : ''}`}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`form-control mb-3 ${errors.phone ? 'is-invalid' : ''}`}
                                />
                                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">Date of Birth</label>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                />
                            </div> 
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">Gender</label> 
                                <div className="select-wrapper">
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange} 
                                    onClick={() => handleSelectClick(1)}
                                    onBlur={handleBlur}
                                    className="form-control mb-3">
                                    <option>Select gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>  
                                <i className={`fas fa-chevron-down select-icon ${activeSelect === 1 ? 'rotate' : ''}`}></i> 
                               </div>
                            </div>
                            <div className="form-group col-12">
                                <label className="form-label">Address</label>
                                 <textarea className="form-control mb-3" rows="5" name='address'  value={formData.address} onChange={handleChange}> 
                                 </textarea>
                             </div> 
                             <div className="form-group col-12 col-md-6">
                                <label className="form-label">State</label> 
                                <div className="select-wrapper">
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}  
                                    onClick={() => handleSelectClick(2)}
                                    onBlur={handleBlur}
                                    className="form-control mb-3">
                                    <option>Select state</option>
                                    <option>Tamilnadu</option>
                                    <option>UK</option>
                                    <option>Germany</option>
                                    <option>France</option>
                                </select> 
                                <i className={`fas fa-chevron-down select-icon ${activeSelect === 2 ? 'rotate' : ''}`}></i>  
                                </div>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">Country</label> 
                                <div className="select-wrapper">
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange} 
                                    onClick={() => handleSelectClick(3)}
                                    onBlur={() => setActiveSelect(false)}
                                    className="form-control mb-3">
                                    <option>Select country</option>
                                    <option>India</option>
                                    <option>UK</option>
                                    <option>Germany</option>
                                    <option>France</option>
                                </select>  
                                <i className={`fas fa-chevron-down select-icon ${activeSelect === 3 ? 'rotate' : ''}`}></i>  
                              </div>
                            </div>
                        </div>
                        <div className="text-end mt-4">
                           <button type="button" className="btn btn-primary me-2">Save changes</button>&nbsp;
                           <button type="button" className="btn btn-secondary">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
     </section>
    );
};

export default Profile;
