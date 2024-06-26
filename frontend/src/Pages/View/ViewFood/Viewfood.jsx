import * as React from 'react';
import { useState, useEffect } from 'react';
import './Viewfood.css';
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

const Viewfood = () => {
    const [foodData, setFoodData] = useState([]);

    const getFoodData = async () => {
        try {
            const response = await axios.get(`${apiURL}/view_food`);
            console.log('API Response:', response.data); // Log dữ liệu nhận được từ API
            setFoodData(response.data);
        } catch (err) {
            console.log('API Error:', err); // Log lỗi nếu có
        }
    };


    useEffect(() => {
        getFoodData();
    }, []);

    return (
        <div className='main-layout'>
            <Sidebar />
            <div className='viewfood-container'>
                <p>Viewfood</p>
                <br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Tên món ăn</StyledTableCell>
                                <StyledTableCell>Chi tiết món ăn</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {foodData.map((food) => (
                                <StyledTableRow key={food.food_id}>
                                    <StyledTableCell component="th" scope="row">
                                        {food.food_name}
                                    </StyledTableCell>
                                    <StyledTableCell>{food.food_detail}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Viewfood;
