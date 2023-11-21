import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://www.melivecode.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('expiresIn', data.expiresIn);

        onLogin();
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const fillUserCredentials = () => {
    setUsername('karn.yong@melivecode.com');
    setPassword('melivecode');
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #FFD700, #FFA500)', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '300px', background: 'white' }}>
      <h2 style={{ textAlign: 'center' }}>CRUD OPERATIONS</h2>
      <h4 style={{ textAlign: 'center' }}>SIGN IN</h4>
      <p style={{ textAlign: 'center' }}>Enter your Credentials to access your account</p>
      <TextField
        label="Enter your email"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Enter your Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" onClick={handleLogin} style={{ marginTop: '20px', width: '100%', background: 'linear-gradient(to right, #FFD700, #FFA500)' }}>
        Login
      </Button>
      <Button variant="outlined" onClick={fillUserCredentials} style={{ marginTop: '10px', width: '100%', color: '#000' }}>
        User Credentials
      </Button>
      <h5 style={{ textAlign: 'center' }}>Forgot user password?<span ><button style={{ color: '#FFD700' ,background: "transparent",border: "none"}}>Reset password</button></span> </h5>
    </Paper>
  </div>
  );
};

export default Login;
