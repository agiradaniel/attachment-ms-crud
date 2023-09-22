import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../helpers/AuthContext';


const Test = () => {
  
const [studentDetails, setStudentDetails] = useState([]);
    
const {authState} = useContext(AuthContext);

//getting student details from the backend
useEffect(()=>{
    const fetchData = async()=>{
    const response = await axios.post('http://localhost:3001/auth/details', {id: authState.id})
        setStudentDetails(response.data)
    }
    fetchData();
},[])
  
return (
    <div>
        
        {studentDetails.map((student) => {
         return (
             <p key={student.id}>{student.username}</p>
         )
         })}

       
    </div>
  )
}

export default Test