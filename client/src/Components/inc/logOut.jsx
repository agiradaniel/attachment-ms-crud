import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../helpers/AuthContext';

const LogOut = () => {
  
    const navigate = useNavigate();

    const {setAuthState} = useContext(AuthContext);

    const signUserOut = async () => {
        localStorage.removeItem("accessToken");
        setAuthState({ username: "", id: 0, status: false });
        navigate("/")
    }
  
  return (
    <div>
        <button onClick={signUserOut} className='btn btn-purple-moon btn-rounded' style={{position:"absolute",right: "0px", top:"0"}}>Log Out</button>
    </div>
  )
}

export default LogOut