import { useState, useEffect } from 'react';
import { FaSignOutAlt, FaPrint, FaDownload, FaChartLine, FaCalendarAlt, FaUser, FaBook, FaAward } from 'react-icons/fa';
import './StudentDashboard.css'; // We'll create this CSS file

const StudentDashboard = ({ studentId, onLogout }) => {
  const [studentData, setStudentData] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('current'); // 'current' or 'all'
  const [selectedExam, setSelectedExam] = useState(null);

  // Mock data - replace with real API calls
  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock database
        const mockStudents = [
          {
            id: 1,
            name: 'John Smith',
            rollNumber: 'S2023001',
            class: 'Grade 12 Science',
            email: 'john.smith@school.edu',
            avatar: 'JS',
            results: [
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
              // More exam results...
            ]
          },
          // More students...
        ];

        const student = mockStudents.find(s => s.id === studentId);
        if (student) {
          setStudentData(student);
          setAllResults(student.results);
          setSelectedExam(student.results[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('PDF download functionality would go here');
    // In a real app: generate PDF and trigger download
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your academic records...</p>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="error-container">
        <h2>No student data found</h2>
        <p>Please contact the administration if this is an error</p>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Student Academic Portal</h1>
          <button onClick={onLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      {/* Profile Section */}
      <section className="profile-section">
        <div className="profile-card">
          <div className="avatar">{studentData.avatar}</div>
          <div className="profile-info">
            <h2>{studentData.name}</h2>
            <p><FaUser /> {studentData.rollNumber}</p>
            <p><FaBook /> {studentData.class}</p>
            <p><FaAward /> Overall Performance: 84.5% (A)</p>
          </div>
        </div>
      </section>

      {/* Results Navigation */}
      <nav className="results-nav">
        <button 
          className={activeTab === 'current' ? 'active' : ''}
          onClick={() => setActiveTab('current')}
        >
          Current Results
        </button>
        <button 
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('all')}
        >
          All Results
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="results-container">
        {/* Exam Selector (for mobile/tablet) */}
        <div className="exam-selector">
          <select 
            value={selectedExam?.examId || ''}
            onChange={(e) => {
              const exam = allResults.find(r => r.examId === parseInt(e.target.value));
              setSelectedExam(exam);
            }}
          >
            {allResults.map((exam) => (
              <option key={exam.examId} value={exam.examId}>
                {exam.examName} ({exam.date})
              </option>
            ))}
          </select>
        </div>

        {/* Exam List (for desktop) */}
        <div className="exam-list">
          {allResults.map((exam) => (
            <div 
              key={exam.examId}
              className={`exam-card ${selectedExam?.examId === exam.examId ? 'active' : ''}`}
              onClick={() => setSelectedExam(exam)}
            >
              <h3>{exam.examName}</h3>
              <p><FaCalendarAlt /> {exam.date}</p>
              <div className="progress-indicator">
                <div 
                  className="progress-bar"
                  style={{ width: `${exam.percentage}%` }}
                ></div>
              </div>
              <span className="grade-badge">{exam.grade}</span>
            </div>
          ))}
        </div>

        {/* Exam Details */}
        {selectedExam && (
          <div className="exam-details">
            <div className="exam-header">
              <h2>{selectedExam.examName}</h2>
              <div className="exam-actions">
                <button onClick={handlePrint} className="action-btn">
                  <FaPrint /> Print
                </button>
                <button onClick={handleDownload} className="action-btn">
                  <FaDownload /> Download
                </button>
              </div>
            </div>

            <div className="exam-summary">
              <div className="summary-card">
                <h3>Overall Score</h3>
                <div className="percentage-circle">
                  <span>{selectedExam.percentage}%</span>
                </div>
                <p>Grade: {selectedExam.grade}</p>
                <p>Status: {selectedExam.status}</p>
              </div>

              <div className="subject-breakdown">
                <h3>Subject-wise Performance</h3>
                <div className="subject-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Score</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedExam.subjects.map((subject) => (
                        <tr key={subject.name}>
                          <td>{subject.name}</td>
                          <td>{subject.score}/{subject.maxScore}</td>
                          <td>{((subject.score / subject.maxScore) * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="performance-graph">
              <h3>Performance Trend</h3>
              <div className="graph-placeholder">
                <FaChartLine className="graph-icon" />
                <p>Visual representation of performance over time</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© {new Date().getFullYear()} School Result System - Student Portal</p>
        <p>For any discrepancies, please contact the examination department within 7 days</p>
      </footer>
    </div>
  );
};

export default StudentDashboard;