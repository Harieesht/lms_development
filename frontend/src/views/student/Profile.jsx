import React, { useState } from 'react';

const Profile = () => {
    const [formData, setFormData] = useState({
        username: 'Murali',
        firstName: 'Muralivijay',
        lastName: 'Muralivijay',
        email: 'Murali@mail.com',
        phone: '9626659448',
        birthday: 'May 3, 1995',
        addressLine1: '',
        addressLine2: '',
        state: 'Canada',
        country: 'Canada',
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

    return (
        <div className="container-fluid my-4 px-2 px-sm-4 px-xxl-5">
            <div className="card shadow-lg p-3">
                <div className="card-body media d-flex align-items-center justify-content-between mb-4">  
                  <div><h1 >{formData.username}</h1></div>  
                  <div>
                    <div className="media-body text-end ml-4">
                        <label className="me-3 btn btn-outline-primary btn-sm">
                            Update
                            <input type="file" className="account-settings-fileinput" />
                        </label>
                        <button type="button" className="btn btn-default btn-sm">Delete</button>
                        <div className="text-dark small mt-3">Allowed JPG or PNG. Max size of 800K</div>
                    </div> 
                    <img src="/public/student.jpg" alt="" className="ms-4 rounded-3" style={{ width: '100px', height: '100px' }} /> 
                  </div>
                </div>
                <hr className="border-dark m-0" />
                <div className="card-body mt-3">
                    <h4>Personal Details</h4>
                    <p className="mb-4">Edit your personal information and address.</p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                />
                            </div>
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
                                <label className="form-label">Birthday</label>
                                <input
                                    type="text"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">Address Line 1</label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    value={formData.addressLine1}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">Address Line 2</label>
                                <input
                                    type="text"
                                    name="addressLine2"
                                    value={formData.addressLine2}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                />
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">State</label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                >
                                    <option>USA</option>
                                    <option>Canada</option>
                                    <option>UK</option>
                                    <option>Germany</option>
                                    <option>France</option>
                                </select>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label className="form-label">Country</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                >
                                    <option>USA</option>
                                    <option>Canada</option>
                                    <option>UK</option>
                                    <option>Germany</option>
                                    <option>France</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-end mt-5">
                           <button type="button" className="btn btn-primary">Save changes</button>&nbsp;
                           <button type="button" className="btn btn-default">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
