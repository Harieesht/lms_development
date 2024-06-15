import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import useAxios from "../../utils/useAxios";

// import "./Css/Dashboard.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
 
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
  const [loading, setLoading] = useState(true);  
  const [isScrolling, setIsScrolling] = useState(false); 
   
  const handleMouseOver = () => {
    setIsScrolling(true);
  };

  const handleMouseOut = () => {
    setIsScrolling(false);
  };
   
  useEffect(() => {
    const fetchSubjects = async () => {
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

    fetchSubjects();
  }, []); 

    
  const settings = {
     dots: false,
     infinite: false,
     speed: 500,
     slidesToShow: 4,
     slidesToScroll: 1,
     arrows: true,
     responsive: [
       {
         breakpoint: 1024,
         settings: {
           slidesToShow: 3,
           slidesToScroll: 1,
         },
       },
       {
         breakpoint: 768,
         settings: {
           slidesToShow: 2,
           slidesToScroll: 1,
         },
       },
       {
         breakpoint: 480,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
         },
       },
     ], 
   };  
    
  const options = {
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
          color: 'rgba(0, 0, 0, 0.1)',
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
          stepSize: 10, 
          fontColor: '#333',  
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 3,
        borderWidth: 0.7,
      },
    }, 
  }; 
   
  const labels = subjectTitle 
   
  const data = {
    labels,
    datasets: [ 
      { 
        label: 'Total Progress',
        data: subjectProgress,
        backgroundColor: 'rgba(0, 123, 255, 0.8)', 
      },
      {
        label: 'Quiz Mark',
        data: [11,18,29,30,50],
        backgroundColor: 'rgba(220, 53, 69, 0.8)',
      }, 
    ],
  }; 
    
 return ( 
     <>  
       <div class="container-fluid px-2 px-sm-4 px-xxl-5"> 
          <h4 className="my-4"><i class="bi bi-grid-1x2-fill fs-5 pe-2"></i>Dashboard</h4>
          <div class="row">  
               <div className="col-12 col-xl-8 mb-4"> 
                   <div class="card border-0 shadow-sm w-100 h-100"> 
                      <div className="card-body d-flex align-items-center justify-content-center">
                        <Bar options={options} data={data}/> 
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
                     </div>  
                     <div class="col-12 col-sm-6 col-xl-12  d-flex">
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
                       </div>
                   </div> 
                </div>  
             </div>   
          </div>   
          <div className="container-fluid card-container px-2 px-sm-4 px-xxl-5"> 
               <h4 className="my-4"><i class="bi bi-book-half pe-2"></i>My Subjects</h4>
              <div>
                {loading && <p><i className="fas fa-spinner fa-spin"></i></p>}
                {error && <p>Error: {error.message}</p>} 
              </div>
               <Slider {...settings}>
                 {subjects.map((subject, index) => (  
                   <div className="card px-2" key={index}> 
                     <img src={subject.img} className="img-fluid card-img-top rounded-top-3" alt={subject.title} style={{ width: "100%", height: "200px", objectFit: "cover",}}/> 
                     <div className="card-body shadow-sm rounded-bottom-3">
                       <h5 className='card-title fs-6' style={{height: '25px'}}>{subject.title}</h5>
                       <div className="mt-5">
                         <div className="progress" style={{height: '8px' , marginBottom:'5px'}}>
                           <div
                             className="progress-bar"
                             role="progressbar"
                             style={{ width: `${subject.progress}%` }}
                             aria-valuenow={subject.progress}
                             aria-valuemin="0"
                             aria-valuemax="100"
                           ></div>
                         </div>
                         {subject.progress}%
                       </div>
                       <Link
                         className="btn btn-primary mt-3 w-100"
                         to={`/student/course-detail/${subject.id}/${subject.progress}`}
                       >
                         {" "}
                         {subject.buttontext} 
                         continue
                       </Link>
                     </div>
                   </div> 
                ))}
               </Slider>
          </div> 
     </>
 );
}

export default Dashboard;
