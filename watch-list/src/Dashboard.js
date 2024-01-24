import React, { useEffect, useState } from "react";

import { DataGrid } from '@mui/x-data-grid';

import { Typography, Button, Box, ButtonGroup } from '@mui/material';
import Chart from "./LineChart";
import { getAll, savePost, deleteById } from './FetchEndPoint';
import FormDialog from "./FormDialog";


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
    }

    useEffect(() => {
        fetchData();
        //console.log('arr dopo fetch ', rows);
        //console.log('ENTRO DENTRO USE EFFECT DASHBOARD ', JSON.stringify(rows));

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

    const [openChart, setOpenChart] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    const handleClickOpen = () => {
        setOpenChart(true);
    };

    const handleCloseChart = (value) => {
        setOpenChart(false);
    };

    const handleClickOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = (value) => {
        setOpenForm(false);
    };

    const saveProgress = (args) => {
        args.id = rows.length + 1;
        args.total = total + Number(args.quantita);
        args.data_inserimento = new Date().toISOString().slice(0, 10);
        savePost(args);
        console.log("SAVING PROGRESS TO DB ", args);
        fetchData();
    }

    const handleRowClick = (params) => {
        let ans = window.confirm("Eliminare questo record?");
        console.log('Clicked row data:', params.row.id + " " + ans);
        if (ans) {
            deleteById(params.row.id);
            fetchData();
        }

    }


    return (
        <>
            <div style={{ paddinLeft: 2, paddingRight: 2, boxShadow: '0 5 15 0' }}>
                <Box sx={{ height: 40, width: '100%' }}>
                    <Typography variant="h5" align="left" ml={2} mt={2}>
                        Total: {total.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                        <Button variant="outlined" style={{ marginLeft: 27 }} onClick={handleClickOpen}>Show Chart</Button>
                    </Typography>

                </Box>
                <Box sx={{ height: [rows.length > 4 ? 465 : 350], width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={7}
                        onRowClick={handleRowClick}
                    //pageSizeOptions={[6]}
                    />
                </Box>
                <ButtonGroup >
                    <Button variant="contained" onClick={handleClickOpenForm}>ADD</Button>
                    <Button variant="outlined" onClick={props.setLoggedOut}>LOG OUT</Button>
                </ButtonGroup>
            </div>
            <Chart open={openChart} handleClose={handleCloseChart} />
            <FormDialog open={openForm} handleClose={handleCloseForm} saveProgress={saveProgress} />
        </>
    );
}


export default Dashboard;