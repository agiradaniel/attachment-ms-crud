import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SideBarMenu from '../inc/sideBar';
import FileIcon from '../Images/fileIcon.jpeg';
import axios from 'axios'

const Report = () => {
    
    const navigate = useNavigate();

    const [fileUpload, setFileUpload] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [link, setLink] = useState("");
    const [report, setReport] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

  
    const handleFileUpload = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
  
        const response = await axios.post('http://localhost:3001/fileupload/upload', formData);
  
        if (response.status === 200) {
          console.log('File uploaded successfully');
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error(error);
      }
    }
      
    
    return(
        <>
            <div style={{backgroundColor:'#4e54c8', height: '100px'}}>
               <h1 className='text-center text-white' style={{paddingTop:'20px'}}>Report</h1>
            </div>

            <SideBarMenu/>

            <div className="reportContainer container text-center">
                <form>
                <h2 style={{padding:'60px 0 60px 0'}}>Upload report</h2>
                <input type="file" className="form-control mx-auto" id="customFile" style={{width:'60%'}} 
                  onChange={(e )=>{
                    setSelectedFile(e.target.files[0])
                  }}
                />

                {report.length > 0 ? (
                <a className='disabledButton'><Button variant="warning" className="disabled" style={{marginTop:'60px', color:"white", fontWeight:"bold"}}>Submitted</Button></a>
                ):(<button type="submit" className="btn btn-purple-moon btn-rounded" style={{marginTop:'60px'}}
                onClick={handleFileUpload}
              >Upload</button>)}
                </form>
                <div style={{marginTop:"10px"}}><p>{successMessage}</p></div>
                <div style={{marginTop:"40px"}}><p>{loadingStatus}</p></div>

                {report.map((repData) => {
                return(
                   <>
                  
                   <h4 style={{marginTop:"60px"}}>My Report</h4>
                   <div style={{display:"flex", justifyContent:"center"}}>
                    <img src={FileIcon} alt="file icon" style={{width:"35px", height:"35px", margin:"3px 20px 0 0"}}/>
                    <p style={{margin:"8px 20px 0 0"}}>{repData.reportName}</p>
                    <a href={repData.reportLink || link} target="_blank"><Button className="btn btn-purple-moon btn-rounded" style={{height:"40px"}}>Open Report</Button></a>
                   </div>
                  
                   </>
                ) 
            })
        }

            </div>
        </>
    )
}

export default Report