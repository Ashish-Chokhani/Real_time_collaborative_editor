import './App.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const history = useHistory();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUsername(loggedInUser);
    }
  }, []);

  const createNewDoc = () => {
    const id = uuidv4();
    history.push(`/editor/${id}`);
  };

  const joinExistingDoc = () => {
    const id = prompt('Enter the Document ID to join:');
    if (id && id.trim()) {
      history.push(`/editor/${id.trim()}`);
    }
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username');
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <div className="app-header">
            <h1>Welcome to Collaborative Text Editor</h1>
            <div className="user-info">
              <span>Logged in as: {username}</span>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <button onClick={createNewDoc} className="create-doc-button">
            Create New Collaborative Document
          </button>
          <button onClick={joinExistingDoc} className="join-doc-button">
            Join Existing Document
          </button>
        </>
      )}
    </div>
  );
}

export default App;
