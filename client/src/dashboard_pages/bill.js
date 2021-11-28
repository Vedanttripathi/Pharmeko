import React, { Component } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';


export default class bill extends Component {

    state = {
        all_items : [],
        billing_items : [],
        curr: '',
        data: [],
        qty: 1,
        logout: false,
        total: 0.0,
    };

    logout = () => {
        console.log('working');
        window.sessionStorage.setItem("isLoggedIn", false);
        this.setState({ logout : true });
        // this.render();
    }

    generateTotal = () => {
        let totalamt = this.state.total;
        totalamt = totalamt + (this.state.curr.mrp * this.state.qty);
        this.setState({ total : totalamt });
    }

    onAddclick = () => {
        this.generateTotal();
        let list = this.state.billing_items;
        list.push({
            medicine: this.state.curr.medicine,
            mrp: this.state.curr.mrp,
            qty: this.state.qty,
            leftStock: this.state.curr.qty - this.state.qty
        });
        this.setState({ billing_items : list });
    }

    quantity = (e) => {
        this.setState({ qty : parseInt(e.target.value) });
    }


    getitems = () => {
        axios.get('/allstock').then((response) => {
            this.setState({ all_items: response.data});
            this.setState({ data: response.data });
        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.getitems();
    }


    render() {

        if (!window.sessionStorage.getItem("isLoggedIn") || this.state.logout) {
            return <Redirect to='/' />
        }
        
        return (
            <div style={{ padding: '40px'}} >
                <div style={{display: 'flex', placeContent: 'center', height: 'inherit', width: 'inherit'}}>
                    <Autocomplete
                        sx = {{marginRight: '20px'}}
                        onChange={(event, value) => this.setState({ curr: this.state.all_items.find(element => element.medicine === value) })}
                        fullWidth
                        id="free-solo-2-demo"
                        disableClearable
                        options={this.state.all_items.map((result) => {
                            return result.medicine;
                        })}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search input"
                            InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            }}
                        />
                        )}
                    />
                    <TextField id="outlined-basic" label='Quantity' style = {{width: 150, margin: '0px 20px 0px 0px'}} variant="outlined" onChange={this.quantity}  ></TextField>
                    <Button sx={{minWidth: 100}} onClick={this.onAddclick} variant="contained">ADD</Button>
                    
                </div>
                <TableContainer component={Paper} sx={{border: '1px solid gainsboro', marginTop: '40px', maxHeight: 450, minHeight: 450}} >
                        <Table sx={{ minWidth: 650, maxHeight: 500 }} stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight: "bold"}}>Medicine</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}} align="right">MRP</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}} align="right">Quantity</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}} align="right">Discount</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}} align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.billing_items.map((item) => {
                                    return (<TableRow
                                        key={item._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                        >
                                        <TableCell component="th" scope="rows">
                                            {item.medicine}
                                        </TableCell>
                                        <TableCell align="right" >{item.mrp}</TableCell>
                                        <TableCell align="right" >{this.state.qty}</TableCell>
                                        <TableCell align="right" >6%</TableCell>
                                        <TableCell align="right" >{item.mrp * this.state.qty}</TableCell>
                                    </TableRow>);
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'baseline' }}>
                        <h3>Total : </h3>
                        <p style={{ padding: '6px' }}>{this.state.total}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                        { window.sessionStorage.getItem("role") === 'Staff' ? <Button sx={{minWidth: 100, margin: '20px 20px 0px 0px' }} onClick={this.logout} variant="contained">LOGOUT</Button> : <div></div> }
                        <Link 
                            to={{
                            pathname: '/print',
                            state: this.state
                        }}>
                            <Button sx={{minWidth: 100, marginTop: '20px'}} variant="contained">PRINT</Button>
                        </Link>
                    </div>
            </div>
        )
    }
}




