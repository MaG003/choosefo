import * as React from 'react';
import { useState, useEffect } from 'react';
import './ViewRestaurant.css';
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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
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

const ViewRestaurant = () => {
    const [restaurantData, setRestaurantData] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [deleteRestaurantName, setDeleteRestaurantName] = useState('');
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    const getRestaurantData = async () => {
        try {
            const response = await axios.get(`${apiURL}/view_restaurant`);
            console.log('API Response:', response.data);
            setRestaurantData(response.data);
        } catch (err) {
            console.log('API Error:', err); // Log lỗi nếu có
        }
    };

    const handleDelete = (restaurantName) => {
        setDeleteRestaurantName(restaurantName);
        setConfirmDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setConfirmDialogOpen(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.post(`${apiURL}/delete_restaurant`, { restaurantname: deleteRestaurantName });
            setSuccessMessage(`Restaurant '${deleteRestaurantName}' deleted successfully!`);
            getRestaurantData(); // Refresh data after deletion
        } catch (error) {
            console.error('There was an error deleting the restaurant!', error);
        } finally {
            setConfirmDialogOpen(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage('');
    };

    useEffect(() => {
        getRestaurantData();
    }, []);

    return (
        <div className='main-layout'>
            <Sidebar />
            <div className='viewfood-container'>
                <p>Nhà hàng</p>
                <br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Tên nhà hàng</StyledTableCell>
                                <StyledTableCell>Địa chỉ</StyledTableCell>
                                <StyledTableCell>Thời gian mở cửa</StyledTableCell>
                                <StyledTableCell>Thời gian đóng cửa</StyledTableCell>
                                <StyledTableCell>Hành động</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurantData.map((restaurant) => (
                                <StyledTableRow key={restaurant.restaurant_id}>
                                    <StyledTableCell component="th" scope="row">
                                        {restaurant.restaurant_name}
                                    </StyledTableCell>
                                    <StyledTableCell>{restaurant.restaurant_local}</StyledTableCell>
                                    <StyledTableCell>{restaurant.restaurant_time_open}</StyledTableCell>
                                    <StyledTableCell>{restaurant.restaurant_time_close}</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => handleDelete(restaurant.restaurant_name)}
                                        >
                                            <DeleteIcon />
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
            <Dialog
                open={confirmDialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <p>Bạn có chắc chắn muốn xóa nhà hàng '{deleteRestaurantName}'?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ViewRestaurant;
