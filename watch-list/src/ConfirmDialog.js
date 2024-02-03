import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = (props) => {

    const handleCloseConfirm = () => {
        props.setOpenConfirm(false);
    };

    const handleDelete = () => {
        props.delete(props.selectedRow.id);
        props.setOpenConfirm(false);
    }


    return (
        <>
            <Dialog
                open={props.openConfirm}
                onClose={handleCloseConfirm}
                setOpenConfirm={props.setOpenConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Operations on Item"}
                </DialogTitle>
                <DialogContent>
                    Id:{props.selectedRow.id} - Tot:{props.selectedRow.tot} - On:{props.selectedRow.date}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => console.log('IT\'S WORKING')}>Open Item</Button>
                    <Button onClick={handleDelete}>Delete Item</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AlertDialog;