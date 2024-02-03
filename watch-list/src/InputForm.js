import React, { useEffect, useState } from "react";

import { Dialog, DialogTitle, FormControl, TextField, InputLabel, OutlinedInput, InputAdornment, DialogContent, Button, Alert, Box, Tab } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const InputForm = (props) => {
    const [progress, setProgress] = useState({});
    const [alertOpen, setAlertOpen] = useState(false);
    const [saveDisabled, setSavedDisabled] = useState(false);

    useEffect(() => { }, [alertOpen]);
    useEffect(() => { }, [saveDisabled]);
    useEffect(() => { setProgress(props.progressList[props.value]) }, []);
    useEffect(() => {
        console.log('CHANGE TAB USE EFFECT ', props.value + " " + JSON.stringify(props.progressList[props.value]));
        console.log('SAVED DISABLED ', saveDisabled);
        // setSavedDisabled(props.checkFields());
    }, []);


    const closeAlert = () => {
        setAlertOpen(false);
    }
    const handleChange = (event) => {
        console.log(typeof event.target.value);
        setProgress((progress) => ({ ...progress, [event.target.id]: event.target.value }));
    }

    const handleSave = () => {
        props.addToList(progress, 7);
        // if (progress.quantita !== undefined) {
        //     props.saveProgress(progress);
        //     props.handleClose();
        // }
        console.log('check field progress ', props.progressList[props.value]);
        if (!props.checkFields()) {
            props.setSave(true);
            // props.saveProgress(progress);
            props.handleClose();
        } else {
            setSavedDisabled(true);
        }

        //setAlertOpen(true);

    }

    const handleNext = (event, value) => {
        if (progress.quantita !== undefined) {
            const result = parseInt(value, 10) + 1;
            props.addToList(progress, parseInt(value, 10));
            props.nextTab(event, String(result));
        } else {
            setAlertOpen(true);
        }

    }

    const closeAlert2 = () => {
        setSavedDisabled(false);
    }
    return (
        <>
            <IconButton
                aria-label="close"
                onClick={() => {
                    closeAlert();
                    props.handleClose()
                }}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            {/* <FormControl sx={{ m: 1 }}>
                <TextField
                    id="descrizione"
                    label="Source"
                    variant="outlined"
                    onChange={(event) => handleChange(event)} />
            </FormControl> */}
            <FormControl sx={{ m: 1 }}>
                <TextField
                    id="quantita"
                    type="number"
                    placeholder="€"
                    // label="€"
                    value={progress.quantita}
                    onChange={(event) => handleChange(event)}
                />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
                {props.last ? < Button variant="contained" type="submit" sx={{ marginTop: '15px' }} onClick={(event) => handleSave(event)} disabled={progress.quantita === undefined || progress.quantita === ''}>Save</Button> : <Button variant="outlined" type="submit" sx={{ marginTop: '15px' }} onClick={(event) => handleNext(event, props.value)}>Next</Button>}
            </FormControl >
            {alertOpen ? <Alert severity="warning" onClose={closeAlert}>Empty fields</Alert> : <></>
            }
            {saveDisabled && props.value === '7' ? <Alert severity="warning" onClose={closeAlert2}>Some fields are empty</Alert> : <></>
            }
        </>
    );
}

export default InputForm;