import {React, useContext, useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Chart from '../inc/chart';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import InputModal from '../inc/InputsModal';
import { Button } from 'react-bootstrap';
import SideBarMenu from '../inc/sideBar';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';

const ELogbook = () => {
    
    const {authState} = useContext(AuthContext)

    const navigate = useNavigate();
    const [dropValue, setDropValue] = useState("week1")

    const [logged, setLogged] = useState([]);
    const [stuList, setStuList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if(!authState.status){
          navigate("/");
        }
      },[]);

    useEffect(()=>{
        const fetchData = async()=>{  
         try {
            const response = await axios.post('http://localhost:3001/logbook/logs', {userId: authState.id, week: dropValue})
            setLogged(response.data)
         }catch (error) {
            setErrorMessage(error);
         }
        }
        fetchData();
        console.log("Data fetched")
    },[dropValue])

    return(
        <>
            <div style={{backgroundColor:'#4e54c8', height: '100px'}}>
               <h1 className='text-center text-white' style={{paddingTop: '20px'}}>E-Logbook</h1>
            </div>

            <div className='lognotificationbar'>
                 <div style={{margin:'140px 0 0 30px'}}>
                     <Chart/>
                </div>   
            </div>

            <SideBarMenu/>

            <div className="logInputs">

           <div className='actionButtons'> 
            <Dropdown style={{textAlign: "center"}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn-purple-moon'>
                            {dropValue}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item value="week1" onClick={()=>{setDropValue("week1")}}>Week 1</Dropdown.Item>
                            <Dropdown.Item value="week2" onClick={()=>{setDropValue("week2")}}>Week 2</Dropdown.Item>
                            <Dropdown.Item value="week3" onClick={()=>{setDropValue("week3")}}>Week 3</Dropdown.Item>
                            <Dropdown.Item value="week4" onClick={()=>{setDropValue("week4")}}>Week 4</Dropdown.Item>
                            <Dropdown.Item value="week5" onClick={()=>{setDropValue("week5")}}>Week 5</Dropdown.Item>
                            <Dropdown.Item value="week6" onClick={()=>{setDropValue("week6")}}>Week 6</Dropdown.Item>
                            <Dropdown.Item value="week7" onClick={()=>{setDropValue("week7")}}>Week 7</Dropdown.Item>
                            <Dropdown.Item value="week8" onClick={()=>{setDropValue("week8")}}>Week 8</Dropdown.Item>
                            <Dropdown.Item value="week9" onClick={()=>{setDropValue("week9")}}>Week 9</Dropdown.Item>
                            <Dropdown.Item value="week10" onClick={()=>{setDropValue("week10")}}>Week 10</Dropdown.Item>
                            
                            
                        </Dropdown.Menu>
            </Dropdown>
           
            <InputModal/>

            </div> 

            <div>{errorMessage}</div>

            {logged !== null && logged.length > 0 ? 
            (logged.map((log) => {
                return(
                    <Form style={{marginTop:40}} key={(log.id)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Monday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.monday || ""} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tuesday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.tuesday || ""} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Wednesday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.wednesday || ""} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Thursday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.thursday || ""} readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Friday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={log.friday || ""} readOnly/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Student weekly report</Form.Label>
                        <Form.Control as="textarea" placeholder="Weekly report" rows={3} value={log.report || ""} readOnly/>
                    </Form.Group>

                    {log.fieldSupervisorComments &&
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <h4 className="text-center" style={{margin:"20px 0 20px"}}>Field Supervisor Comments</h4>
                        <Form.Control as="textarea" placeholder="Weekly report" rows={3} style={{backgroundColor:"#EBEEF0"}} value={log.fieldSupervisorComments || ""} readOnly/>
                    </Form.Group>
                    }
                    {log.approvalStatus &&
                    <div className='text-center' style={{margin:"20px 0 20px"}}>
                    <a className='disabledButton'><Button variant="warning" className="btn btn-rounded" disabled>
                       <strong>{dropValue} Approved by Field Supervisor</strong> 
                    </Button></a>
                    </div>
                    }
                    </Form>
                    ) 
                })
            ):(<div style={{margin:"30px", textAlign:"center"}}>No data yet for this week</div>)
            }
        
                
            </div>
        </>
    )
}

export default ELogbook;