import React, { useState ,useEffect } from 'react' 
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player' 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
 

import useAxios from '../../utils/useAxios'


function CourseDetail() { 

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (chapteritem) => {setchapterItem(chapteritem);setShow(true)};   
   

  const [chapterItem, setchapterItem] = useState([]); 

  const [noteShow, setNoteShow] = useState(false);
  const handleNoteClose = () => setNoteShow(false);
  const handleNoteShow = () => { setNoteShow(true); }

  const [ConversationShow, setConversationShow] = useState(false);
  const handleConversationClose = () => setConversationShow(false);
  const handleConversationShow = () => { setConversationShow(true); }

  const [chapter,setChapter]=useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const param=useParams()

  // const fetchChapterDetail = async () => {
  //     await useAxios().get(`user/subject/${param.id}`).then((res)=>{
  //       setChapter(res.data)
  //       console.log(res.data);
  //     })
  // }
  const fetchChapters = async () => {
    try {
      const response = await useAxios().get(`/user/subject/${param.id}`);
      if (response.data && Array.isArray(response.data)) {
        console.log(response.data)
        setChapter(response.data);
        console.log(response.data)
      } else {
        setChapter([]);
        
        setError(new Error("Invalid data format"));
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []); 

  return (
    <>
              
             <div className="container-fluid my-4">
                 <div className="card rounded-2 p-0 mt-n5">
                   {/* Tabs START */}
                     <div className="card-header border-bottom px-4 pt-3 pb-0">
                        <ul className="nav nav-bottom-line py-0" id="course-pills-tab" role="tablist">
                            <li className="nav-item me-2 me-sm-4" role="presentation">
                              <button className="nav-link mb-2 mb-md-0 active" id="course-pills-tab-1" data-bs-toggle="pill" data-bs-target="#course-pills-1" type="button" role="tab" aria-controls="course-pills-1" aria-selected="true">
                                Subject units
                              </button>
                            </li>
                            <li className="nav-item me-2 me-sm-4" role="presentation">
                              <button className="nav-link mb-2 mb-md-0"  id="course-pills-tab-2"  data-bs-toggle="pill"  data-bs-target="#course-pills-2"  type="button"  role="tab"  aria-controls="course-pills-2"  aria-selected="false">
                                Notes
                              </button>
                            </li>
                            <li className="nav-item me-2 me-sm-4" role="presentation">
                              <button className="nav-link mb-2 mb-md-0" id="course-pills-tab-3" data-bs-toggle="pill" data-bs-target="#course-pills-3" type="button" role="tab" aria-controls="course-pills-3" aria-selected="false">  
                                Discussion
                              </button>
                            </li>
{/* 
                            <li className="nav-item me-2 me-sm-4" role="presentation">
                              <button className="nav-link mb-2 mb-md-0" id="course-pills-tab-4" data-bs-toggle="pill" data-bs-target="#course-pills-4" type="button" role="tab" aria-controls="course-pills-4" aria-selected="false">
                                Leave a Review
                              </button>
                            </li> */}
                        </ul> 
                     </div>
                   {/* Tabs END */} 
                     

                   {/* Tab contents START */}
                     <div className="card-body p-sm-4">
                        <div className="tab-content" id="course-pills-tabContent">
                         {/* Content START */}
                          <div className="tab-pane fade show active"  id="course-pills-1"  role="tabpanel"  aria-labelledby="course-pills-tab-1" > 
                           {/* Accordion START */}
                            <div className="accordion accordion-icon accordion-border" id="accordionExample2">
                              <div className="progress mb-3">
                                <div className="progress-bar" role="progressbar" style={{ width: `${param.progress}%` }} aria-valuenow={param.progress} aria-valuemin={0} aria-valuemax={100}> 
                                 {param.progress}%
                               </div>
                              </div>
                   {/* Item */}
                   {chapter.map((item, Index) => (
                      <div className="accordion-item mb-3 border border-2 rounded-3">
                        <h6 className="accordion-header font-base"  id="heading-1">
                             <button className="accordion-button fw-bold rounded d-sm-flex d-inline-block collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${Index}`} aria-expanded="true" aria-controls={`collapse-${Index}`}>  
                               {item.name}
                             </button>
                        </h6>
                      <div id={`collapse-${Index}`} className="accordion-collapse collapse" aria-labelledby="heading-1" data-bs-parent="#accordionExample2">
                       <div className="accordion-body mt-3">
                         {/* Course lecture */}
                         {item.items.map((value, itemIndex) => (
                          <div className="d-flex justify-content-between align-items-center" key={`item-${itemIndex}`}> 
                           <div className="position-relative d-flex align-items-center justify-content-center my-2"> 
                             <button onClick={()=> handleShow(value)} className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static"><i className="fas fa-play me-0" /></button>
                              <span className="d-inline-block fs-6 fw-light">
                                {value.description} 
                              </span> 
                          </div> 
                          <div className="d-flex justify-content-center align-items-center"> 
                            <a href={value.ppt} className='btn btn-sm bg-primary text-white px-3 mx-4'>PDF</a> 
                             <input type="checkbox" className="form-check-input me-4 " /> </div>
                          </div>))}
                       {/* <section className="bg-blue py-7">
                         <div className="container">
                           <ReactPlayer url='https://youtu.be/U2Sjl89AR2A?si=nxyMVHrjvMPsoxCM' width={"100%"} height={600} />
                         </div>
                        </section> */}
                       </div>
                    </div>
                   </div>))}
                 </div>
                {/* Accordion END */}
               </div>

                            <div
                              className="tab-pane fade"
                              id="course-pills-2"
                              role="tabpanel"
                              aria-labelledby="course-pills-tab-2"
                            >
                              <div className="card">
                                <div className="card-header border-bottom p-0 pb-3">
                                  <div className="d-sm-flex justify-content-between align-items-center">
                                    <h4 className="mb-0 p-3">All Notes</h4>
                                    {/* Add Note Modal */}
                                    <button type="button" className="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                                      Add Note <i className='fas fa-pen'></i>
                                    </button>
                                    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                      <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">
                                              Add New Note <i className='fas fa-pen'></i>
                                            </h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                          </div>
                                          <div className="modal-body">
                                            <form>
                                              <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                  Note Title
                                                </label>
                                                <input type="text" className="form-control" />
                                              </div>
                                              <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">
                                                  Note Content
                                                </label>
                                                <textarea className='form-control' name="" id="" cols="30" rows="10"></textarea>
                                              </div>
                                              <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal" ><i className='fas fa-arrow-left'></i> Close</button>
                                              <button type="submit" className="btn btn-primary">Save Note <i className='fas fa-check-circle'></i></button>
                                            </form>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-body p-0 pt-3">
                                  {/* Note item start */}
                                  <div className="row g-4 p-3">
                                    <div className="col-sm-11 col-xl-11 shadow p-3 m-3 rounded">
                                      <h5> What is Digital Marketing What is Digital Marketing</h5>
                                      <p>
                                        Arranging rapturous did believe him all had supported.
                                        Supposing so be resolving breakfast am or perfectly.
                                        It drew a hill from me. Valley by oh twenty direct me
                                        so. Departure defective arranging rapturous did
                                        believe him all had supported. Family months lasted
                                        simple set nature vulgar him. Picture for attempt joy
                                        excited ten carried manners talking how. Family months
                                        lasted simple set nature vulgar him. Picture for
                                        attempt joy excited ten carried manners talking how.
                                      </p>
                                      {/* Buttons */}
                                      <div className="hstack gap-3 flex-wrap">
                                        <a onClick={handleNoteShow} className="btn btn-success mb-0">
                                          <i className="bi bi-pencil-square me-2" /> Edit
                                        </a>
                                        <a href="#" className="btn btn-danger mb-0">
                                          <i className="bi bi-trash me-2" /> Delete
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <hr />
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="course-pills-3"
                              role="tabpanel"
                              aria-labelledby="course-pills-tab-3"
                            >
                              <div className="card">
                                {/* Card header */}
                                <div className="card-header border-bottom p-0 pb-3">
                                  {/* Title */}
                                  <h4 className="mb-3 p-3">Discussion</h4>
                                  <form className="row g-4 p-3">
                                    {/* Search */}
                                    <div className="col-sm-6 col-lg-9">
                                      <div className="position-relative">
                                        <input className="form-control pe-5 bg-transparent" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
                                          <i className="fas fa-search fs-6 " />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-3">
                                      <a
                                        href="#"
                                        className="btn btn-primary mb-0 w-100"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalCreatePost"
                                      >
                                        Ask Question
                                      </a>
                                    </div>
                                  </form>
                                </div>
                                {/* Card body */}
                                <div className="card-body p-0 pt-3">
                                  <div className="vstack gap-3 p-3">
                                    {/* Question item START */}
                                    <div className="shadow rounded-3 p-3">
                                      <div className="d-sm-flex justify-content-sm-between mb-3">
                                        <div className="d-flex align-items-center">
                                          <div className="avatar avatar-sm flex-shrink-0">
                                            <img
                                              src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-3.jpg"
                                              className="avatar-img rounded-circle"
                                              alt="avatar"
                                              style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }}
                                            />
                                          </div>
                                          <div className="ms-4">
                                            <h6 className="mb-0">
                                              <a href="#" className='text-decoration-none text-dark'>Angelina Poi</a>
                                            </h6>
                                            <small>Asked 10 Hours ago</small>
                                          </div>
                                        </div>
                                      </div>
                                      <h5>How can i fix this bug?</h5>
                                      <button className='btn btn-primary btn-sm mb-3 mt-3' onClick={handleConversationShow}>Join Conversation <i className='fas fa-arrow-right'></i></button>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div
                              className="tab-pane fade"
                              id="course-pills-4"
                              role="tabpanel"
                              aria-labelledby="course-pills-tab-4"
                            >
                              <div className="card">
                                <div className="card-header border-bottom p-0 pb-3">
                                  <h4 className="mb-3 p-3">Leave a Review</h4>
                                  <div className="mt-2">
                                    <form className="row g-3 p-3">

                                      <div className="col-12 bg-light-input">
                                        <select
                                          id="inputState2"
                                          className="form-select js-choice"
                                        >
                                          <option value={1}>★☆☆☆☆ (1/5)</option>
                                          <option value={2}>★★☆☆☆ (2/5)</option>
                                          <option value={3}>★★★☆☆ (3/5)</option>
                                          <option value={4}>★★★★☆ (4/5)</option>
                                          <option value={5}>★★★★★ (5/5)</option>
                                        </select>
                                      </div>
                                      <div className="col-12 bg-light-input">
                                        <textarea
                                          className="form-control"
                                          id="exampleFormControlTextarea1"
                                          placeholder="Your review"
                                          rows={3}
                                          defaultValue={""}
                                        />
                                      </div>
                                      <div className="col-12">
                                        <button type="submit" className="btn btn-primary mb-0">
                                          Post Review
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>

      {/* Lecture Modal */}
      <Modal show={show} size='lg' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <h5 className='fs-6'>{chapterItem.description}</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body className='px-3'>
          <ReactPlayer url={chapterItem.video}  controls controlsList="nodownload"  playing width={"100%"} height={"100%"}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">Download</Button>
        </Modal.Footer>
      </Modal>


      {/* Note Edit Modal */}
      <Modal show={noteShow} size='lg' onHide={handleNoteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Note: Note Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Note Title</label>
              <input defaultValue={null} name='title' type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Note Content</label>
              <textarea onChange={null} defaultValue={null} name='note' className='form-control' cols="30" rows="10"></textarea>
            </div>
            <button type="button" className="btn btn-secondary me-2" onClick={null}><i className='fas fa-arrow-left'></i> Close</button>
            <button type="submit" className="btn btn-primary">Save Note <i className='fas fa-check-circle'></i></button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Note Edit Modal */}
      <Modal show={ConversationShow} size='lg' onHide={handleConversationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lesson: 123</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border p-2 p-sm-4 rounded-3">
            <ul className="list-unstyled mb-0" style={{ overflowY: "scroll", height: "500px" }}>
              <li className="comment-item mb-3">
                <div className="d-flex">
                  <div className="avatar avatar-sm flex-shrink-0">
                    <a href="#">
                      <img className="avatar-img rounded-circle" src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-3.jpg" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="womans image" />
                    </a>
                  </div>
                  <div className="ms-2">
                    {/* Comment by */}
                    <div className="bg-light p-3 rounded w-100">
                      <div className="d-flex w-100 justify-content-center">
                        <div className="me-2 ">
                          <h6 className="mb-1 lead fw-bold">
                            <a href="#!" className='text-decoration-none text-dark'> Louis Ferguson </a><br />
                            <span style={{ fontSize: "12px", color: "gray" }}>5hrs Ago</span>
                          </h6>
                          <p className="mb-0 mt-3">Removed demands expense account
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </li>

              <li className="comment-item mb-3">
                <div className="d-flex">
                  <div className="avatar avatar-sm flex-shrink-0">
                    <a href="#">
                      <img className="avatar-img rounded-circle" src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-3.jpg" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="womans image" />
                    </a>
                  </div>
                  <div className="ms-2">
                    {/* Comment by */}
                    <div className="bg-light p-3 rounded w-100">
                      <div className="d-flex w-100 justify-content-center">
                        <div className="me-2 ">
                          <h6 className="mb-1 lead fw-bold">
                            <a href="#!" className='text-decoration-none text-dark'> Louis Ferguson </a><br />
                            <span style={{ fontSize: "12px", color: "gray" }}>5hrs Ago</span>
                          </h6>
                          <p className="mb-0 mt-3  ">Removed demands expense account from the debby building in a hall  town tak with
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </li>

              <li className="comment-item mb-3">
                <div className="d-flex">
                  <div className="avatar avatar-sm flex-shrink-0">
                    <a href="#">
                      <img className="avatar-img rounded-circle" src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-3.jpg" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="womans image" />
                    </a>
                  </div>
                  <div className="ms-2">
                    {/* Comment by */}
                    <div className="bg-light p-3 rounded w-100">
                      <div className="d-flex w-100 justify-content-center">
                        <div className="me-2 ">
                          <h6 className="mb-1 lead fw-bold">
                            <a href="#!" className='text-decoration-none text-dark'> Louis Ferguson </a><br />
                            <span style={{ fontSize: "12px", color: "gray" }}>5hrs Ago</span>
                          </h6>
                          <p className="mb-0 mt-3  ">Removed demands expense account
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </li>

              <li className="comment-item mb-3">
                <div className="d-flex">
                  <div className="avatar avatar-sm flex-shrink-0">
                    <a href="#">
                      <img className="avatar-img rounded-circle" src="https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-3.jpg" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="womans image" />
                    </a>
                  </div>
                  <div className="ms-2">
                    {/* Comment by */}
                    <div className="bg-light p-3 rounded w-100">
                      <div className="d-flex w-100 justify-content-center">
                        <div className="me-2 ">
                          <h6 className="mb-1 lead fw-bold">
                            <a href="#!" className='text-decoration-none text-dark'> Louis Ferguson </a><br />
                            <span style={{ fontSize: "12px", color: "gray" }}>5hrs Ago</span>
                          </h6>
                          <p className="mb-0 mt-3  ">Removed demands expense account
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </li>
            </ul>

            <form class="w-100 d-flex">
              <textarea name='message' class="one form-control pe-4 bg-light w-75" id="autoheighttextarea" rows="2" placeholder="What's your question?"></textarea>
              <button class="btn btn-primary ms-2 mb-0 w-25" type="button">Post <i className='fas fa-paper-plane'></i></button>
            </form>

            <form class="w-100">
              <input name='title' type="text" className="form-control mb-2" placeholder='Question Title' />
              <textarea name='message' class="one form-control pe-4 mb-2 bg-light" id="autoheighttextarea" rows="5" placeholder="What's your question?"></textarea>
              <button class="btn btn-primary mb-0 w-25" type="button">Post <i className='fas fa-paper-plane'></i></button>
            </form>

          </div>
        </Modal.Body>
      </Modal> 

    </>
  )
}

export default CourseDetail
