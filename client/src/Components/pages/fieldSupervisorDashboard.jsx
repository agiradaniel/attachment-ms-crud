import React, { useState, useEffect, useContext } from 'react';
import Banner from '../Images/dashboard-banner.jpg';
import FsNavbar from "../inc/FsNavbar"
import StudentModal from '../inc/studentModal';
import Table from 'react-bootstrap/Table';
import { FidgetSpinner } from  'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import AuthContext from '../helpers/AuthContext';

import { Button } from 'react-bootstrap';
//import SettingsModalFd from '../inc/settingsModalFd';

const FieldSupervisorDashboard = () => {
  
    const navigate = useNavigate();
    const {authState} = useContext(AuthContext);

    const [stuList, setStuList] = useState([]);
    const [supervisorList, setSupervisorList] = useState([]);
    let number = 1;
    const [isLoading, setIsLoading] = useState(true);
    const [modalStatus, setModalStatus] = useState(false);
    let approval;

   /* useEffect(() => {
      if(!user || user.displayName !== "Field Supervisor" && user.displayName !== null){
        navigate("/");
      }
    },[]);*/ 
    useEffect(() => {
      if(authState.status == false){
        navigate("/fieldsupervisorlogin");
      }
    },[]);

    useEffect(()=>{
      const fetchData = async()=>{
        const response = await axios.post('http://localhost:3001/fieldsupervisor/details', {id: authState.id})
            setSupervisorList(response.data)
        }

      const fetchStudentData = async() =>{
        const response = await axios.post("http://localhost:3001/fieldsupervisor/studentdata", {fsupervisorid: authState.id})
        setStuList(response.data);
      }

      fetchData();
      fetchStudentData();
     
    },[])


      useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
          setModalStatus(true)
        }, 1000);
        return () => clearTimeout(timer);
      }, []);

  
    return (
    <div>
        <div className='banner' style={{backgroundImage: `url(${Banner})`}}>
               <h1 className='text-center text-white' style={{paddingTop:'60px'}}>Field Supervisor Dashboard</h1>
        </div>

        <FsNavbar/>
       
        {!isLoading ? 
            <div style={{height:"660px", textAlign:"center"}}>
                <div style={{marginTop:"200px"}}>
                <FidgetSpinner
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
                ballColors={['#ff0000', '#00ff00', '#0000ff']}
                backgroundColor="#F4442E"
                />
                </div>
                
            </div>
                :
        <>
        
        <div className='studentname'>
        {supervisorList.map((supervisor) => {
          {supervisor.approvalStatus === true ? approval = true : approval = false}
                    return(
                    <>
                    <h4 className='text-center'>{supervisor.name ? (supervisor.name + "'s Dashboard") : ("User Email: " + supervisor.email)}</h4>
                    
                    </>
                    )
        })}
        </div>
        
                {approval === true ?
                 <div className='studentsContainer mx-auto'>
                 <h3 style={{paddingTop:"20px", marginBottom:"20px"}}>Students</h3>
     
                 <Table striped bordered hover size="sm" style={{width:"80%"}} className="mx-auto">
                       <thead>
                         <tr>
                           <th>No</th>
                           <th>Student Name</th>
                           <th>Phone</th>
                           <th>Assessment Date</th>
                           <th>View Student</th>
                         </tr>
                       </thead>

                    {stuList.map((stu) => {
                     return(  
                       
                       <tbody>
                         <tr key={stu.id}>
                           <td>{number ++}</td>
                           <td style={{textAlign:"left", paddingLeft:"10px"}}>{stu.username}</td>
                           <td><a href={"tel:" + stu.phone}>{stu.phone}</a></td>
                           <td>{stu.assessmentDate || "Not set"}</td>
                           <td><StudentModal studentId={stu.id}/></td>
                           
                         </tr>
                       </tbody>
                     
                     ) 
                 })
             }
             </Table>
             
             </div>:<div className='studentsContainer mx-auto' style={{alignItems:"center", paddingTop:"170px"}}><h3>Account Awaiting Approval</h3></div>
            }

        </>}
    
    </div>
  )
}

export default FieldSupervisorDashboard