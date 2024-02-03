import React, { useEffect, useState } from "react";
import FormDialog from "./FormDialog";
import { Box, Tab } from '@mui/material';
import { TabPanel, TabList, TabContext } from '@mui/lab';
import { getAll, savePost, deleteById } from './FetchEndPoint';
import InputForm from "./InputForm";

const Tabs = (props) => {
    const [value, setValue] = useState('1');
    const [save, setSave] = useState(false);
    const [progressList, setProgressList] = useState({
        1: {
            descrizione: 'IBKR',
            quantita: undefined
        },
        2: {
            descrizione: 'MNFR',
            quantita: undefined
        },
        3: {
            descrizione: 'BCPS',
            quantita: undefined
        },
        4: {
            descrizione: 'RLVT',
            quantita: undefined
        },
        5: {
            descrizione: 'LDGR',
            quantita: undefined
        },
        6: {
            descrizione: 'BITP',
            quantita: undefined
        },
        7: {
            descrizione: 'UPHD',
            quantita: undefined
        }
    });
    //const [last, setLast] = useState(false);
    useEffect(() => {
        if (save) {
            createEntityList();
        }
    }, [save])
    useEffect(() => {
        console.log('PROGRESS LIST :', progressList);
    }, [progressList]);

    const checkFields = () => {
        for (let i = 1; i < 7; i++) {
            if (progressList[i].quantita === undefined) {
                console.log('quantita: ', progressList[i].quantita);
                return true;
            }
        }
        return false;
    }

    const createEntityList = () => {
        let entitiesList = [];
        for (let i = 1; i < 8; i++) {
            entitiesList.push(progressList[i]);
        }
        console.log('entities: ', JSON.stringify(entitiesList));

        props.saveProgress(entitiesList);
    }

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };

    const addToList = (progress, idTab) => {
        setProgressList((progressList) => ({ ...progressList, [idTab]: progress }));
        // const newArray = [...progressList, {
        //     idTab: idTab,
        //     progress: progress
        // }];
        // setprogressList(newArray);

    }


    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTabs}
                        aria-label="lab API tabs example"
                        variant="scrollable"
                        scrollButtons="auto">
                        <Tab label="IBKR" value="1" />
                        <Tab label="MNFR" value="2" />
                        <Tab label="BCPS" value="3" />
                        <Tab label="RVLT" value="4" />
                        <Tab label="LDGR" value="5" />
                        <Tab label="BITP" value="6" />
                        <Tab label="UPHD" value="7" />
                    </TabList>
                </Box>
                <TabPanel value="1"><InputForm last={false} nextTab={handleChangeTabs} value={value} handleClose={props.handleClose} addToList={addToList} progressList={progressList} checkFields={checkFields} /></TabPanel>
                <TabPanel value="2"><InputForm last={false} nextTab={handleChangeTabs} value={value} handleClose={props.handleClose} addToList={addToList} progressList={progressList} checkFields={checkFields} /></TabPanel>
                <TabPanel value="3"><InputForm last={false} nextTab={handleChangeTabs} value={value} handleClose={props.handleClose} addToList={addToList} progressList={progressList} checkFields={checkFields} /></TabPanel>
                <TabPanel value="4"><InputForm last={false} nextTab={handleChangeTabs} value={value} handleClose={props.handleClose} addToList={addToList} progressList={progressList} checkFields={checkFields} /></TabPanel>
                <TabPanel value="5"><InputForm last={false} nextTab={handleChangeTabs} value={value} handleClose={props.handleClose} addToList={addToList} progressList={progressList} checkFields={checkFields} /></TabPanel>
                <TabPanel value="6"><InputForm last={false} nextTab={handleChangeTabs} value={value} handleClose={props.handleClose} addToList={addToList} progressList={progressList} checkFields={checkFields} /></TabPanel>
                <TabPanel value="7"><InputForm last={true} nextTab={handleChangeTabs} value={value} handleClose={props.handleClose} addToList={addToList} progressList={progressList} checkFields={checkFields} setSave={setSave} /></TabPanel>
            </TabContext>
        </Box>
    );
}

export default Tabs;