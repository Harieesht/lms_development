import {Route,Routes,BrowserRouter} from 'react-router-dom'
import MainWrapper from './layouts/MainWrapper'
import PrivateRoute from './layouts/PrivateRoute'
import Register from '../src/views/auth/Register'
import Login from '../src/views/auth/Login'   
import Logout from '../src/views/auth/Logout'   
import ForgotPassword from '../src/views/auth/ForgotPassword'   
import CreateNewPassword from '../src/views/auth/CreateNewPassword'  
 
//base Pages
 
import Index from "./views/base/Index";
import CourseDetail from "./views/base/CourseDetail";
import Cart from "./views/base/Cart";
import Checkout from "./views/base/Checkout";
import Success from "./views/base/Success";
import Search from "./views/base/Search";
 
//Student Pages 
import StudentLayout from './views/student/layout/StudentLayout';
import StudentDashboard from './views/student/Dashboard' 
import StudentChangePassword from './views/student/ChangePassword' 
import StudentCourseDetail from './views/student/CourseDetail' 
import StudentCourse from './views/student/Courses' 
import StudentProfile from './views/student/Profile' 
import StudentQA from './views/student/QA'  
import StudentQuiz from './views/student/Quiz'  
import StudentTicket from './views/student/Tickets'
import StudentQADetail from './views/student/QADetail' 
import StudentCourseLectureDetail from './views/student/StudentCourseLectureDetail' 
import StudentWishlist from './views/student/Wishlist' 
  

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

          {/* Base Routes */} 
          {/* <Route path="/" element={<Index />} />
          <Route path="/course-detail/:slug/" element={<CourseDetail />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/checkout/:order_oid/" element={<Checkout />} />
          <Route path="/payment-success/:order_oid/" element={<Success />}/>
          <Route path="/search/" element={<Search />} /> */}
            
      
          {/* Student Routes */} 
          <Route path='/student' element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />   
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="courses/" element={<StudentCourse/>} />
            <Route path="course-detail/:id/:progress" element={<StudentCourseDetail/>} />
            <Route path="Profile/" element={<StudentProfile/>} />
            <Route path="wishlist/" element={<StudentWishlist/>} />   
            <Route path="change-password/" element={<StudentChangePassword/>} />   
            <Route path='question-answer/' element={<StudentQA/>} /> 
            <Route path='qa-deatails/' element={<StudentQADetail/>} /> 
            <Route path='lecture-details/' element={<StudentCourseLectureDetail/>} /> 
            <Route path='quiz/:chapterid' element={<StudentQuiz/>} /> 
            <Route path='ticket/' element={<StudentTicket/>} />
          </Route>
        </Routes> 
      </MainWrapper> 
    </BrowserRouter>
  )
}

export default App
