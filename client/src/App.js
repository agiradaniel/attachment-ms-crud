import React, { useEffect, useState } from 'react'
import './App.css';
import Login from './Components/pages/login';
import StudentDashboard from './Components/pages/StudentsDashboard';
import ELogbook from './Components/pages/eLogbook';
import Report from './Components/pages/report';
import Register from './Components/pages/register';
import FieldSupervisorRegister from './Components/pages/fieldSupervisorRegistration';
import FieldSupervisorLogin from './Components/pages/fieldSupervisorLogin';
import FieldSupervisorDashboard from './Components/pages/fieldSupervisorDashboard';
import AcademicSupervisorRegister from './Components/pages/academicSupervisorRegistration';
import AcademicSupervisorLogin from './Components/pages/academicSupervisorLogin';
import AcademicSupervisorDashboard from './Components/pages/academicSupervisorDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './Components/pages/adminLogin';
import AdminDashboard from './Components/pages/adminDashboard';
import AuthContext from './Components/helpers/AuthContext'
import axios from 'axios';
import Test from './Components/pages/test';


function App() {
  
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  })

  useEffect(()=>{
    axios.get("http://localhost:3001/auth/auth", {
      headers: {accessToken: localStorage.getItem("accessToken")}
    }).then((response)=>{
      if(response.data.error){
        setAuthState({...authState, status:false})
      }else{
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true
        })
      }
    })
  },[])

  return (
    
    <div className="app">
     <AuthContext.Provider value={{authState, setAuthState}}>
     <BrowserRouter>
       <div>
         
          <Routes>

            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/StudentDashboard" element={<StudentDashboard/>} />
            <Route path="/ELogbook" element={<ELogbook/>}/>
            <Route path="/Report" element={<Report/>}/>
            <Route path="FieldSupervisorRegistration" element={<FieldSupervisorRegister/>}/>
            <Route path="/FieldSupervisorLogin" element={<FieldSupervisorLogin/>}/>
            <Route path="/FieldSupervisorDashboard" element={<FieldSupervisorDashboard/>}/>
            <Route path="AcademicSupervisorRegistration" element={<AcademicSupervisorRegister/>}/>
            <Route path="/AcademicSupervisorLogin" element={<AcademicSupervisorLogin/>}/>
            <Route path="AcademicSupervisorDashboard" element={<AcademicSupervisorDashboard/>}/>
            <Route path="AdminLogin" element={<AdminLogin/>}/>
            <Route path="AdminDashboard" element={<AdminDashboard/>}/>
          
          </Routes> 
         
        </div>
      </BrowserRouter>
      </AuthContext.Provider> 
    </div> 
    
  );
}

export default App;
