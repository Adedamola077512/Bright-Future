import { useState } from 'react';
import { FaUser, FaLock, FaSignInAlt, FaUserShield, FaUserGraduate } from 'react-icons/fa';
import './Login.css';
import schoolLogo from '../assets/logo.webp';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const users = {
    admin: {
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    },
    student1: {
      username: 'student1',
      password: 'student123',
      role: 'student',
      studentId: 1
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const user = Object.values(users).find(
        u => u.username === formData.username && 
             u.password === formData.password && 
             u.role === formData.role
      );

      if (user) {
        onLogin({
          role: user.role,
          studentId: user.studentId,
          username: user.username,
          isAuthenticated: true
        });
      } else {
        throw new Error('Invalid credentials for selected role');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-brand">
            <img src={schoolLogo} alt="School Logo" className="logo" />
            <h1>Bright Future Academy</h1>
            <p>Result Management System</p>
          </div>
          <div className="login-illustration">
            <div className="book"></div>
            <div className="pencil"></div>
            <div className="ruler"></div>
          </div>
        </div>

        {/* Enhanced login form container with shadow */}
        <div className="login-form-container">
          <div className="login-card">
            <div className="login-header">
              <h2>School Result System</h2>
              <p>Welcome! Please login to continue</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="role-selector">
                <button
                  type="button"
                  className={`role-btn ${formData.role === 'admin' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, role: 'admin', username: ''})}
                >
                  <FaUserShield className="icon" />
                  Admin
                </button>
                <button
                  type="button"
                  className={`role-btn ${formData.role === 'student' ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, role: 'student', username: ''})}
                >
                  <FaUserGraduate className="icon" />
                  Student
                </button>
              </div>

              <div className="form-fields-container">
                <div className="input-container">
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      placeholder={formData.role === 'admin' ? 'Admin username' : 'Student username'}
                      required
                    />
                  </div>
                </div>

                <div className="input-container">
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Enter password"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="login-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="spinner"></span>
                  ) : (
                    <>
                      <FaSignInAlt className="me-2" /> Login
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="login-footer">
              <p>Forgot password? Contact your administrator</p>
              <p>© {new Date().getFullYear()} School Result System</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;