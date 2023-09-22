import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function AnnouncementModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)};
  const handleShow = () => setShow(true);

const [announcement, setAnnouncement] = useState("");

const updateAnnouncement = async()=>{
    await axios.post('http://localhost:3001/announcements', {Announcement: announcement, creatorId: 2})
}


  return (
    
    <>
      <Button onClick={handleShow} className='btn btn-purple-moon btn-rounded' >
        New Announcement
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{background: "#4e54c8", color: "white"}}>
          <Modal.Title>Make an Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="mx-auto text-center">
                    <label>New Announcement</label>
                    <br/>
                    <textarea
                        type="text"
                        onChange={(event) => setAnnouncement(event.target.value)}
                        style={{margin: "10px 0 10px", width:"50%", borderRadius:"5px"}}
                     />
                    
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={()=>{handleClose(); updateAnnouncement()}} className="btn btn-purple-moon btn-rounded">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

//render(<Example />);
export default AnnouncementModal;