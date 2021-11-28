import React, { Component } from 'react'
import Grid from '@mui/material/Grid/Grid';
import TextField from '@mui/material/TextField/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Fab from '@mui/material/Fab';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const initialstate = {
    company_name: '',
    medicine_name: '',
    salt_name: '',
    qty: 0,
    cost_price: 0.0,
    mrp: 0.0,
    date_of_purchase: null,
    date_of_expiry: null,
    profit: 0,
    unit: 'Unit',
    profit_qty: 0,
    reference: '',
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: 'white',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#121212',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default class addStocks extends Component {

    state = {
        company_name: '',
        medicine_name: '',
        salt_name: '',
        qty: 0,
        cost_price: 0,
        mrp: 0,
        date_of_purchase: null,
        date_of_expiry: null,
        profit: 0,
        unit: "Tab",
        profit_qty: 0,
        reference: '',
        open: false,
        message: ''
    }

    companyinput = (e) => {
        this.setState({ company_name : e.target.value });
    }

    medicineinput = (e) => {
        this.setState({ medicine_name : e.target.value });
    }

    quantityinput = (e) => {
        const quantity = parseInt(e.target.value)
        this.setState({ qty : quantity });
    }

    unitinput = (e) => {
        this.setState({ unit : e.target.value });
    }

    costinput = (e) => {
        const cost = parseFloat(e.target.value)
        this.setState({ cost_price : cost });
    }

    mrpinput = (e) => {
        const mrp = parseFloat(e.target.value)
        this.setState({ mrp : mrp });
    }

    unitinput = (e) => {
        this.setState({ unit : e.target.value });
    }
    
    saltinput = (e) => {
        this.setState({ salt_name : e.target.value });
    }

    referenceinput = (e) => {
        this.setprofit();
        this.setState({ reference : e.target.value });
    }

    setprofit = () => {
        const profit = this.state.mrp - this.state.cost_price;
        const total_profit = this.state.qty * profit;

        this.setState({
            profit : profit,
            profit_qty : total_profit
        });
    }

    modalHandle = () => {
        if (this.state.open) {
            this.setState({ open : false });
        }
    }

    onAdd = () => {

        const profit = this.state.mrp - this.state.cost_price;
        const total_profit = this.state.qty * profit;

        axios.post('/addstocks', {
            company: this.state.company_name,
            medicine: this.state.medicine_name,
            salt: this.state.salt_name,
            qty: this.state.qty,
            costprice: this.state.cost_price,
            mrp: this.state.mrp,
            dateofpurchase: this.state.date_of_purchase,
            dateofexpiry: this.state.date_of_expiry,
            profit: profit,
            unit: this.state.unit,
            profitqty: total_profit,
            reference: this.state.reference
        }).then(() => {
            this.setState(initialstate);
            this.setState({ open: true, message: 'Items saved successfully'});
        }).catch((err) => {
            this.setState(initialstate);
            this.setState({ open: false, message: 'Failed to save items !'});
        })

    }

    render() {
        return (
            <>
                <Grid style={{ height: 'inherit', width: 'inherit', padding: '40px'}} container  spacing={2} >
                    <Grid item xl={6} md={6} sm={6} xs={12} justifyContent="center" style={{margin: '20px 0px' }}>
                        <TextField id="outlined-basic" label='Company Name' style = {{width: 400}} variant="outlined" onChange={this.companyinput} value={this.state.company_name} ></TextField>
                    </Grid>
                    <Grid item xl={6} md={6} sm={6} xs={12} justifyContent="center" style={{margin: '20px 0px' }}>
                        <TextField id="outlined-basic" label='Medicine Name' style = {{width: 300}} variant="outlined" onChange={this.medicineinput} value={this.state.medicine_name} ></TextField>
                    </Grid>
                    <Grid item xl={3} md={3} sm={6} xs={12} justifyContent="center" style={{margin: '20px 0px' }}>
                        <TextField id="outlined-basic" label='Quantity' style = {{width: 200}} variant="outlined" onChange={this.quantityinput} value={this.state.qty} ></TextField>
                    </Grid>
                    <Grid item xl={3} md={2} sm={6} xs={12} justifyContent="center" style={{margin: '20px 0px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                            <Select
                                sx={{ minWidth: 120 }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.unit}
                                label="Unit"
                                onChange={this.unitinput}
                                >
                                <MenuItem value={"Tab"}>Tab</MenuItem>
                                <MenuItem value={"Ampule"}>Ampule</MenuItem>
                                <MenuItem value={"Bottle"}>Bottle</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xl={3} md={2} sm={6} xs={12} justifyContent="center" style={{margin: '20px 0px' }}>
                        <TextField id="outlined-basic" label='Cost' style = {{width: 120}} variant="outlined" onChange={this.costinput}  ></TextField>
                    </Grid>
                    <Grid item xl={3} md={3} sm={6} xs={12} justifyContent="center" style={{margin: '20px 0px' }}>
                        <TextField id="outlined-basic" label='MRP' style = {{width: 200}} variant="outlined" onChange={this.mrpinput}  ></TextField>
                    </Grid>
                    <Grid item xl={3} md={3} sm={6} xs={12} justifyContent="center" style={{margin: '20px 0px' }}>
                        <TextField id="outlined-basic" label='Salt name' style = {{width: 200}} variant="outlined" onChange={this.saltinput} value={this.state.salt_name} ></TextField>
                    </Grid>
                    <Grid item xl={3} md={3} sm={6} xs={12} justifyContent="center" style={{margin: '20px 0px' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Purchase"
                                value={this.state.date_of_purchase}
                                onChange={(newValue) => {
                                this.setState({ date_of_purchase : newValue });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xl={3} md={3} sm={6} xs={12} justifyContent="center" style={{margin: '20px 0px' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Expiry"
                                value={this.state.date_of_expiry}
                                onChange={(newValue) => {
                                this.setState({ date_of_expiry : newValue });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xl={3} md={3} sm={6} xs={12} justifyContent="center" style={{margin: '20px 0px' }}>
                        <TextField id="outlined-basic" label='Reference' style = {{width: 200}} variant="outlined" onChange={this.referenceinput} value={this.state.reference} ></TextField>
                    </Grid>
                </Grid>
                <Grid container direction={'row'} style={{width: 'inherit', padding: '40px', display: 'flex', justifyContent: 'flex-end'}}>
                    <Grid item>
                        <Fab variant="extended" color="primary" style={{width: 150}} onClick={this.onAdd}>
                            ADD
                        </Fab>
                    </Grid>
                </Grid>
                <Modal
                    open={this.state.open}
                    onClose={this.modalHandle}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {this.state.message}
                    </Typography>
                    </Box>
                </Modal>
            </>
        )
    }
}
