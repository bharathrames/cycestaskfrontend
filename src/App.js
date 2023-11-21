import React, { useState } from 'react';
import Login from './Login';
import Attractions from './Attractions';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {loggedIn ? (
        <Attractions />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
