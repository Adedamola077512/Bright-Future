import { useState, useEffect } from 'react';
import { 
  FaSignOutAlt, FaUserPlus, FaFileExport, FaSearch, 
  FaFilter, FaChartLine, FaEye, FaEdit, FaTrash,
  FaDownload, FaPrint
} from 'react-icons/fa';
import Sidebar from './Sidebar';
import StudentModal from './StudentModal';
import './AdminDashboard.css';

// Complete student dataset
const initialStudents = [
  {
    id: 1,
    studentName: 'John Smith',
    rollNumber: 'S2023001',
    className: 'Grade 12 Science',
    email: 'john.smith@school.edu',
    phone: '555-0101',
    address: '123 Main St, Cityville',
    exams: [
      {
        examId: 101,
        examName: 'Mathematics Final Exam',
        date: '2023-06-15',
        percentage: 85.0,
        grade: 'A',
        status: 'Passed',
        subjects: [
          { name: 'Algebra', score: 88, maxScore: 100 },
          { name: 'Geometry', score: 82, maxScore: 100 },
          { name: 'Calculus', score: 85, maxScore: 100 }
        ]
      },
      {
        examId: 102,
        examName: 'Physics Midterm',
        date: '2023-04-20',
        percentage: 92.5,
        grade: 'A+',
        status: 'Passed',
        subjects: [
          { name: 'Mechanics', score: 95, maxScore: 100 },
          { name: 'Electromagnetism', score: 90, maxScore: 100 }
        ]
      }
    ]
  },
  {
    id: 2,
    studentName: 'Sarah Johnson',
    rollNumber: 'S2023002',
    className: 'Grade 12 Science',
    email: 'sarah.j@school.edu',
    phone: '555-0102',
    address: '456 Oak Ave, Townsville',
    exams: [
      {
        examId: 101,
        examName: 'Mathematics Final Exam',
        date: '2023-06-15',
        percentage: 78.3,
        grade: 'B+',
        status: 'Passed',
        subjects: [
          { name: 'Algebra', score: 80, maxScore: 100 },
          { name: 'Geometry', score: 76, maxScore: 100 },
          { name: 'Calculus', score: 79, maxScore: 100 }
        ]
      }
    ]
  },
  {
    id: 3,
    studentName: 'Michael Brown',
    rollNumber: 'S2023003',
    className: 'Grade 11 Science',
    email: 'michael.b@school.edu',
    phone: '555-0103',
    address: '789 Pine Rd, Villagetown',
    exams: [
      {
        examId: 103,
        examName: 'Chemistry Final',
        date: '2023-06-18',
        percentage: 65.2,
        grade: 'C+',
        status: 'Passed',
        subjects: [
          { name: 'Organic Chemistry', score: 62, maxScore: 100 },
          { name: 'Inorganic Chemistry', score: 68, maxScore: 100 }
        ]
      }
    ]
  },
  {
    id: 4,
    studentName: 'Emily Davis',
    rollNumber: 'S2023004',
    className: 'Grade 11 Arts',
    email: 'emily.d@school.edu',
    phone: '555-0104',
    address: '321 Elm St, Hamletville',
    exams: [
      {
        examId: 104,
        examName: 'English Literature',
        date: '2023-06-12',
        percentage: 88.9,
        grade: 'A',
        status: 'Passed',
        subjects: [
          { name: 'Shakespeare', score: 92, maxScore: 100 },
          { name: 'Modern Literature', score: 86, maxScore: 100 }
        ]
      }
    ]
  },
  {
    id: 5,
    studentName: 'David Wilson',
    rollNumber: 'S2023005',
    className: 'Grade 10',
    email: 'david.w@school.edu',
    phone: '555-0105',
    address: '654 Maple Dr, Boroughburg',
    exams: [
      {
        examId: 105,
        examName: 'History Final',
        date: '2023-06-20',
        percentage: 72.4,
        grade: 'B',
        status: 'Passed',
        subjects: [
          { name: 'World History', score: 75, maxScore: 100 },
          { name: 'National History', score: 70, maxScore: 100 }
        ]
      }
    ]
  },
  {
    id: 6,
    studentName: 'Jessica Lee',
    rollNumber: 'S2023006',
    className: 'Grade 12 Science',
    email: 'jessica.l@school.edu',
    phone: '555-0106',
    address: '987 Cedar Ln, Cityville',
    exams: [
      {
        examId: 101,
        examName: 'Mathematics Final Exam',
        date: '2023-06-15',
        percentage: 95.0,
        grade: 'A+',
        status: 'Passed',
        subjects: [
          { name: 'Algebra', score: 98, maxScore: 100 },
          { name: 'Geometry', score: 92, maxScore: 100 },
          { name: 'Calculus', score: 95, maxScore: 100 }
        ]
      }
    ]
  },
  {
    id: 7,
    studentName: 'Daniel Miller',
    rollNumber: 'S2023007',
    className: 'Grade 11 Science',
    email: 'daniel.m@school.edu',
    phone: '555-0107',
    address: '135 Birch Blvd, Townsville',
    exams: [
      {
        examId: 103,
        examName: 'Chemistry Final',
        date: '2023-06-18',
        percentage: 58.6,
        grade: 'D+',
        status: 'Failed',
        subjects: [
          { name: 'Organic Chemistry', score: 55, maxScore: 100 },
          { name: 'Inorganic Chemistry', score: 62, maxScore: 100 }
        ]
      }
    ]
  },
  {
    id: 8,
    studentName: 'Olivia Taylor',
    rollNumber: 'S2023008',
    className: 'Grade 12 Arts',
    email: 'olivia.t@school.edu',
    phone: '555-0108',
    address: '246 Willow Way, Villagetown',
    exams: [
      {
        examId: 106,
        examName: 'Art History',
        date: '2023-06-10',
        percentage: 82.3,
        grade: 'A-',
        status: 'Passed',
        subjects: [
          { name: 'Renaissance Art', score: 85, maxScore: 100 },
          { name: 'Modern Art', score: 80, maxScore: 100 }
        ]
      }
    ]
  },
  {
    id: 9,
    studentName: 'Robert Anderson',
    rollNumber: 'S2023009',
    className: 'Grade 10',
    email: 'robert.a@school.edu',
    phone: '555-0109',
    address: '369 Spruce Ct, Hamletville',
    exams: [
      {
        examId: 107,
        examName: 'Physical Education',
        date: '2023-06-05',
        percentage: 91.0,
        grade: 'A',
        status: 'Passed',
        subjects: [
          { name: 'Practical', score: 95, maxScore: 100 },
          { name: 'Theory', score: 87, maxScore: 100 }
        ]
      }
    ]
  },
  {
    id: 10,
    studentName: 'Sophia Martinez',
    rollNumber: 'S2023010',
    className: 'Grade 11 Commerce',
    email: 'sophia.m@school.edu',
    phone: '555-0110',
    address: '579 Redwood Pl, Boroughburg',
    exams: [
      {
        examId: 108,
        examName: 'Economics Final',
        date: '2023-06-22',
        percentage: 68.9,
        grade: 'C+',
        status: 'Passed',
        subjects: [
          { name: 'Microeconomics', score: 65, maxScore: 100 },
          { name: 'Macroeconomics', score: 72, maxScore: 100 }
        ]
      }
    ]
  }
];

function AdminDashboard({ onLogout }) {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'grid'

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setStudents(initialStudents);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter students
  const filteredStudents = students.filter(student => 
    (filterClass === 'All' || student.className === filterClass) &&
    (
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.className.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Class options for filter
  const classOptions = ['All', ...new Set(students.map(student => student.className))];

  // Handle student operations
  const handleSaveStudent = (studentData) => {
    if (studentData.id) {
      // Update existing
      setStudents(students.map(student => 
        student.id === studentData.id ? studentData : student
      ));
    } else {
      // Add new
      const newStudent = {
        ...studentData,
        id: Math.max(...students.map(s => s.id)) + 1,
        exams: studentData.exams || []
      };
      setStudents([...students, newStudent]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleExport = () => {
    alert('Export functionality would generate a CSV file');
    // In real implementation: Convert students data to CSV and download
  };

  return (
    <div className="admin-dashboard">
      <Sidebar onLogout={onLogout} />
      
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <button 
              className="btn-primary"
              onClick={() => {
                setSelectedStudent(null);
                setIsModalOpen(true);
              }}
            >
              <FaUserPlus /> Add Student
            </button>
            <button className="btn-export" onClick={handleExport}>
              <FaFileExport /> Export Data
            </button>
            <div className="view-toggle">
              <button 
                className={currentView === 'list' ? 'active' : ''}
                onClick={() => setCurrentView('list')}
              >
                List
              </button>
              <button 
                className={currentView === 'grid' ? 'active' : ''}
                onClick={() => setCurrentView('grid')}
              >
                Grid
              </button>
            </div>
          </div>
        </header>

        <div className="controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <div className="filter">
              <FaFilter className="filter-icon" />
              <select
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

        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading student data...</p>
          </div>
        ) : currentView === 'list' ? (
          <div className="students-table">
            <table>
              <thead>
                <tr>
                  <th>Roll No.</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Email</th>
                  <th>Latest Exam</th>
                  <th>Grade</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(student => (
                    <tr key={student.id}>
                      <td>{student.rollNumber}</td>
                      <td>{student.studentName}</td>
                      <td>{student.className}</td>
                      <td>{student.email}</td>
                      <td>
                        {student.exams.length > 0 ? (
                          `${student.exams[0].examName} (${student.exams[0].date})`
                        ) : 'N/A'}
                      </td>
                      <td>
                        <span className={`grade-badge ${student.exams[0]?.grade?.includes('A') ? 'grade-a' : 
                                         student.exams[0]?.grade?.includes('B') ? 'grade-b' : 
                                         student.exams[0]?.grade?.includes('C') ? 'grade-c' : 'grade-d'}`}>
                          {student.exams[0]?.grade || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${student.exams[0]?.status === 'Passed' ? 'passed' : 'failed'}`}>
                          {student.exams[0]?.status || 'N/A'}
                        </span>
                      </td>
                      <td className="actions">
                        <button 
                          className="btn-view"
                          onClick={() => {
                            setSelectedStudent(student);
                            setIsModalOpen(true);
                          }}
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={() => {
                            if (window.confirm(`Delete ${student.studentName}? This cannot be undone.`)) {
                              handleDeleteStudent(student.id);
                            }
                          }}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="no-results">
                    <td colSpan="8">
                      No students found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="students-grid">
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <div key={student.id} className="student-card">
                  <div className="card-header">
                    <h3>{student.studentName}</h3>
                    <span className="roll-number">{student.rollNumber}</span>
                  </div>
                  <div className="card-body">
                    <p><strong>Class:</strong> {student.className}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <div className="exam-summary">
                      {student.exams.length > 0 ? (
                        <>
                          <p><strong>Latest Exam:</strong> {student.exams[0].examName}</p>
                          <div className="progress-container">
                            <span>{student.exams[0].percentage}%</span>
                            <div className="progress-bar">
                              <div 
                                className={`progress-fill ${student.exams[0].percentage < 50 ? 'danger' : 'success'}`}
                                style={{ width: `${student.exams[0].percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <p>No exam records</p>
                      )}
                    </div>
                  </div>
                  <div className="card-footer">
                    <button 
                      className="btn-view"
                      onClick={() => {
                        setSelectedStudent(student);
                        setIsModalOpen(true);
                      }}
                    >
                      <FaEye /> View
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => {
                        if (window.confirm(`Delete ${student.studentName}?`)) {
                          handleDeleteStudent(student.id);
                        }
                      }}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                No students found matching your criteria
              </div>
            )}
          </div>
        )}

        {filteredStudents.length > 0 && (
          <div className="dashboard-footer">
            <p>Showing {filteredStudents.length} of {students.length} students</p>
            <div className="export-options">
              <button className="btn-export">
                <FaDownload /> Download as CSV
              </button>
              <button className="btn-export">
                <FaPrint /> Print Records
              </button>
            </div>
          </div>
        )}
      </main>

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
        onSave={handleSaveStudent}
      />
    </div>
  );
}

export default AdminDashboard;