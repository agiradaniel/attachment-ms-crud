import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Hambuger from '../Images/hambuger.png';
import { useNavigate } from 'react-router-dom';
//import SettingsModalAs from './settingsModalAs';
import AuthContext from '../helpers/AuthContext';

function AsNavbar() {

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
      <Sidebar width="140px">
        <Menu>
          <MenuItem component={<Link to="/AcademicSupervisorDashboard"/>}> Dashboard</MenuItem>
          <MenuItem component={<Link to="/next"/>}> Reload</MenuItem>

          <MenuItem style={{marginTop:"350px"}}> Settings </MenuItem>
          <MenuItem onClick={signUserOut}> Logout</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <img style={{width:"40px"}}  src={Hambuger} onClick={() => collapseSidebar()}/>
      </main>
    </div>
  );
}

export default AsNavbar