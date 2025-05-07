import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    
    const currency = import.meta.env.VITE_CURRENCY;
    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([])

    const navigate = useNavigate();

    //Fetch courses
    const fetchAllCourses = async() => {
            setAllCourses(dummyCourses);    
    }

    //Function to calculate average rating of course 

    const calculateRating = (course) => {
        if(course.courseRatings?.length == 0) {
            return 0;
        }
        return course.courseRatings.reduce((acc,course) => acc + course.rating,0)/course.courseRatings.length;
    }

    // Function to calculate course chapter time

    const calculateChapterTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
    }

    //Function to calculate course duration
    const calculateCourseDuration = (course) => {
            let time = 0;
            course.courseContent.map((chapter) => time += chapter.chapterContent.reduce((acc, lecture) => acc + lecture.lectureDuration, 0))
            return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
    }

    //Function to calculate no of lectures in the chapter
    const calculateNoOfLectures = (course) => {
        let totalLectures = 0
        course.courseContent.forEach(chapter => {
            if(Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length;
            }
        })
        return totalLectures;
    }

    // Fetch user enrolled courses

    const fetchEnrolledCourses = async() =>  {
            setEnrolledCourses(dummyCourses)
    }


    useEffect(() => {
        fetchAllCourses();
        fetchEnrolledCourses();
    },[])


    const value = {
          currency, allCourses,navigate,calculateRating,isEducator,setIsEducator,calculateNoOfLectures,calculateCourseDuration,calculateChapterTime,enrolledCourses,fetchEnrolledCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}