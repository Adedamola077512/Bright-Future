import { FaHome, FaUserGraduate, FaBook, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logo.webp'; // Adjust the path as necessary

function Sidebar({ onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="" className='sidebar-img'/>
        <div>
          <h2>Bright Future</h2>
          <p>Admin Panel</p>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <a href="#dashboard" className="active">
          <FaHome className="icon" />
          <span>Dashboard</span>
        </a>
        <a href="#students">
          <FaUserGraduate className="icon" />
          <span>Students</span>
        </a>
        <a href="#exams">
          <FaBook className="icon" />
          <span>Exams</span>
        </a>
        <a href="#reports">
          <FaChartBar className="icon" />
          <span>Reports</span>
        </a>
        <a href="#settings">
          <FaCog className="icon" />
          <span>Settings</span>
        </a>
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={onLogout} className="logout-btn">
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;