import React, { useState, useEffect, useContext } from 'react';
import Banner from '../Images/dashboard-banner.jpg';
import AsNavbar from "../inc/AsNavbar";
import StudentModalAS from '../inc/studentModalAS';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { FidgetSpinner } from  'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import AnnouncementModal from '../inc/announcementModal';
//import SettingsModalAs from '../inc/settingsModalAs';
import AuthContext from '../helpers/AuthContext';

const AcademicSupervisorDashboard = () => {
  
    const navigate = useNavigate();
    const {authState} = useContext(AuthContext);
    const [stuList, setStuList] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    let number = 1;
    let no = 1;
    const [supervisorList, setSupervisorList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalStatus, setModalStatus] = useState(false);

    
    useEffect(()=>{
      const fetchStudentData = async() =>{
        const response = await axios.post("http://localhost:3001/academicsupervisor/studentdata", {supervisorid: authState.id})
        setStuList(response.data);
      }
      const fetchAnnouncements = async() =>{
        const response = await axios.get('http://localhost:3001/announcements');
          setAnnouncements(response.data)
      }

      fetchStudentData();
      fetchAnnouncements();
     
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

               <h1 className='text-center text-white' style={{paddingTop:'60px'}}>Academic Supervisor Dashboard</h1>
        </div>

        <AsNavbar/>
        <div className='studentname'>
        
            <h4 className='text-center'>Dr Mbogholi's Dashboard</h4>
                    
        </div>

        {isLoading ? 
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
        <div className='studentsContainerAS mx-auto'>
            <h3 style={{paddingTop:"20px", marginBottom:"20px"}}>Students</h3>
            
                  <Table striped bordered hover size="sm" style={{width:"80%"}} className="mx-auto">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Student Name</th>
                      <th>Phone</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Assessment Date</th>
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
                      <td>{stu.assessmentDate || "Not set"}</td>
                      <td><StudentModalAS studentId={stu.id}/></td>
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
  </>       

    }
    </div>
  )
}

export default AcademicSupervisorDashboard;