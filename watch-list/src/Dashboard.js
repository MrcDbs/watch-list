import React, { useEffect, useState } from "react";
import './App.css';
import { DataGrid } from '@mui/x-data-grid';

import { Typography, Button, Box, ButtonGroup } from '@mui/material';
import Chart from "./LineChart";
import { getAll, savePost, deleteById, getAllProgress, deleteProgressById, updateProgress } from './FetchEndPoint';
import FormDialog from "./FormDialog";
import RefreshIcon from '@mui/icons-material/Refresh';
import Tabs from "./tabs";
import AlertDialog from "./ConfirmDialog";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const Dashboard = (props) => {

    const [total, setTotal] = useState(0);
    const [rows, setRows] = useState([]);

    const mapArray = (arg) => {
        let arr = [];
        arg.forEach((a) => {
            arr.push({
                id: a.id,
                dtProgress: new Date(a.dtProgress),
                ammount: a.ammount
            });
        })
        return arr;
    }
    // ************************** GET ALL PROGRESS ********************************************
    const fetchData = async () => {
        // let res = await getAll();
        let res = await getAllProgress();
        console.log('res dopo getAllProgress ', res);
        setRows(mapArray(res));
        console.log('rows dopo fetchData', res);
        let tot = res.length;
        //res.forEach((r => tot = tot + r.quantita));
        setTotal(tot);
        console.log('total :', total)
    }
    //useEffect(() => { console.log('EFFECT DOPO FETCH DATA ', rows) }, [rows]);
    useEffect(() => {
        fetchData();
        //console.log('arr dopo fetch ', rows);
        //console.log('ENTRO DENTRO USE EFFECT DASHBOARD ', JSON.stringify(rows));

    }, [total]);

    const updateProg = (id, params) => {
        updateProg(id, params);
        fetchData();
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 10 },
        // {
        //     field: 'source',
        //     headerName: 'Src',
        //     width: 115,
        //     editable: false,
        // },
        {
            field: 'dtProgress',
            headerName: 'Date',
            type: 'date',
            width: 130,
            editable: false
        },
        {
            field: 'ammount',
            headerName: 'Ammount',
            type: 'number',
            width: 150,
            editable: false,
            renderCell: 'custom-cell-class'

        },
    ];
    const renderColoredText = (params) => {
        let amm = params.value.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
        // Customize the color based on your condition
        const textColor = params.value < 50000 ? 'red' : 'green';
        console.log('params.ammount ', params.value)

        return textColor === 'green' ? <div style={{ color: textColor }}>{amm}<ArrowUpwardIcon /></div> :
            <div style={{ color: textColor }}>{amm}<ArrowDownwardIcon /></div>;
    };
    const customColumns = columns.map((column) => {
        // Apply the custom rendering function only to the 'age' column
        if (column.field === 'ammount') {
            return {
                ...column,
                renderCell: renderColoredText,
            };
        }

        return column;
    });

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
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedRow, setSelectedRow] = useState({
        id: 0,
        date: '',
        tot: 0
    });

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
        args.forEach(i => i.data_inserimento = new Date().toISOString().slice(0, 10));
        // args.id = rows.length + 1;
        // args.total = total + Number(args.quantita);

        savePost(args);
        console.log("SAVING PROGRESS TO DB ", args);
        fetchData();
    }

    const handleRowClick = (params) => {
        // let ans = window.confirm("Eliminare questo record?");
        handleOpenConfirmDialog();
        setSelectedRow({
            id: params.row.id,
            date: params.row.dtProgress.toISOString().slice(0, 10),
            tot: params.row.ammount
        })
        console.log('Clicked row data:', params.row);
        // if (ans) {
        //     deleteProgressById(params.row.id);
        //     fetchData();
        // }

    }
    const handleOpenConfirmDialog = () => {
        setOpenConfirm(true);
    };


    return (
        <>
            <div style={{ paddinLeft: 2, paddingRight: 2, boxShadow: '0 5 15 0' }}>
                <Box sx={{ height: 40, width: '100%' }}>
                    {/* <Typography variant="h5" align="left" ml={2} mt={2}>
                        Total: {total.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}
                        <Button variant="outlined" style={{ marginLeft: 27 }} onClick={handleClickOpen}>Show Chart</Button>
                    </Typography> */}
                    <Button variant="outlined" style={{ marginLeft: 27 }} onClick={handleClickOpen}>Show Chart</Button>
                    <RefreshIcon sx={{ marginLeft: '20px' }} onClick={fetchData} />
                </Box>
                <Box sx={{ height: [rows.length > 4 ? 465 : 350], width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        // columns={columns}
                        columns={customColumns}
                        pageSize={10}
                        pagination
                        onRowClick={handleRowClick}
                    // sx={{
                    //     '& .MuiDataGrid-cell': (theme) => ({
                    //         color: theme.props.columns.field === 'ammount' ? 'green' : 'black'
                    //     }),
                    //     fontWeight: 'bold'
                    // }}

                    //pageSizeOptions={[6]}
                    />
                </Box>
                <ButtonGroup >
                    <Button variant="contained" onClick={handleClickOpenForm}>ADD</Button>
                    <Button variant="outlined" onClick={props.setLoggedOut}>LOG OUT</Button>
                </ButtonGroup>
            </div>
            <Chart open={openChart} handleClose={handleCloseChart} />
            {/* <Tabs open={openForm} handleClose={handleCloseForm} saveProgress={saveProgress} /> */}
            <FormDialog open={openForm} handleClose={handleCloseForm} saveProgress={saveProgress} />
            <AlertDialog setOpenConfirm={setOpenConfirm} openConfirm={openConfirm} selectedRow={selectedRow} delete={deleteProgressById} />
        </>
    );
}


export default Dashboard;