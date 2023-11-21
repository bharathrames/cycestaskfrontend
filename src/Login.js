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
        // Store the access token and expiration time in localStorage
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
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '300px', margin: 'auto', marginTop: '50px' }}>
      <h2>Login</h2>
      <TextField
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" onClick={handleLogin} style={{ marginTop: '20px' }}>
        Login
      </Button>
      <Button variant="outlined" onClick={fillUserCredentials} style={{ marginTop: '10px' }}>
        User Credentials
      </Button>
    </Paper>
  );
};

export default Login;
