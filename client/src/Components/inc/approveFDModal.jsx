import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
import axios from 'axios';

function ApproveSupervisorModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);

  const [fdSupList, setFdSupList] = useState([]);
  let number = 1;
 
  
  //this code queries Supervisor details ie name number location
  useEffect(()=>{
      
      const details = axios.get('http://localhost:3001/admin/unapprovedfieldsupervisors').then((details)=>{
        setFdSupList(details.data)
      })
      
    
    },[])

  
 const updateFdSupervisorDetails = async (id) => {
   
    await axios.put('http://localhost:3001/admin/approvesupervisors', {id, approvalStatus: true})

 }



  return (
    
    <>
      <div onClick={handleShow}>
        Approve Field <br/> Supervisors
      </div>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton style={{background: "#4e54c8", color: "white"}}>
          <Modal.Title>Approve New Field Supervisors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
              <div className='studentsContainerAS mx-auto'>
              <h3 style={{paddingTop:"20px", marginBottom:"20px"}}>Supervisors</h3>
              
                    <Table striped bordered hover size="sm" style={{width:"80%"}} className="mx-auto">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Suprevisor Name</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Approve</th>
                      </tr>
                    </thead>
                      {fdSupList.map((sup) => {
                  return(  
                    
                    <tbody>
                      <tr>
                        <td>{number ++}</td>
                        <td style={{textAlign:"left"}}>{sup.name}</td>
                        <td><a href={"tel:" + sup.phone}>{sup.phone}</a></td>
                        <td>{sup.company}</td>
                        <td><Button onClick={()=>updateFdSupervisorDetails(sup.id)} style={{fontSize:"12px"}} className="btn btn-purple-moon btn-rounded">Approve</Button></td>
                      </tr>
                    </tbody>
                  
                  ) 
              })
          }
          </Table>
          </div>
       
              

        
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
export default ApproveSupervisorModal;