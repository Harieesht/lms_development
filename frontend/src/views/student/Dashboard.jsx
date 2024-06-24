import React, { useEffect, useState ,useRef} from "react";
import { Link } from "react-router-dom"; 
import useAxios from "../../utils/useAxios"; 

import "./Css/Dashboard.css";
import Swiper from 'swiper'; 
import { Navigation} from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
Swiper.use([Navigation]); 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);  
 
 
function Dashboard() {       
  const [subjects, setSubjects] = useState([]); 
  const [subjectTitle, setSubjectTitle] = useState([]); 
  const [subjectProgress, setSubjectProgress] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [hasAnimated, setHasAnimated] = useState(false); 
   
  useEffect(() => {
    setHasAnimated(true); 
    fetchSubjects();
  }, []);

  
  const fetchSubjects = async () => {  
    setLoading(true);
    try {
      const response = await useAxios().get("/user/subject");
      if (response.data && Array.isArray(response.data.subjects)) {
        setSubjects(response.data.subjects);
        
        const subjectTitlelocal = response.data.subjects.map(subject => subject.title);
        const subjectProgresslocal = response.data.subjects.map(subject => subject.progress);

        setSubjectTitle(subjectTitlelocal);
        setSubjectProgress(subjectProgresslocal);
      } else {
        setSubjects([]);
        setError(new Error("Invalid data format"));
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setError(error);
    } finally {
      setLoading(false); 
    }  
  }
    
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        loop: false,
        spaceBetween: 25,
        grabCursor: true, 

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        }, 

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }, 

        breakpoints: { 
          0: {
            slidesPerView: 1,
            touchRatio: 1,
          },
          600: {
            slidesPerView: 2, 
            touchRatio: 0,
          },
          968: {
            slidesPerView: 3, 
            touchRatio: 0,
          },  
          1200:{ 
            slidesPerView: 4, 
            touchRatio: 0,
          } 
        },
      }); 
    }
  }, []);  
   
    
  const options = {  
    maintainAspectRatio: false, 
    legend: {display: false},
    responsive: true,  
    plugins: {
      legend: { 
        display: true,
        position: 'top',  
        align: 'center',
        labels: {
           font: {
              weight: 'bold'
           }, 
        }
      },  
    },  
     
    scales: { 
      x: { 
        grid: {
          display: false,
        },
        ticks: {
          fontColor: '#333',  
          font: {
            size: 8, 
          },
        },
      },
      y: {   
        beginAtZero: true, 
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20, 
          fontColor: '#333',  
        },
        grid: { 
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 2,
        borderWidth: 0.7,
      },
    },   
    animation: {
      duration: 800,
      easing: 'linear', 
    }, 
   
  };  
    
   
  const data = {
    labels: subjectTitle,
    datasets: [ 
      { 
        label: 'Total Progress',
        data: subjectProgress,
        backgroundColor: 'rgba(0, 123, 255, 0.9)',  
        borderWidth: 2,  

      },
      {
        label: 'Quiz Mark', 
        data: [11,18,29,30,50],
        backgroundColor: 'rgba(220, 53, 69, 0.9)',  
        borderWidth: 2, 
      }, 
    ],
  }; 
    
 return ( 
     <>   
      <section className="section px-2 px-lg-5 py-4">
       <div class="container-fluid"> 
          <h4 className="my-4"><i class="bi bi-grid-1x2-fill fs-5 pe-2"></i>Dashboard</h4>
          <div class="row">  
               <div className="d-none d-lg-block col-12 col-xl-8"> 
                   <div class="card border-0 shadow-sm">  
                      <div className="card-body">
                        <Bar options={options} data={data} style={{width:"100%", maxWidth:"1200px" , height:'280px'}} /> 
                      </div>
                   </div>
                </div> 
                  <div className="col-12 col-xl-4"> 
                    <div className="row">
                     <div class="col-12 col-sm-6 col-xl-12 d-flex">
                         <div class="card flex-fill border-0 shadow-sm illustration">
                             <div class="card-body p-0 d-flex flex-fill">
                                 <div class="row g-0 w-100">
                                     <div class="col-6 flex-grow-1">
                                         <div class="p-3 m-1">
                                             <h4>Welcome Back, student1</h4>
                                             <p class="mb-0">B.S.c Aviation</p>
                                         </div>
                                     </div>
                                     <div class="col-6 align-self-end text-end">
                                         <img src="/public/student.jpg" class="img-fluid illustration-img" alt="" />
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div class="col-12 col-sm-6 col-xl-12 d-flex">
                         <div class="card flex-fill border-0 shadow-sm">
                             <div class="card-body py-4">
                                 <div class="d-flex align-items-start">
                                     <div class="flex-grow-1">
                                         <h4 class="mb-2">
                                             0
                                         </h4>
                                         <p class="mb-2">
                                             Total Subjects
                                         </p>
                                         <div class="mb-0">
                                             <span class="text-muted">
                                                 Since Last Month
                                             </span>
                                         </div> 
                                     </div> 

                                 </div>
                             </div>
                         </div> 
                     </div>  
                     {/* <div class="col-12 col-sm-6 col-xl-12  d-flex">
                         <div class="card flex-fill border-0 shadow-sm">
                             <div class="card-body py-4">
                                 <div class="d-flex align-items-start">
                                     <div class="flex-grow-1">
                                         <h4 class="mb-2">
                                             0
                                         </h4>
                                         <p class="mb-2">
                                             Total Course
                                         </p>
                                         <div class="mb-0">
                                             <span class="text-muted">
                                                 Since Last Month
                                             </span>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>  
                       </div> */}
                   </div> 
                </div>  
             </div>   
             <h4 className="my-4"><i class="bi bi-book-half pe-2"></i>My Subjects</h4> 
              <div className='d-flex justify-content-center align-items-center'> 
                 {loading && <p style={{marginTop: '100px'}}><i className="fas fa-spinner fa-spin"></i></p>}
                 {error && <p style={{marginTop: '100px'}}>Error: {error.message}</p>} 
              </div> 
             <div className="d-flex aligan-items-center justify-content-center">
              <div className="card-container swiper">  
                <div className="card-content" ref={swiperRef}>
                 <div className="swiper-wrapper">
                          {subjects.map((subject) => (
                            <div key={subject.id} className="card card-box swiper-slide">
                                <img src={subject.img} alt="avatar" className="img-fluid card-img-top" style={{ height: '200px', objectFit: 'cover' }}/>
                              <div className="card-body">
                                  <h3 className="card-title fs-6" style={{ height: '30px' }}>{subject.title}</h3>
                                     <div className="mt-5">
                                         <div className="progress" style={{height: '5px' , marginBottom:'5px'}}>
                                            <div
                                               className={`progress-bar ${hasAnimated ? 'animate' : ''}`}
                                               role="progressbar"
                                               style={{ width: `${subject.progress}%` }}
                                               aria-valuenow={subject.progress}
                                               aria-valuemin="0"
                                               aria-valuemax="100"> 
                                             </div> 
                                          </div> 
                                           {subject.progress}%
                                        </div>
                               <Link className="btn btn-primary mt-3 w-100" to={`/student/course-detail/${subject.id}/${subject.progress}`}>  
                                 {subject.buttontext}continue 
                               </Link>
                              </div>
                            </div>
                          ))}
                       </div>  
                    </div>
                      <div className="swiper-button-next">
                      <i class="bi bi-arrow-right-circle"></i>
                      </div>
                      <div className="swiper-button-prev">
                      <i class="bi bi-arrow-left-circle"></i>
                      </div>
                  </div>   
                </div>
              </div>
         </section>
     </>
 );
}

export default Dashboard;
