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
  return (
    <div className="App">
      {logged ? <Dashboard /> :
        <>
          <Typography variant="h2" component="h2">
            Tracking App
          </Typography>
          <header className="App-header">
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
