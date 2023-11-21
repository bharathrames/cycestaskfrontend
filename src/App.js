import React, { useState } from 'react';
import Login from './Login';
import Attractions from './Attractions';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <Attractions onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
