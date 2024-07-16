import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[ConfirmPassword,setConfirmPassword]=useState('');
  const [Mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== ConfirmPassword) {
      setMessage('Passwords do not match');
      return;}
    if(Mobile.length!==10){
      setMessage('Mobile no. must be of 10 digit');
      return;
    }

    const userData = {
      username,
      email,
      password,
      Mobile
    };

    fetch('http://localhost:8080/api/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (response.ok) {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setMobile('');
        return response.json();
      } else {
        throw new Error('Registration failed!');
      }
    })
    .then(data => {
      console.log('Registration successful:', data);
      setMessage('Registration successful!');
      navigate('/login'); 
    })
    .catch(error => {
      console.error('Error registering user:', error);
      setMessage('Registration failed. Please try again.');
    });
  };

  return (
    <div className="register-page">
    <div className="register-container">
      <h2 className="login-title">Register</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label" htmlFor="username">Username:</label>
        <input
         className="login-input"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="login-label" htmlFor="email">Email:</label>
        <input
         className="login-input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="login-label" htmlFor="password">Password:</label>
        <input
         className="login-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="login-label" htmlFor="ConfirmPassword">Confirm Password:</label>
        <input
         className="login-input"
          type="Password"
          id="ConfirmPassword"
          value={ConfirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label className="login-label" htmlFor="Mobile">Mobile Number:</label>
        <input
         className="login-input"
          type="text"
          id="Mobile"
          value={Mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <div className="login-button-container">
        <button  className="login-button" type="submit">Register</button></div>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
};

export default Register;
