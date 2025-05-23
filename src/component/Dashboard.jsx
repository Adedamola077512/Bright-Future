import { useState, useEffect } from 'react';
import { 
  FaEye, 
  FaExclamationTriangle, 
  FaSearch, 
  FaSignOutAlt,
  FaUserPlus,
  FaFileExport,
  FaFilter,
  FaChartLine
} from 'react-icons/fa';
import Sidebar from './Sidebar';
import StudentModal from './StudentModal';

function Dashboard({ onLogout }) {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const data = [
    { id: 1, name: 'Mathematics Final Exam', class: 'Grade 12 Science', number: 'John Smith', percentage: 85.00, address: '123 Main St', status: 'Passed', points: 'A' },
    { id: 2, name: 'Physics Midterm', class: 'Grade 12 Science', number: 'Sarah Johnson', percentage: 92.50, address: '456 Oak Ave', status: 'Passed', points: 'A+' },
    { id: 3, name: 'Chemistry Final', class: 'Grade 12 Science', number: 'Michael Brown', percentage: 78.30, address: '789 Pine Rd', status: 'Passed', points: 'B+' },
    { id: 4, name: 'Biology Exam', class: 'Grade 11 Science', number: 'Emily Davis', percentage: 65.20, address: '321 Elm St', status: 'Passed', points: 'C+' },
    { id: 5, name: 'English Literature', class: 'Grade 12 Arts', number: 'David Wilson', percentage: 88.90, address: '654 Maple Dr', status: 'Passed', points: 'A' },
    { id: 6, name: 'History Final', class: 'Grade 12 Arts', number: 'Jessica Lee', percentage: 72.40, address: '987 Cedar Ln', status: 'Passed', points: 'B' },
    { id: 7, name: 'Computer Science', class: 'Grade 12 Science', number: 'Daniel Miller', percentage: 95.00, address: '135 Birch Blvd', status: 'Passed', points: 'A+' },
    { id: 8, name: 'Mathematics Quiz', class: 'Grade 11 Science', number: 'Olivia Taylor', percentage: 58.60, address: '246 Willow Way', status: 'Passed', points: 'D+' },
    { id: 9, name: 'Physics Lab Exam', class: 'Grade 12 Science', number: 'Robert Anderson', percentage: 81.20, address: '369 Spruce Ct', status: 'Passed', points: 'A-' },
    { id: 10, name: 'Chemistry Quiz', class: 'Grade 11 Science', number: 'Sophia Martinez', percentage: 90.50, address: '579 Redwood Pl', status: 'Passed', points: 'A' },
    { id: 11, name: 'Geography Test', class: 'Grade 10', number: 'William Thomas', percentage: 75.80, address: '864 Palm St', status: 'Passed', points: 'B' },
    { id: 12, name: 'Art History', class: 'Grade 11 Arts', number: 'Emma Garcia', percentage: 82.30, address: '753 Aspen Ave', status: 'Passed', points: 'A-' },
    { id: 13, name: 'Physical Education', class: 'Grade 10', number: 'James Rodriguez', percentage: 91.00, address: '159 Oak Ln', status: 'Passed', points: 'A' },
    { id: 14, name: 'Economics Final', class: 'Grade 12 Commerce', number: 'Isabella Hernandez', percentage: 68.90, address: '357 Pine Blvd', status: 'Passed', points: 'C+' },
    { id: 15, name: 'Business Studies', class: 'Grade 11 Commerce', number: 'Alexander Lopez', percentage: 77.50, address: '486 Cedar Dr', status: 'Passed', points: 'B+' },
    { id: 16, name: 'French Language', class: 'Grade 10', number: 'Mia Gonzalez', percentage: 84.20, address: '624 Maple Ct', status: 'Passed', points: 'A-' },
    { id: 17, name: 'Music Theory', class: 'Grade 11 Arts', number: 'Ethan Wilson', percentage: 89.70, address: '951 Birch Way', status: 'Passed', points: 'A' },
    { id: 18, name: 'Algebra Test', class: 'Grade 9', number: 'Charlotte Perez', percentage: 62.30, address: '283 Willow Pl', status: 'Passed', points: 'C' },
    { id: 19, name: 'Geometry Exam', class: 'Grade 10', number: 'Benjamin Turner', percentage: 71.80, address: '417 Redwood Rd', status: 'Passed', points: 'B-' },
    { id: 20, name: 'Literature Final', class: 'Grade 12 Arts', number: 'Amelia Phillips', percentage: 93.50, address: '532 Spruce St', status: 'Passed', points: 'A+' }
      ];
      
      setResults(data);
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  const filteredResults = results.filter(result => 
    (filterClass === 'All' || result.class === filterClass) &&
    (
      result.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const classOptions = ['All', ...new Set(results.map(result => result.class))];

  const openStudentDetails = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const exportToExcel = () => {
    // In a real app, this would generate an Excel file
    alert('Exporting data to Excel...');
  };

  return (
    <div className="dashboard-container">
      <Sidebar onLogout={onLogout} />
      
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Result Management Dashboard</h1>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              <FaUserPlus className="me-2" /> Add Student
            </button>
            <button className="btn btn-success" onClick={exportToExcel}>
              <FaFileExport className="me-2" /> Export
            </button>
          </div>
        </div>
        
        <div className="dashboard-content">
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Total Students</h3>
              <p>{results.length}</p>
              <div className="icon-bg">
                <FaChartLine />
              </div>
            </div>
            <div className="stat-card">
              <h3>Pass Rate</h3>
              <p>92%</p>
              <div className="icon-bg">
                <FaChartLine />
              </div>
            </div>
            <div className="stat-card">
              <h3>Top Class</h3>
              <p>Grade 12 Science</p>
              <div className="icon-bg">
                <FaChartLine />
              </div>
            </div>
          </div>
          
          <div className="data-section">
            <div className="section-header">
              <h2>Student Results</h2>
              <div className="data-actions">
                <div className="search-filter">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaSearch />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="filter-group">
                    <span className="input-group-text">
                      <FaFilter />
                    </span>
                    <select 
                      className="form-select" 
                      value={filterClass}
                      onChange={(e) => setFilterClass(e.target.value)}
                    >
                      {classOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="table-container">
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading student data...</p>
                </div>
              ) : (
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Class</th>
                      <th>Exam</th>
                      <th>Percentage</th>
                      <th>Grade</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.length > 0 ? (
                      filteredResults.map((result) => (
                        <tr key={result.id}>
                          <td>
                            <div className="student-info">
                              <div className="avatar">{result.number.charAt(0)}</div>
                              <span>{result.number}</span>
                            </div>
                          </td>
                          <td>{result.class}</td>
                          <td>{result.name}</td>
                          <td>
                            <div className="progress-container">
                              <span>{result.percentage.toFixed(1)}%</span>
                              <div className="progress-bar">
                                <div 
                                  className={`progress-fill ${result.percentage < 50 ? 'danger' : result.percentage < 75 ? 'warning' : 'success'}`}
                                  style={{ width: `${result.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`grade-badge ${result.points.includes('A') ? 'grade-a' : 
                                             result.points.includes('B') ? 'grade-b' :
                                             result.points.includes('C') ? 'grade-c' : 'grade-d'}`}>
                              {result.points}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${result.status === 'Passed' ? 'success' : 'danger'}`}>
                              {result.status}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="btn-view"
                              onClick={() => openStudentDetails(result)}
                            >
                              <FaEye /> View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="no-results">
                        <td colSpan="7">
                          No matching students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <StudentModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />
    </div>
  );
}

export default Dashboard;