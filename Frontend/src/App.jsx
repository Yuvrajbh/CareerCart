import React, { useContext, useEffect } from 'react'
import "./App.css"
import axios from "axios"
import { Context } from './main'
import { Toaster } from "react-hot-toast"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Home from './components/Home/Home'
import Jobs from './components/Job/Jobs'
import JobDetails from './components/Job/JobDetails'
import PostJob from './components/Job/PostJob'
import MyJobs from './components/Job/MyJobs'
import MyApplications from './components/Application/MyApplications'
import Application from './components/Application/Application'
import Footer from './components/Layout/Footer'
import Navbar from './components/Layout/Navbar'
import NotFound from './components/NotFound/NotFound'

const App = () => {

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("", { withCredentials: true })
        setIsAuthorized(true)
        setUser(response.data.user)
      } catch (error) {
        setIsAuthorized(false)
      }
    }
    fetchUser()
  }, [isAuthorized])
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login></Login>} />
        <Route path='/register' element={<Register></Register>} />
        <Route path='/' element={<Home></Home>} />
        <Route path='/job/getall' element={<Jobs></Jobs>} />
        <Route path='/job/:id' element={<JobDetails></JobDetails>} />
        <Route path='/job/post' element={<PostJob></PostJob>} />
        <Route path='/job/me' element={<MyJobs></MyJobs>} />
        <Route path='/application/me' element={<MyApplications></MyApplications>} />
        <Route path='/application/:id' element={<Application></Application>} />
        <Route path='/application/me' element={<MyApplications></MyApplications>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  )
}

export default App
