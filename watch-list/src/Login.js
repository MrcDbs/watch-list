import React from 'react';
import { Grid, Box, Button, TextField, Input, InputLabel, FormControl, CircularProgress, Alert } from '@mui/material';
import { login, register } from './FetchEndPoint';
import { useState } from 'react';

const Login = (props) => {

    // const [username,setUsername] = useState('');
    // const [password,setPassword] = useState('');
    const [hasUsernameValidationError, setHasUsernameValidationError] = useState(false);
    const [validationErrorMessage, setValidationErrorMessage] = useState(null);
    const [response, setResponse] = useState(null);
    const [responseStatus, setResponseStatus] = useState(0);
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event) => {
        console.log(event.target.value);
        let regex = (/^[A-Z a-z]+$/);
        //let name = event.target.id;
        if (event.target.value.length > 0) {
            setHasUsernameValidationError(!regex.test(event.target.value));
            setValidationErrorMessage('Formato non corretto');
        }
        setUser((user) => ({ ...user, [event.target.id]: event.target.value }));
    }

    const handleSubmitLogin = (event) => {
        setResponse('');
        event.preventDefault();
        console.log(user);
        login(user)
            .then(res => {
                console.log("Entra in THEN");
                setResponse(res.data);
                setResponseStatus(res.status);
                props.setUtente(res.data);
                setUser({
                    username: '',
                    password: ''
                })
                props.loggedIn();
                console.log('RESPONSE ', res);
            })
            .catch(error => {
                console.log('ERRORE ', error);
                setResponse(error.response);
                setResponseStatus(error.response.status);
                console.log('QUESTO `E LO STATUS CODE RITORNATO', error.response.status);
            })
            ;
        let r = response;
        console.log(' ** QUESTO è RES DI TIPO ' + typeof r + ' ***', JSON.stringify(response));
    }

    const makeSpin = () => {
        return (
            <>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box></>
        )
    }
    return (


        <>
            {(responseStatus === 400 || responseStatus === 401) ? <Alert severity="error">{response}</Alert> : <></>}

            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <FormControl sx={{ m: 0 }}>
                        <TextField
                            error={hasUsernameValidationError}
                            onChange={(event) => handleChange(event)}
                            required={true}
                            size={'medium'}
                            id="username"
                            label="Username"
                            type="search"
                            variant="standard"
                            value={user.username}

                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    {/* <br />
                    <br /> */}
                    <FormControl sx={{ m: 0 }}>
                        <TextField
                            onChange={(event) => handleChange(event)}
                            required={true}
                            size={'medium'}
                            id="password"
                            label="Password"
                            type="password"
                            variant="standard"
                            value={user.password}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <FormControl >
                        <Button variant="contained" type="submit" sx={{ marginTop: '15px' }} onClick={(event) => handleSubmitLogin(event)}>Log In</Button>
                    </FormControl></Grid></Grid>
            {response === '' ? makeSpin() : <></>}
            {responseStatus === 200 ? <Alert severity="success">{response.username} Successfully logged in</Alert> : <></>}
        </>
    )
}

export default Login;