import { useState } from 'react';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import schoolLogo from '../assets/logo.webp';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === 'admin' && password === 'admin123') {
      onLogin(true);
    } else {
      setError('Invalid username or password');
    }
    setIsLoading(false);
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
        
        <div className="login-right">
          <div className="login-card">
            <h2>Welcome Back!</h2>
            <p>Please login to continue</p>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group floating">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder=" "
                />
                <label htmlFor="username">
                  <FaUser className="icon" /> Username
                </label>
              </div>
              
              <div className="form-group floating">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder=" "
                />
                <label htmlFor="password">
                  <FaLock className="icon" /> Password
                </label>
              </div>
              
              <button type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? (
                  <span className="spinner"></span>
                ) : (
                  <>
                    <FaSignInAlt className="me-2" /> Login
                  </>
                )}
              </button>
            </form>
            
            <div className="login-footer">
              <p>Forgot password? <a href="#reset">Reset here</a></p>
              <p>© 2023 Bright Future Academy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;