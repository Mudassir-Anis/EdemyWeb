import React from "react";
import Home from "./Pages/student/Home";
import { Route, Routes, useMatch } from "react-router-dom";
import CoursesList from "./Pages/student/CoursesList";
import MyEnrolments from "./Pages/student/MyEnrolments";
import CourseDetails from "./Pages/student/CourseDetails";
import Player from "./Pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./Pages/educator/Educator";
import AddCourse from "./Pages/educator/AddCourse";
import StudentsEnrolled from "./Pages/educator/StudentsEnrolled";
import MyCourses from "./Pages/educator/MyCourses";
import Dashboard from "./Pages/educator/Dashboard";
import Navbar from "./components/student/Navbar";
import "quill/dist/quill.snow.css";
import { ToastContainer } from 'react-toastify';

const App = () => {
  const isEducatorRoute = useMatch("/educator/*");

  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer/>
      {!isEducatorRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrolments" element={<MyEnrolments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/educator" element={<Educator />}>
          <Route path="/educator" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
          <Route path="add-course" element={<AddCourse />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
