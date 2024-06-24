import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import useAxios from "../../utils/useAxios"; 

function Wishlist() { 
    const [subjects, setSubjects] = useState([]); 
    const [isLoading, setLoading] = useState(true); 
    const [error, setError] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setLoading(false); 
            fetchSubjects();
        }, 500) 
    },[]); 
     
    const fetchSubjects = async () => {
        try {
            const response = await useAxios().get("/user/subject");
            if (response.data && Array.isArray(response.data.subjects)) {
                setSubjects(response.data.subjects);
            } else {
                setError("Invalid data format");
            }
        } catch (error) {
            console.error("Error fetching subjects:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }; 
     

    return (
        <section className='section px-2 px-lg-5 py-4'>
            <div className='container-fluid'>
                <h4 className="mt-4 mb-5 text-center"><i className="bi bi-book-half me-2"></i> My Subjects </h4> 
                {error && <div className="alert alert-danger">{error}</div>}
                <div className='row'>
                    {isLoading ? (
                        Array.from({  length: subjects.length || 8 }).map((_, index) => (
                            <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
                                <div className="card rounded-4" aria-hidden="true"> 
                                    <div className='card-img-top placeholder rounded-top-4' alt="Card"  style={{ height: '170px' }}></div>
                                    <div className="card-body">
                                        <h5 className="card-title placeholder-glow">
                                            <span className="placeholder col-8"></span>
                                        </h5>
                                        <p className="card-text placeholder-glow my-4">
                                            <span className="placeholder col-12 placeholder-xs"></span>
                                            <span className="placeholder col-2"></span>
                                        </p>
                                        <button className="btn btn-primary disabled placeholder col-12" aria-disabled="true"></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        subjects.map(subject => (
                            <div key={subject.id} className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
                                <div className="card rounded-4">
                                    <img src={subject.img} alt="avatar" className="img-fluid card-img-top rounded-top-4" style={{ height: '200px', objectFit: 'cover' }}/>
                                    <div className="card-body">
                                        <h3 className="card-title fs-6" style={{ height: '30px' }}>{subject.title}</h3>
                                        <div className="mt-5">
                                            <div className="progress" style={{ height: '5px', marginBottom:'5px' }}>
                                                <div
                                                    className='progress-bar'
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
                                            {subject.buttontext} continue 
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default Wishlist;
