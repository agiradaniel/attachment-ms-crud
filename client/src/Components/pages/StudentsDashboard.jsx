import React, { useEffect, useState, useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Banner from '../Images/dashboard-banner.jpg';
import SideBarMenu from '../inc/sideBar';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import Chart from '../inc/chart';
import Footer from '../inc/footer';
import GradeModal from '../inc/gradeModal';

const StudentDashboard = () => {

  const navigate = useNavigate();

  const [studentDetails, setStudentDetails] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  let no = 1;
    
  const {authState} = useContext(AuthContext);

  useEffect(() => {
    if(authState.status == false){
      navigate("/");
    }
  },[]);

//getting student details from the backend
  useEffect(()=>{
      const fetchData = async()=>{
      const response = await axios.post('http://localhost:3001/auth/details', {id: authState.id})
          setStudentDetails(response.data)
      }

      const fetchAnnouncements = async() =>{
        const response = await axios.get('http://localhost:3001/announcements');
          setAnnouncements(response.data)
      }

      fetchData();
      fetchAnnouncements();
  },[])


  return (
    <div>


      <div className='banner' style={{backgroundImage: `url(${Banner})`}}>
        <h1 className='text-center text-white' style={{paddingTop:'70px'}}>Student Dashboard</h1>
      </div>

      <div className='notificationbar'>
        <div className='text-center' style={{marginTop:'130px'}}>
            <h5>Physical assessment schedule</h5>
            <p>Not Set</p>

            <h5 style={{marginTop:'40px'}}>Announcements</h5>

           <div style={{width:"60%", margin:"auto", border:"3px solid #4e54c8", padding:"3px", borderRadius:"5px", maxHeight:"170px", overflowX:"hidden",overflowY:"scroll", backgroundColor:"white"}}>
                    {announcements.map((ancmt)=>{
                        return(
                            <>
                                
                              <div>{ancmt.Announcement ?  (no++ +". " + ancmt.Announcement + " ~ " + ancmt.dateCreated) : <div>None yet</div>}</div>
                              
                            </>
                        )
                    })}
                    </div>
         <GradeModal/>           
        </div>

      </div>

    <SideBarMenu/>

      <div style={{width:'70%', height:'70vh'}} className="main-area">  

        <div className='studentname'>
          {studentDetails.map((student) => {
            return(
              <h4 className='text-center'>{student.username ? (student.username + "'s dashboard") : ("User Email: " + student.email)}</h4>
            )
          })}
        </div>
               
                        
        <div className='buttonwrap d-flex justify-content-center container'>
          <Link to="/eLogbook" style={{ textDecoration: 'none'}}>
            <div className='mainButton p-2 btn-purple-moon' style={{marginRight:'120px'}}>  
              <p style={{marginTop:'50px'}}>E-Logbook</p>
            </div>
          </Link>

          <Link to="/Report" style={{ textDecoration: 'none'}}>
            <div className='mainButton p-2 btn-purple-moon' >  
               <p style={{marginTop:'50px'}}>E-Report</p>
            </div>
          </Link>    
        </div>
        <div style={{marginTop:'40px'}}>
          <Chart/>                 
        </div>
            

      </div>
          <Footer/>
    </div>
  )
}

export default StudentDashboard