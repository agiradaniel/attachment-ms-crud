import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Hambuger from '../Images/hambuger.png';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ApproveSupervisorModal from './approveFDModal';
import AuthContext from '../helpers/AuthContext';

function AdmNavbar() {

  const { collapseSidebar } = useProSidebar();

  const navigate = useNavigate();
  const {setAuthState} = useContext(AuthContext);

  const signUserOut = async () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    navigate("/")
  }

  return (
    <div style={{ display: 'flex', height: '550px', position: 'absolute'}}>
      <Sidebar width="150px">
        <Menu>
          <MenuItem component={<Link to="/AdminDashboard"/>}> Dashboard</MenuItem>
          <MenuItem component={<Link to="/next"/>}> Reload</MenuItem>
          <MenuItem><ApproveSupervisorModal/></MenuItem>

          <MenuItem onClick={signUserOut} style={{marginTop:"340px"}}> Logout</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <img style={{width:"40px"}}  src={Hambuger} onClick={() => collapseSidebar()}/>
      </main>
    </div>
  );
}

export default AdmNavbar