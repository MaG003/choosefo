import * as React from 'react';
import { useState, useEffect } from 'react';
import './Addfood.css';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import apiURL from '../../../instances/apiConfig';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Addfood = () => {
    return (
        <div className='main-layout'>
            <Sidebar />
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <Box sx={{ bgcolor: '#e8f5fa', height: '80vh' }}>
                        <div className='viewfood-container'>
                            <p>Addfood</p>
                        </div>
                        <Container fixed>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={6}>
                                    <TextField fullWidth margin="normal" label="Tên" required />
                                    <TextField fullWidth margin="normal" label="Chi tiết món ăn" required />
                                    <TextField fullWidth margin="normal" label="Giá" type="number"/>
                                    <TextField disabled fullWidth margin="normal" label="Ảnh" required />
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload file
                                        <VisuallyHiddenInput type="file" />
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth margin="normal" label="Nhà hàng" required />
                                    <TextField fullWidth margin="normal" label="Địa chỉ" required />
                                    <TextField fullWidth margin="normal" label="Thời gian hoạt động" required />
                                </Grid>
                            </Grid>

                            <Button variant="contained"
                                sx={{
                                    mt: 3,
                                    marginLeft: "auto",
                                    display: "block",
                                }}>AddFood
                            </Button>
                        </Container>
                    </Box>
                </Container>
            </React.Fragment>
        </div>
    );
};

export default Addfood;
