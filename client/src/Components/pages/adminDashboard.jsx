import React, { useState, useEffect, useContext } from 'react';
import Banner from '../Images/dashboard-banner.jpg';
import AdmNavbar from "../inc/AdmNavbar";
import StudentModalAdm from '../inc/studentModalAdm';
import Table from 'react-bootstrap/Table';
import AnnouncementModal from '../inc/announcementModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import AuthContext from '../helpers/AuthContext';

const AdminDashboard = () => {
  
    const navigate = useNavigate();
    const {authState} = useContext(AuthContext);

    const [stuList, setStuList] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    let number = 1;
    let no = 1;

    useEffect(() => {
      if(authState.status == false){
        navigate("/fieldsupervisorlogin");
      }
    },[]);

    useEffect(()=>{
      const fetchStudentData = async() =>{
        const response = await axios.get("http://localhost:3001/admin/studentdata")
        setStuList(response.data);
      }
      const fetchAnnouncements = async() =>{
        const response = await axios.get('http://localhost:3001/announcements');
          setAnnouncements(response.data)
      }

      fetchStudentData();
      fetchAnnouncements();
     
    },[])
  

    return (
    <div>
        <div className='banner' style={{backgroundImage: `url(${Banner})`}}>
   
               <h1 className='text-center text-white' style={{paddingTop:'60px'}}>Administrator Dashboard</h1>
        </div>

        <AdmNavbar/>

        <div className='studentname'>
                    <h4 className='text-center'>Mr Arnold's Dashboard</h4>
        </div>

        <div className='studentsContainerAS mx-auto' style={{paddingBottom:"20px"}}>
            <h3 style={{paddingTop:"20px", marginBottom:"20px"}}>Students</h3>
            
                  <Table striped bordered hover size="sm" style={{width:"90%"}} className="mx-auto">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Student Name</th>
                      <th>Phone</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>AC Supervisor</th>
                      <th>FD Supervisor</th>
                      <th>View Student</th>
                    </tr>
                  </thead>
                    {stuList.map((stu) => {
                return(  
                  
                  <tbody>
                    <tr>
                      <td>{number ++}</td>
                      <td style={{textAlign:"left"}}>{stu.username}</td>
                      <td><a href={"tel:" + stu.phone}>{stu.phone}</a></td>
                      <td>{stu.location}</td>
                      <td>{stu.company}</td>
                      <td>{stu.supervisorName || <div style={{color:"red"}}>Not assigned</div>}</td>
                      <td>{stu.fdSupervisorName || <div style={{color:"red"}}>Not assigned</div>}</td>
                      <td><StudentModalAdm studentId={stu.id}/></td>
                    </tr>
                  </tbody>
                
                ) 
            })
        }
        </Table>
        </div>

        <div className='text-center' style={{margin:"30px 0 30px"}}>
          <AnnouncementModal/>
          <div style={{border:"1px solid black", padding:"10px", width:"30%",margin:"30px auto", borderRadius:"5px", textAlign:"left", backgroundColor: "#EBEEF0"}}>
          {announcements.map((ancmt)=>{
            return(
              <>
              
                <div className='d-flex mt-2 justify-content-between'><div>{no++ +". "}{ancmt.Announcement+" "}{" ~ "+ancmt.dateCreated+" "}</div>{ancmt.creatorId === "" && <button style={{border:"none"}} onClick={()=>{}}>&#128465;</button>}</div>
              
              </>
            )
          })}

          </div>
        </div>

    </div>
  )
}

export default AdminDashboard;