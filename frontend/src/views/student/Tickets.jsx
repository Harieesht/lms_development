import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const Ticket = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [validated, setValidated] = useState(false);  
  const [errors, setErrors] = useState({
    title: false,
    category: false,
    description: false,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateTicket = (e) => {
    e.preventDefault();  

    const newErrors = {
      title: title === "",
      category: category === "",
      description: description === "",
    };
   

    const form = e.currentTarget;
    if (form.checkValidity() === false || Object.values(newErrors).some(error => error)) {
      e.stopPropagation();  
      setErrors(newErrors); 
    } else {
      setTickets([...tickets, { id: Date.now(), title, category, description, status: "Open", date: new Date().toLocaleDateString() }]);
      setTitle("");
      setCategory("");
      setDescription("");
      setAttachment(null);
      handleClose(); 
      setErrors("");   
      setValidated(true);
    }
  
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  return (
    <>
      <section className="section px-2 px-lg-5 py-2">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center my-4">
            <h2 className="fs-4 fw-bold">Your Tickets</h2>
            <button className="btn btn-success btn-sm" onClick={handleShow}>
              + Raise Ticket
            </button>
          </div>
          <div className="my-5">
            <div className="table-responsive">
              <table className="table table-hover table-borderless">
                <thead>
                  <tr>
                    <th scope="col">DATE</th>
                    <th scope="col">TICKET ID</th>
                    <th scope="col">TOPIC</th>
                    <th scope="col">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, index) => (
                    <tr key={index}>
                      <th scope="row">{ticket.date}</th>
                      <td>{ticket.id}</td>
                      <td>{ticket.title}</td>
                      <td>{ticket.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Modal size="lg" show={show} onHide={handleClose} centered>  
          <div>
           <button className="btn btn-danger rounded-0 float-end" onClick={handleClose}><i className="bi bi-x-lg fw-bolder"></i></button> 
          </div> 
        <Modal.Body>
            <div className=""> 
              <h2 className="fs-5 text-center">Create New Ticket</h2> 
            </div>
            <form
              className={`row needs-validation p-4 ${validated ? "was-validated" : ""}`}
              noValidate
              onSubmit={handleCreateTicket}
            >
              <div className="mb-3">
                <label className="form-label" htmlFor="category">
                  Category
                </label>
                <select className="form-select" aria-label="Default select example" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="">-select-</option>
                  <option value="Subjects not assigned">Subjects not assigned</option>
                  <option value="Missing content">Missing content</option>
                  <option value="Technical Query">Technical Query</option>
                  <option value="User Auth">User Auth</option>
                  <option value="Other">Other</option>
                </select> 
                {errors.category && (<div className="invalid-feedback">Please select a category</div>)}
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="title">
                  Ticket Title
                </label>
                <input type="text" className="form-control" id="title" placeholder="Enter Ticket Title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                {errors.title && (<div className="invalid-feedback">Please enter a title</div>)}
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="description">
                  Ticket Description
                </label>
                <textarea className="form-control" id="description" placeholder="Describe your issue..." rows="7" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                {errors.description && (<div className="invalid-feedback">Please enter a description</div>)}              
              </div>
              <div className="upload-wrapper mb-3">  
                <label htmlFor="Attachment" className="form-label mb-2">Upload Attachment</label>
                <label className="uploadFile d-flex justify-content-center align-items-center p-5 rounded-4" htmlFor="Attachment" style={{border:'3px dotted silver'}}> 
                  <i className="bi bi-cloud-upload me-2 fs-3"></i>
                  <span className="filename">{attachment ? attachment.name : "Drag and drop or browse files"}</span>
                  <input type="file" className="form-control d-none" id="Attachment" accept="image/*" onChange={handleFileChange}/> 
                </label> 
              </div>
              <div className="my-3 d-flex align-items-center justify-content-end">
                <button className="btn btn-success me-3" type="submit">
                  Submit
                </button>
                <button className="btn btn-secondary" type="button" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal> 
      </section>
    </>
  );
};

export default Ticket;
