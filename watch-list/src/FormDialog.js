import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, FormControl, TextField, InputLabel, OutlinedInput, InputAdornment, DialogContent, Button, Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const FormDialog = (props) => {
    const [progress, setProgress] = useState({});
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => { }, [alertOpen]);


    const closeAlert = () => {
        setAlertOpen(false);
    }
    const handleChange = (event) => {
        console.log(event.target.value);
        setProgress((progress) => ({ ...progress, [event.target.id]: event.target.value }));
    }

    const handleSave = () => {
        if (progress.descrizione !== undefined && progress.quantita !== undefined) {
            props.saveProgress(progress);
            props.handleClose();
        }
        setAlertOpen(true);

    }
    return (
        <>
            <Dialog onClose={props.handleClose} open={props.open}>
                <DialogTitle>Save Progress</DialogTitle>
                <DialogContent>
                    <IconButton
                        aria-label="close"
                        onClick={props.handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <FormControl sx={{ m: 1 }}>
                        <TextField
                            id="descrizione"
                            label="Source"
                            variant="outlined"
                            onChange={(event) => handleChange(event)} />
                    </FormControl>
                    <FormControl sx={{ m: 1 }}>
                        <TextField
                            id="quantita"
                            type="number"
                            label="€"
                            onChange={(event) => handleChange(event)}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1 }}>
                        <Button variant="contained" type="submit" sx={{ marginTop: '15px' }} onClick={(event) => handleSave(event)}>Save</Button>
                    </FormControl>
                    {alertOpen ? <Alert severity="warning" onClose={closeAlert}>Empty fields</Alert> : <></>}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default FormDialog;