import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function GradeModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);

  const [grades, setGrades] = useState([]);

  
  return (
    
    <>
      <Button onClick={handleShow} className='btn btn-purple-moon btn-rounded' style={{marginTop:"30px"}}>
        View Grade
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{background: "#4e54c8", color: "white"}}>
          <Modal.Title>Marks Assigned by Field Supervisor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {grades.map((grade) => {
        return(
            <div className="mx-auto" style={{width:"40%"}}>   
            <div className='d-flex justify-content-between'><div>Punctuality:</div> <div>{grade.punctuality}/4</div></div> 
            <div className='d-flex justify-content-between'><div>Atherence:</div> <div>{grade.aherence}/4</div></div> 
            <div className='d-flex justify-content-between'><div>Workmanship:</div> <div>{grade.workmanship}/3</div></div> 
            <div className='d-flex justify-content-between'><div>Work Output:</div> <div>{grade.workOutput}/3</div></div> 
            <div className='d-flex justify-content-between'><div>Adaptability:</div> <div>{grade.adaptability}/4</div></div> 
            <div className='d-flex justify-content-between'><div>Communication:</div> <div>{grade.communication}/4</div></div> 
            <div className='d-flex justify-content-between'><div>Reliability:</div> <div>{grade.reliability}/4</div></div> 
            <div className='d-flex justify-content-between'><div>Teamwork:</div> <div>{grade.teamwork}/4</div></div> 
            <div className='d-flex justify-content-between mt-3'><div>Total:</div> <div>{grade.totalMarks}/30</div></div> 

        </div>
        )
      })}
        
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} className="btn btn-purple-moon btn-rounded">
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </>
  );
}

//render(<Example />);
export default GradeModal;