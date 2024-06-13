import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import useAxios from "../../utils/useAxios";

import "./Css/Dashboard.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await useAxios().get("/user/subject");
        if (response.data && Array.isArray(response.data.subjects)) {
          setSubjects(response.data.subjects);
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
    };

    fetchSubjects();
  }, []); 

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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
  return (
    <>
      <Header />
      <section className="pt-4"> 
        <div className="container">
          {/* Header Here */}
          <div className="row mt-0 mt-md-4">
            {/* Sidebar Here */} 
              <Sidebar />
            <div className="col-lg-9 col-md-8 col-12">
              <div className="row mb-4">
                <h4 className="mb-0 mb-4">
                  {" "}
                  <i className="bi bi-grid-fill"></i> Dashboard
                </h4>
                {/* Counter item */}

                <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
                  <div className="d-flex justify-content-center align-items-center p-4 bg-warning bg-opacity-10 rounded-3">
                    <span className="display-6 lh-1 text-orange mb-0">
                      <i className="fas fa-tv fa-fw" />
                    </span>
                    <div className="ms-4">
                      <div className="d-flex">
                        <h5 className="purecounter mb-0 fw-bold">4</h5>
                      </div>
                      <p className="mb-0 h6 fw-light">Total Courses</p>
                    </div>
                  </div>
                </div>
                {/* Counter item */}
                <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
                  <div className="d-flex justify-content-center align-items-center p-4 bg-danger bg-opacity-10 rounded-3">
                    <span className="display-6 lh-1 text-purple mb-0">
                      <i className="fas fa-clipboard-check fa-fw" />
                    </span>
                    <div className="ms-4">
                      <div className="d-flex">
                        <h5 className="purecounter mb-0 fw-bold"> 0</h5>
                      </div>
                      <p className="mb-0 h6 fw-light">Complete lessons</p>
                    </div>
                  </div>
                </div>
                {/* Counter item */}
                <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
                  <div className="d-flex justify-content-center align-items-center p-4 bg-success bg-opacity-10 rounded-3">
                    <span className="display-6 lh-1 text-success mb-0">
                      <i className="fas fa-medal fa-fw" />
                    </span>
                    <div className="ms-4">
                      <div className="d-flex">
                        <h5 className="purecounter mb-0 fw-bold"> 0</h5>
                      </div>
                      <p className="mb-0 h6 fw-light">Achieved Certificates</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-wrapper">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                <h4 className="mb-0 mb-4">
                  {" "}
                  <i className="bi bi-grid-fill"></i> Subjects
                </h4>
                <div className="card-container">
                  <Slider {...settings}>
                    {subjects.map((subject, index) => (
                      <div className="card rounded-4" key={index}>
                        <img
                          src={subject.img}
                          className="img-fluid card-img-top rounded-top-4"
                          alt={subject.title}
                        />
                        <div className="card-body bg-primary bg-gradient bg-opacity-10 rounded-bottom-4">
                          <h5 className="card-title fs-6">{subject.title}</h5>
                          <div className="mt-5">
                            <div className="progress h-50">
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
                            to={`/student/course-detail/${subject.id}`}
                          >
                            {" "}
                            {subject.buttontext} continue
                          </Link>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



export default Dashboard;
