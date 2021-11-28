import React, { Component } from 'react'
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default class stocks extends Component {

    state = {
        rows: []
    }

    fetchData = () => {
        axios.get('/allstock').then((response) => {
            // console.log(response.data);
            this.setState({ rows: response.data});
        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    datechecker = (date) => {
        let present_date = new Date();
        let expiry_date = new Date(date);

        let res = expiry_date.getTime() - present_date.getTime();
        let days = res.toFixed(0);

        return days;
    }


    indicator = (item) => {

        let days = this.datechecker(item.dateofexpiry);

        if (days < 32) {
            return "goldenrod";
        }

        switch(item.unit) {
            case "Tab" : if (item.qty < 21) {
                            return "red";
                        }
                        else {
                            return "black";
                        }
                        break;

            case "Ampule" : if (item.qty < 6) {
                                return "red";
                            }
                            else {
                                return "black";
                            }
                            break;
            
            case "Bottles" : if (item.qty < 6) {
                                return "red";
                            }
                            else {
                                return "black";
                            }
                            break;
        }
    }

    render() {
        // console.log('here', this.state.rows)
        return (
            <div style={{display: 'grid', placeContent: 'center', marginTop: '50px', padding: '0px 30px'}}>
                <TableContainer component={Paper} sx={{border: '1px solid gainsboro'}} >
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: "bold"}}>Medicine</TableCell>
                                <TableCell sx={{fontWeight: "bold"}} align="right">Company</TableCell>
                                <TableCell sx={{fontWeight: "bold"}} align="right">Salt</TableCell>
                                <TableCell sx={{fontWeight: "bold"}} align="right">Quantity</TableCell>
                                <TableCell sx={{fontWeight: "bold"}} align="right">Unit</TableCell>
                                <TableCell sx={{fontWeight: "bold"}} align="right">Cost</TableCell>
                                <TableCell sx={{fontWeight: "bold"}} align="right">MRP</TableCell>
                                <TableCell sx={{fontWeight: "bold"}} align="right">Profit</TableCell>
                                <TableCell sx={{fontWeight: "bold"}} align="right">Total Profit</TableCell>
                                <TableCell sx={{fontWeight: "bold"}} align="right">Reference</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map((items) => {
                                return (<TableRow
                                    key={items._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell  sx={{ color: () => this.indicator(items)}} component="th" scope="rows">
                                        {items.medicine}
                                    </TableCell>
                                    <TableCell align="right" sx={{ color: () => this.indicator(items)}}>{items.company}</TableCell>
                                    <TableCell align="right" sx={{ color: () => this.indicator(items)}}>{items.salt}</TableCell>
                                    <TableCell align="right" sx={{ color: () => this.indicator(items)}}>{items.qty}</TableCell>
                                    <TableCell align="right" sx={{ color: () => this.indicator(items)}}>{items.unit}</TableCell>
                                    <TableCell align="right" sx={{ color: () => this.indicator(items)}}>{items.costprice}</TableCell>
                                    <TableCell align="right" sx={{ color: () => this.indicator(items)}}>{items.mrp}</TableCell>
                                    <TableCell align="right" sx={{ color: () => this.indicator(items)}}>{items.profit}</TableCell>
                                    <TableCell align="right" sx={{ color: () => this.indicator(items)}}>{items.profitqty}</TableCell>
                                    <TableCell align="right" sx={{ color: () => this.indicator(items)}}>{items.reference}</TableCell>
                                </TableRow>);
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}
