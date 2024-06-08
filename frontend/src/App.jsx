import {Route,Routes,BrowserRouter} from 'react-router-dom'
import MainWrapper from './layouts/MainWrapper'
import PrivateRoute from './layouts/PrivateRoute'
import Register from '../src/views/auth/Register'
import Login from '../src/views/auth/Login'   
import Logout from '../src/views/auth/Logout'   
import ForgotPassword from '../src/views/auth/ForgotPassword'   
import CreateNewPassword from '../src/views/auth/CreateNewPassword'  
 
import index from '../src/views/base/Index' 
 
//Student Pages
import StudentDashboard from './views/student/Dashboard' 
import StudentChangePassword from './views/student/ChangePassword' 
import StudentCourseDetail from './views/student/CourseDetail' 
import StudentCourse from './views/student/Courses' 
import StudentProfile from './views/student/Profile' 
import StudentQA from './views/student/QA' 
import StudentQADetail from './views/student/QADetail' 
import StudentStudentCourseLectureDetail from './views/student/StudentCourseLectureDetail' 
import StudentWishlist from './views/student/Wishlist' 
 
//Instrutor Pages  
import InstructorDashboard from './views/instructor/Dashboard';
 

import 'bootstrap/dist/css/bootstrap.min.css';    

function App() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route path="/register/"  element={<Register />}  />
          <Route path="/login/"  element={<Login />}  />   
          <Route path="/logout/"  element={<Logout />}  />  
          <Route path="/forgot-password/"  element={<ForgotPassword />}  /> 
          <Route path="/create-new-password/"  element={<CreateNewPassword />}  />


          <Route path='/' element={<index/>} />
            
         <Route>
          {/* Student Routes */}
          <Route path="/student/Dashboard/"  element={<StudentDashboard />} /> 
          <Route path="/student/change-password/" element={<StudentChangePassword/>}></Route>
          <Route path="/student/course-detail/:id" element={<StudentCourseDetail/>}></Route>
          <Route path="/student/courses/" element={<StudentCourse/>}></Route>
          <Route path="/student/Profile/" element={<StudentProfile/>}></Route>
          <Route path="/student/question-answer/" element={<StudentQA/>}></Route>
          <Route path="/student/QADetail/" element={<StudentQADetail/>}></Route> 
          <Route path="/student/student-course-lectur-detail/" element={<StudentStudentCourseLectureDetail/>}></Route> 
          <Route path="/student/wishlist/" element={<StudentWishlist/>}></Route> 
           
           {/* Instructor Routes */} 
          <Route path="/instructor/dashboard/"  element={<InstructorDashboard />} />   
         </Route> 
        </Routes> 
      </MainWrapper> 
    </BrowserRouter>
  )
}

export default App
