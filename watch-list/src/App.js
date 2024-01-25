import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import { Typography, Alert } from '@mui/material';
import { useState } from 'react';

function App() {
  const [logged, setLogged] = useState(false);
  const [utente, setUtente] = useState({
    username: '',
    password: ''
  });
  const loggedIn = () => {
    setLogged(true);
  }

  const logOut = () => {
    localStorage.removeItem('token');
    setLogged(false);
  }
  return (
    <div className="App">
      {logged ? <Dashboard setLoggedOut={logOut} /> :
        <>
          <header className="App-header">
            <Typography variant="h3" component="h3" style={{ colo: 'cornflowerblue' }}>
              TRACKING APP
            </Typography>
            <Login
              setUtente={setUtente}
              loggedIn={loggedIn}
            />
          </header>
        </>}
    </div>
  );
}

export default App;
