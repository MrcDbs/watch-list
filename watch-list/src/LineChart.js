import React from "react";
import { Dialog, DialogTitle } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Chart = (props) => {



    return (
        <>
            <Dialog onClose={props.handleClose} open={props.open}>
                <DialogTitle>Chart</DialogTitle>
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
                <LineChart
                    xAxis={[{ data: [11, 22, 33, 55, 88, 100] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </Dialog>
        </>
    );
}

export default Chart;