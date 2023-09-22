import React, { useState } from 'react'
import Image from '../Images/login-img.jpg';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const AcademicSupervisorRegister = () => {

    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [institution, setInstitution] = useState("");
    const [phone, setPhone] = useState("");
    const [workId, setWorkId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if(newPassword === confirmPassword){
                    await axios.post('http://localhost:3001/academicsupervisor/register',{
                    name: username,
                    email: newEmail,
                    phone: phone,
                    password: newPassword,
                    institution: institution,
                    workId: workId
                })
                navigate('/AcademicSupervisorLogin')
            }else{
                setErrorMessage("Passwords dont match")
            }
        }catch(err){
            setErrorMessage(err.message)
        }    
    }



    return(
        <>
            
            <div className='loginArea mx-auto'>
                <div className='text-white text-center loginImg' style={{backgroundImage: `url(${Image})`}} ><h1 className='mainH1'>CREATE ACCOUNT</h1></div>
                
                <div className='container myFormRegister'>
                <form onSubmit={handleSubmit}>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn-purple-moon'>
                            Academic Supervisor Registration
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Link to="/register"><Dropdown.Item href="#/action-2">Student</Dropdown.Item></Link>
                            <Link to="/AcademicSupervisorRegistration"><Dropdown.Item href="#/action-3">Academic supervisor</Dropdown.Item></Link>
                            <Link to="/FieldSupervisorRegistration"><Dropdown.Item href="#/action-4">Field supervisor</Dropdown.Item></Link>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    
                    <div className="mb-3" style={{marginTop:10}}>
                    <label className="form-label"> Username </label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                     />
                     </div>
                    <div className="mb-3" style={{marginTop:10}}>
                        <label for="exampleInputEmail1" className="form-label">Email</label>
                        <input type="text" className="form-control" onChange={(e)=>{
                            setNewEmail(e.target.value);
                        }}/>
                       
                    </div>
                    <div className="mb-3" style={{marginTop:20}}>
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e)=>{
                            setNewPassword(e.target.value);
                        }}/>
                    </div>

                    <div className="mb-3" style={{marginTop:20}}>
                        <label for="exampleInputPassword2" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" onChange={(e)=>{
                            setConfirmPassword(e.target.value);
                        }}/>
                    </div>

                    <div className="mb-3" style={{marginTop:20}}>
                        <label for="exampleInputPassword3" className="form-label">Institution</label>
                        <input type="text" className="form-control" onChange={(e)=>{
                            setInstitution(e.target.value);
                        }}/>
                    </div>

                    <div className="mb-3" style={{marginTop:20}}>
                        <label for="exampleInputPassword3" className="form-label">Phone(personal)</label>
                        <input type="number" className="form-control" onChange={(e)=>{
                            setPhone(e.target.value);
                        }}/>
                    </div>

                    <div className="mb-3" style={{marginTop:20}}>
                        <label for="exampleInputPassword3" className="form-label">Work ID</label>
                        <input type="number" className="form-control" onChange={(e)=>{
                            setWorkId(e.target.value);
                        }}/>
                    </div>

                    <div><p style={{color:"red"}}>{errorMessage}</p></div>
                   
                    <button type="submit" className="btn btn-purple-moon btn-rounded" style={{marginTop:20}} >Create Account</button>

                    <p className="small fw-bold" style={{marginTop:20}}>Already have an account? <Link to="/"
                     className="link-primary">Login</Link></p>

                </form>
                </div>

            </div>
            
        </>
    );

}

export default AcademicSupervisorRegister;