import * as React from 'react';
import { useState, useEffect } from 'react';
import './Viewprice.css';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; // Import EditIcon
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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

const Viewprice = () => {
    const [priceData, setPriceData] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const getPriceData = async () => {
        try {
            const response = await axios.get(`${apiURL}/view_price`);
            console.log('API Response:', response.data); // Log dữ liệu nhận được từ API
            setPriceData(response.data);
        } catch (err) {
            console.log('API Error:', err); // Log lỗi nếu có
        }
    };

    const handleDelete = async (foodName, restaurantName) => {
        try {
            await axios.post(`${apiURL}/delete_food`, { name: foodName, restaurantname: restaurantName });
            setSuccessMessage(`Food item '${foodName}' deleted successfully!`);
            getPriceData(); // Refresh the data after deletion
        } catch (error) {
            console.error('There was an error deleting the food item!', error);
        }
    };

    const handleUpdate = (foodName, restaurantName) => {
        // Thực hiện hành động cập nhật ở đây
        console.log(`Update ${foodName} from ${restaurantName}`);
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage('');
    };

    useEffect(() => {
        getPriceData();
    }, []);

    return (
        <div className='main-layout'>
            <Sidebar />
            <div className='viewfood-container'>
                <p>Món ăn</p>
                <br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Tên món ăn</StyledTableCell>
                                <StyledTableCell>Tên nhà hàng</StyledTableCell>
                                <StyledTableCell>Chi tiết món ăn</StyledTableCell>
                                <StyledTableCell>Giá</StyledTableCell>
                                <StyledTableCell>Hành động</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {priceData.map((price) => (
                                <StyledTableRow key={price.ticket_id}>
                                    <StyledTableCell component="th" scope="row">
                                        {price.food_name}
                                    </StyledTableCell>
                                    <StyledTableCell>{price.restaurant_name}</StyledTableCell>
                                    <StyledTableCell>{price.food_detail}</StyledTableCell>
                                    <StyledTableCell>{price.ticket_price}</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => handleDelete(price.food_name, price.restaurant_name)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="update"
                                            onClick={() => handleUpdate(price.food_name, price.restaurant_name)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Viewprice;
