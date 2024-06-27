import React, { useState ,useEffect ,useRef } from 'react' 
import { Link } from "react-router-dom";  
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player' 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';  
import "./Css/SubjectDetail.css" 
import moment from 'moment'; 
import UserData from '../../views/plugin/UserData.js';
 

import useAxios from '../../utils/useAxios' 


function CourseDetail() {  
   
  const user = UserData();

  if (!user) {
    return <div>No user data available</div>;
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (chapteritem) => {setchapterItem(chapteritem);setShow(true)};   

  const [chapterItem, setchapterItem] = useState([]); 
   
  const [question,setQuestion] = useState("");
  const [questiontitle,setQuestionTitle]=useState("");
  const [questionid,setQuestionID]=useState(-1);
  const [questionsposts,setQuestionPosts] = useState([]); 
   
  const [returnquestions,setReturnQuestions] = useState([]);

  const [noteShow, setNoteShow] = useState(false);
  const handleNoteClose = () => setNoteShow(false);
  const handleNoteShow = () => { setNoteShow(true); }

  const [ConversationShow, setConversationShow] = useState(false);
  const handleConversationClose = () =>  {setConversationShow(false); setQuestionID(-1) }
  const handleConversationShow = () => { setConversationShow(true); } 
   
  const [addQuestionShow, setAddQuestionShow] = useState(false);
  const handleQuestionClose = () => setAddQuestionShow(false);
  const handleQuestionShow = () => setAddQuestionShow(true); 
  
  const [postmessage,setPostMessage] = useState("");

  const [chapter,setChapter]=useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const param=useParams();
   
  const messagesEndRef = useRef(null);
 
  console.log(postmessage)
 
  const handleAddQuestionSubmit = (e) => {   
    e.preventDefault();                                
    handleSaveQuestion(e);
    fetchSubjectQuestions(e);
  }
 

  const fetchChapters = async () => { 
    setLoading(true);
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
   
  const fetchSubjectQuestions =  async () => {

    try{
      const response = await useAxios().get(`user/subject/get_question/${param.id}`);
      console.log(response);
      setReturnQuestions(response.data.questions);  
    }
    catch(error){
      console.log(error);
    }
  }
  

  const handleSaveQuestion = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('title',questiontitle);
    formdata.append('question',question);
    formdata.append('subject_id',param.id)

    try{
      const response = useAxios().post(`user/subject/post_question/`,formdata);
      setAddQuestionShow(false);
      console.log(response)
      
      
    }
    catch(error){
      console.log(error)
    }


  };

  const fetchQuestionAnswers= async (question_id) => {
    try{
    const response = await useAxios().get(`user/subject/get_question_answer/${question_id}`); 
    if (response.status === 404){
      setQuestionPosts([]);
    }
    else if (response.status === 200){
      setQuestionPosts(response.data.answers)
      console.log(response);
    }
    console.log(response);
    }
    catch(error){
      console.log(error);
    }
  }

  const handlePostMessage =async() => { 
    const formdataMessage = new FormData(); 
    formdataMessage.append('question_id',questionid);
    formdataMessage.append('answer',postmessage); 

    try{
    const response = await useAxios().post(`user/subject/post_question_answer/`,formdataMessage);
    console.log(response) 
    fetchQuestionAnswers(questionid);
    
    }
    catch(error){
      console.log(error)
    } 
     
    const time = getCurrentTime();
  }


  useEffect(() => {
    fetchChapters(); 
    fetchSubjectQuestions();
  }, []);  
    
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [questionsposts]); 

  const formatTime = (time) => {
    return moment(time).fromNow();
  };

  return (
    <>
           <section className='px-2 px-lg-5 py-2'>
             <div className="container-fluid mt-4">
                 <div className="rounded-2">
                     <div className="pb-0">
                        <ul className="d-flex justify-content-center align-items-center" id="course-pills-tab" role="tablist">
                            <li className="me-2 me-sm-4">
                              <button className="btn border-0 text-secondary  fw-bold active" id="course-pills-tab-1" data-bs-toggle="pill" data-bs-target="#course-pills-1" type="button" role="tab" aria-controls="course-pills-1" aria-selected="true">
                               LESSION
                              </button>
                            </li>
                            <li className="me-2 me-sm-4">
                              <button className="btn border-0 text-secondary  fw-bold"  id="course-pills-tab-2"  data-bs-toggle="pill"  data-bs-target="#course-pills-2"  type="button"  role="tab"  aria-controls="course-pills-2"  aria-selected="false">
                                NOTES
                              </button>
                            </li>
                            <li className="me-2 me-sm-4">
                              <button className="btn border-0 text-secondary  fw-bold" id="course-pills-tab-3" data-bs-toggle="pill" data-bs-target="#course-pills-3" type="button" role="tab" aria-controls="course-pills-3" aria-selected="false">  
                                DISCUSSION
                              </button>
                            </li>
                        </ul> 
                     </div> 
                 <div className="px-sm-4 pt-sm-0">
                  <div className="tab-content" id="course-pills-tabContent">
                    <div className="tab-pane fade show active"  id="course-pills-1"  role="tabpanel"  aria-labelledby="course-pills-tab-1" > 
                        <div className="accordion accordion-icon accordion-border" id="accordionExample2">
                           <div className="progress mb-4" role="progressbar" aria-label="Animated striped example" aria-valuenow={param.progress} aria-valuemin="0" aria-valuemax="100">
                             <div className="progress-bar placeholder-wave" style={{ width: `${param.progress}%` }}> 
                               {param.progress}%
                             </div>
                           </div>   
                  <div className='d-flex justify-content-center align-items-center'> 
                   {loading && <p style={{marginTop: '150px'}}><i className="fas fa-spinner fa-spin"></i></p>}
                   {error && <p style={{marginTop: '150px'}}>Error: {error.message}</p>}  
                 </div>
                   {chapter.map((item, Index) => (
                      <div className="accordion-item mb-2 border border-2 rounded-3">
                        <h6 className="accordion-header"  id="heading-1">
                             <button className="accordion-button fw-bold rounded d-sm-flex d-inline-block collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${Index}`} aria-expanded="true" aria-controls={`collapse-${Index}`}>  
                               {item.name}
                             </button> 
                        </h6>
                      <div id={`collapse-${Index}`} className="accordion-collapse collapse" aria-labelledby="heading-1" data-bs-parent="#accordionExample2">
                       <div className="accordion-body px-4 px-md-5">
                         {item.items.map((value, itemIndex) => (
                          <div className="d-flex justify-content-between align-items-center my-4 my-sm-3 my-lg-2" key={`item-${itemIndex}`}>  
                           <div className="position-relative d-flex align-items-center justify-content-center">  
                              <div style={{transform: "rotate(90deg)"}} className='me-3'><i className="bi bi-airplane-fill"></i></div>  
                              <span className="fs-6 text-baseline">{value.description}</span> 
                          </div> 
                          <div className="d-flex justify-content-center align-items-center ms-2 ms-md-4 ms-lg-5">  
                            <a  className="" onClick={()=> handleShow(value)}><i className="bi bi-play-circle fs-4"></i></a>
                            <a href={value.ppt} className='ms-3 mx-sm-4'><i className="bi bi-filetype-pdf fs-4"></i></a> 
                           </div>
                          </div>))} 
                          <div className='mt-4 d-flex justify-content-center align-items-center'>
                          <Link to={`/student/quiz/${item.id}`} className='btn btn-secondary btn-sm m-2' >Start Quiz</Link>  
                         </div>
                       </div>
                    </div>
                   </div>))}
                 </div>
               </div>

                            <div className="tab-pane fade" id="course-pills-2" role="tabpanel" aria-labelledby="course-pills-tab-2">
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
                             
                              {/*<form className="row p-3">
                                    <div className="col-sm-6 col-lg-9">
                                      <div className="position-relative">
                                        <input className="form-control pe-5" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
                                          <i className="fas fa-search fs-6 " />
                                        </button>
                                      </div>
                                    </div>  
                                  </form>*/}
                            
                            <div className="tab-pane fade" id="course-pills-3" role="tabpanel" aria-labelledby="course-pills-tab-3">
                              <div className="d-block">
                                <div className="pb-5">
                                    <div className="float-end">
                                       <a onClick={handleQuestionShow} className="btn btn-primary mb-0" data-bs-toggle="modal" data-bs-target="#modalCreatePost">
                                        <i class="bi bi-patch-question-fill pe-2"></i>    
                                         Ask Question 
                                      </a>
                                    </div>
                                </div>
                                <div className="pt-4">   
                                  {returnquestions.map((question,id)=> (
                                  <div className="vstack gap-3 p-1"> 
                                    <div className="card shadow-sm rounded-4 p-1" key={id}> 
                                      <div className='card-body'>
                                      <div className="d-flex justify-content-between mb-3">
                                        <div className="d-flex align-items-center justify-content-center">
                                          <div className="avatar avatar-sm flex-shrink-0 me-2">
                                            <img src={user.user_image} className="avatar-img rounded-circle" alt="avatar" style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }}/>
                                          </div>
                                          <div className="ps-4 vstack mt-3">
                                            <h6 className="fw-bold"><a href="#" className='text-decoration-none text-dark'>{user.username}</a></h6>
                                            <small>Asked 10 Hours ago</small>
                                          </div>
                                        </div>
                                      </div> 
                                      <div className='pt-3'>
                                        <h6>{question?.title}</h6> 
                                      </div>
                                      <button className='btn btn-primary btn-sm my-2' onClick={() => {
                                          fetchQuestionAnswers(question?.id);
                                          setQuestionID(question?.id);
                                          handleConversationShow();
                                      }} >Join Conversation <i className='fas fa-arrow-right'></i></button>
                                    </div> 
                                    </div>
                                  </div>
                                ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

      {/* Lecture Modal */}
      <Modal show={show} size='lg' onHide={handleClose} centered> 
          <div> 
            <button className="btn btn-danger rounded-0 float-end" onClick={handleClose}><i className="bi bi-x-lg fw-bolder"></i></button>  
            <h5 className='fs-6 text-center mt-3'>{chapterItem.description}</h5> 
          </div> 
        <Modal.Body> 
          <div className='py-3'>
          <ReactPlayer url={chapterItem.video}  controls controlsList="nodownload"  playing width={"100%"} height={"100%"}/> 
          </div>
        </Modal.Body>
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

   
      {/* Discussion Edit Modal */}
      <Modal show={ConversationShow} size='lg' onHide={handleConversationClose} centered> 
         <div className=''>  
           <button className="btn btn-danger rounded-0 float-end" onClick={handleConversationClose}><i className="bi bi-x-lg fw-bolder"></i></button> 
           <h2 className="fs-6 fw-bold mt-3 px-4 text-muted">Discussion</h2> 
          </div> 
        <Modal.Body> 
          <div className="" >
            <ul className="list-unstyled mx-2 px-3 border rounded shadow-sm" style={{ overflowY: "scroll", height: "500px"}}>
              <li className="comment-item mb-3">
              {questionsposts.map((post,index) => (
                <div className="d-flex my-4">
                  <div className="avatar avatar-sm flex-shrink-0">
                    <a href="#">
                      <img className="rounded-circle me-" src={user.user_image} style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }} alt="image" />
                    </a>
                  </div>
                  <div className="">
                    <div className="bg-secondary-subtle rounded w-100">
                      <div className="d-block">
                          {/* <h6 className="lead"><a href="#!" className='text-decoration-none text-dark fs-6 fw-bold'> Louis Ferguson </a></h6> */}
                          <div className='py-2 px-3'><small className=''>{post?.answer}</small></div> 
                          <small className='float-end mt-1' style={{ fontSize: "10px", color: "gray" }}>{formatTime(post?.timestamp)}</small>
                      </div>
                    </div>
                  </div>
                </div>
                ))} 
              <div ref={messagesEndRef}/>
              </li>
            </ul> 
            <div className='d-flex align-items-center border shadow-lg rounded-pill m-2 px-2'> 
            <img className="rounded-circle" src={user.user_image} style={{ width: "40px", height: "40px", objectFit: "cover" }} alt="image" />
               <input type="text" name='message' className="one form-control border-0 w-100 m-2" id="autoheighttextarea" placeholder="Type message..." onChange={(e) => {setPostMessage(e.target.value)}}/>
               <a className="text-primary mx-2" onClick={handlePostMessage}><i className='fas fa-paper-plane fs-5'></i></a>
           </div>
          </div>
        </Modal.Body>
      </Modal>   
      
       
       {/* Ask Question Modal */}
      {/* Note Edit Modal */}
      <Modal show={addQuestionShow} size="md" onHide={handleQuestionClose} centered> 
        <div className=''>  
           <button className="btn btn-danger rounded-0 float-end" onClick={handleQuestionClose}><i className="bi bi-x-lg fw-bolder"></i></button> 
           <h2 className="fs-5 fw-bold mt-3 px-4 text-muted text-center">Ask Question</h2> 
        </div> 
        <Modal.Body> 
        <div className='px-2'>
          <form onSubmit={handleAddQuestionSubmit} > 
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Question Title
              </label>
              <input
                name="title"
                onChange={(e) => {setQuestionTitle(e.target.value)}}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Question Message
              </label>
              <textarea
                name="message"
                onChange={(e) => {setQuestion(e.target.value)}}
                className="form-control"
                rows="5"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary float-end">Ask Question</button>
          </form> 
         </div>
        </Modal.Body>
      </Modal>
    </section>
    </>
  )
}

export default CourseDetail
