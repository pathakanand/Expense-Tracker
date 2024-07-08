import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };

    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Login failed!');
      }
    })
    .then(data => {
      console.log('Login successful:', data);
      setMessage('Login successful!');
      navigate('/expenses'); // Redirect to ExpenseTracker page
    })
    .catch(error => {
      console.error('Error logging in:', error);
      setMessage('Login failed. Please try again.');
    });
  };

  return (
    <div class="login-page">
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-field">
          <label className="login-label" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-field">
          <label className="login-label" htmlFor="password" aria-placeholder='********'>Password:</label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <h3 >
          Don't have Account??<a href='http://localhost:3000/register'>SignUp</a>
        </h3>
        <div className="login-button-container">
          <button type="submit" className="login-button">Login</button>
        </div>
      </form>
      {message && <p className="login-message">{message}</p>}
    </div>
    </div>
  );
};

export default Login;
