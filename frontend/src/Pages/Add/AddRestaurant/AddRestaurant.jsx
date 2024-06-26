import * as React from 'react';
import { useState } from 'react';
import './AddRestaurant.css';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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
    const [foodName, setFoodName] = useState('');
    const [foodDetail, setFoodDetail] = useState('');
    const [price, setPrice] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [address, setAddress] = useState('');
    const [operationTime, setOperationTime] = useState('');
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async () => {
        const data = {
            Foodname: foodName,
            Fooddetail: foodDetail,
            Price: price,
            Restaurantname: restaurantName,
            Restaurantlocal: address,
            OperationTime: operationTime,
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/add_food_v2', data);
            console.log(response.data);
            setSuccessMessage('Food item added successfully!');
            handleReset();
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const handleReset = () => {
        setFoodName('');
        setFoodDetail('');
        setPrice('');
        setRestaurantName('');
        setAddress('');
        setOperationTime('');
        setFile(null);
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage('');
    };

    return (
        <div className='main-layout'>
            <Sidebar />
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <Box sx={{ bgcolor: '#e8f5fa', height: '80vh' }}>
                        <div className='viewfood-container'>
                            <p>Thêm nhà hàng</p>
                        </div>
                        <Container fixed>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={6}>
                                    <TextField 
                                        fullWidth 
                                        margin="normal" 
                                        label="Tên" 
                                        required 
                                        value={foodName}
                                        onChange={(e) => setFoodName(e.target.value)}
                                    />
                                    <TextField 
                                        fullWidth 
                                        margin="normal" 
                                        label="Chi tiết món ăn" 
                                        required 
                                        value={foodDetail}
                                        onChange={(e) => setFoodDetail(e.target.value)}
                                    />
                                    <TextField 
                                        fullWidth 
                                        margin="normal" 
                                        label="Giá" 
                                        type="number" 
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <TextField 
                                        disabled 
                                        fullWidth 
                                        margin="normal" 
                                        label="Ảnh" 
                                        required 
                                    />
                                    <Button
                                        component="label"
                                        variant="contained"
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload file
                                        <VisuallyHiddenInput 
                                            type="file" 
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField 
                                        fullWidth 
                                        margin="normal" 
                                        label="Nhà hàng" 
                                        required 
                                        value={restaurantName}
                                        onChange={(e) => setRestaurantName(e.target.value)}
                                    />
                                    <TextField 
                                        fullWidth 
                                        margin="normal" 
                                        label="Địa chỉ" 
                                        required 
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    <TextField 
                                        fullWidth 
                                        margin="normal" 
                                        label="Thời gian hoạt động" 
                                        required 
                                        value={operationTime}
                                        onChange={(e) => setOperationTime(e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                            <Button 
                                variant="contained"
                                sx={{ mt: 3, marginLeft: "auto", display: "block" }}
                                onClick={handleSubmit}
                            >
                                AddFood
                            </Button>
                        </Container>
                    </Box>
                </Container>
                <Snackbar
                    open={!!successMessage}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        {successMessage}
                    </Alert>
                </Snackbar>
            </React.Fragment>
        </div>
    );
};

export default Addfood;
