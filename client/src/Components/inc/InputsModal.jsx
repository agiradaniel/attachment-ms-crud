import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import AuthContext from '../helpers/AuthContext';


function InputModal() {
  const [show, setShow] = useState(false);

  const {authState} = useContext(AuthContext);

  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);

  const [dropValue, setDropValue] = useState("week1");
  /*const [stuList, setStuList] = useState([]);
  const [progressIncrease, setProgressIncrease] = useState(null);
  const [progressDecrease, setProgressDecrease] = useState(null);*/
  const [logbookEmptyError, setLogbookEmptyError] = useState("");

    //States for weekly data
    const [mondayLog, setMondayLog] = useState("");
    const [tuesdayLog, setTuesdayLog] = useState("");
    const [wednesdayLog, setWednesdayLog] = useState("");
    const [thursdayLog, setThursdayLog] = useState("");
    const [fridayLog, setFridayLog] = useState("");
    const [reportLog, setReportLog] = useState("");


const updateProgress = () => {
   axios.put('http://localhost:3001/auth/updateprogress', {userId: authState.id})
}



const submitLog = async(e) => {
    if(mondayLog && tuesdayLog && wednesdayLog && thursdayLog && fridayLog){
        e.preventDefault();
       await axios.post('http://localhost:3001/logbook', {
            week: dropValue,
            monday: mondayLog, 
            tuesday: tuesdayLog,
            wednesday: wednesdayLog,
            thursday: thursdayLog,
            friday: fridayLog,
            report: reportLog,
            creatorId: authState.id
        })
        updateProgress();
        handleClose();
    }else{
        setLogbookEmptyError("Logs cannot be empty")
    }
}

 //this code clears the states to empty the input values
 const clearStateValues = () =>{
    setMondayLog(""); setTuesdayLog(""); setWednesdayLog(""); setThursdayLog(""); setFridayLog(""); setLogbookEmptyError("");
  }


  return (
    
    <>
      <Button onClick={handleShow} className='btn btn-purple-moon btn-rounded' style={{marginLeft:"30px"}}>
        + New
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton style={{background: "#4e54c8", color: "white"}}>
          <Modal.Title>Weekly Logs input</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Dropdown style={{textAlign: "center", marginTop:40}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='btn-purple-moon'>
                            {dropValue}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item value="week1" onClick={()=>{setDropValue("week1"); clearStateValues()}}>Week 1</Dropdown.Item>
                            <Dropdown.Item value="week2" onClick={()=>{setDropValue("week2"); clearStateValues()}}>Week 2</Dropdown.Item>
                            <Dropdown.Item value="week3" onClick={()=>{setDropValue("week3"); clearStateValues()}}>Week 3</Dropdown.Item>
                            <Dropdown.Item value="week4" onClick={()=>{setDropValue("week4"); clearStateValues()}}>Week 4</Dropdown.Item>
                            <Dropdown.Item value="week5" onClick={()=>{setDropValue("week5"); clearStateValues()}}>Week 5</Dropdown.Item>
                            <Dropdown.Item value="week6" onClick={()=>{setDropValue("week6"); clearStateValues()}}>Week 6</Dropdown.Item>
                            <Dropdown.Item value="week7" onClick={()=>{setDropValue("week7"); clearStateValues()}}>Week 7</Dropdown.Item>
                            <Dropdown.Item value="week8" onClick={()=>{setDropValue("week8"); clearStateValues()}}>Week 8</Dropdown.Item>
                            <Dropdown.Item value="week9" onClick={()=>{setDropValue("week9"); clearStateValues()}}>Week 9</Dropdown.Item>
                            <Dropdown.Item value="week10" onClick={()=>{setDropValue("week10"); clearStateValues()}}>Week 10</Dropdown.Item>
                            
                            
                        </Dropdown.Menu>
            </Dropdown>

        <Form style={{marginTop:40}}>
                     <p style={{color:"red", fontWeight:"bold", textAlign:"center"}}>{logbookEmptyError}</p>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Monday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done"  rows={1} value={mondayLog}
                            onChange={(e)=>{
                                setMondayLog(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tuesday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={tuesdayLog}
                            onChange={(e)=>{
                                setTuesdayLog(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Wednesday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={wednesdayLog}
                            onChange={(e)=>{
                                setWednesdayLog(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Thursday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={thursdayLog}
                            onChange={(e)=>{
                                setThursdayLog(e.target.value)
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Friday</Form.Label>
                        <Form.Control as="textarea" placeholder="Description of work done" rows={1} value={fridayLog}
                            onChange={(e)=>{
                                setFridayLog(e.target.value)
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Student weekly report</Form.Label>
                        <Form.Control as="textarea" placeholder="Text area" rows={3}
                            onChange={(e)=>{
                                setReportLog(e.target.value)
                            }}
                        />
                    </Form.Group>

                </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" onClick={submitLog} className="btn btn-purple-moon btn-rounded" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

//render(<Example />);
export default InputModal;