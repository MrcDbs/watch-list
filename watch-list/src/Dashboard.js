import React, { useEffect, useState } from "react";

import { DataGrid } from '@mui/x-data-grid';

import { Typography, Button, Box, ButtonGroup } from '@mui/material';
import Chart from "./LineChart";
import { getAll } from './FetchEndPoint';


const Dashboard = (props) => {

    const [total, setTotal] = useState(0);
    const [rows, setRows] = useState([]);

    const mapArray = (arg) => {
        let arr = [];
        arg.forEach((a) => {
            arr.push({
                id: a.id,
                source: a.descrizione,
                lastUpdate: new Date(a.data_inserimento),
                ammount: a.quantita
            });
        })
        return arr;
    }

    const fetchData = async () => {
        let res = await getAll();
        console.log('res dopo getAll ', res);
        setRows(mapArray(res));
        let tot = 0;
        res.forEach((r => tot = tot + r.quantita));
        setTotal(tot);

        //return res;
    }

    useEffect(() => {
        //let arr = [];

        fetchData();
        console.log('arr dopo fetch ', rows);




        console.log('ENTRO DENTRO USE EFFECT DASHBOARD ', JSON.stringify(rows));

    }, []);


    const columns = [
        { field: 'id', headerName: 'ID', width: 10 },
        {
            field: 'source',
            headerName: 'Src',
            width: 115,
            editable: false,
        },
        {
            field: 'lastUpdate',
            headerName: 'Date',
            type: 'date',
            width: 100,
            editable: false,
        },
        {
            field: 'ammount',
            headerName: 'Amm',
            type: 'number',
            width: 130,
            editable: false,
        },
    ];

    // const rows = [
    //     { id: 1, source: 'IBK', lastUpdate: new Date(), ammount: 5000 },
    //     { id: 2, source: 'MF', lastUpdate: new Date(), ammount: 19431 },
    //     { id: 3, source: 'BP', lastUpdate: new Date(), ammount: 5000 },
    //     { id: 4, source: 'BITP', lastUpdate: new Date(), ammount: 19431 },
    //     { id: 5, source: 'REV', lastUpdate: new Date(), ammount: 5000 },
    //     { id: 6, source: 'UPH', lastUpdate: new Date(), ammount: 19431 },
    // ];

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <>
            <div style={{ paddinLeft: 2, paddingRight: 2, boxShadow: '0 5 15 0' }}>
                <Box sx={{ height: 40, width: '100%' }}>
                    <Typography variant="h5" align="left" ml={2} mt={2}>
                        Total: {total.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                        <Button variant="outlined" style={{ marginLeft: 27 }} onClick={handleClickOpen}>Show Chart</Button>
                    </Typography>

                </Box>
                <Box sx={{ height: 425, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={6}
                    //pageSizeOptions={[6]}
                    />
                </Box>
                <ButtonGroup >
                    <Button variant="contained">ADD</Button>
                    <Button variant="contained">DELETE</Button>
                    <Button variant="outlined">LOG OUT</Button>
                </ButtonGroup>
            </div>
            <Chart open={open} handleClose={handleClose} />
        </>
    )
}

export default Dashboard;