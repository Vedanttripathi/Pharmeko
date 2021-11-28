import React, { Component } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default class preview extends Component {
    render() {
        return (
            <div style={{display: 'grid', placeContent: 'center'}}>
                <TableContainer component={Paper} sx={{border: '1px solid gainsboro', marginTop: '40px', minHeight: 450, maxWidth: 1000}} >
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
                                {this.props.props.billing_items.map((item) => {
                                    return (<TableRow
                                        key={item._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                        >
                                        <TableCell component="th" scope="rows">
                                            {item.medicine}
                                        </TableCell>
                                        <TableCell align="right" >{item.mrp}</TableCell>
                                        <TableCell align="right" >{this.props.props.qty}</TableCell>
                                        <TableCell align="right" >6%</TableCell>
                                        <TableCell align="right" >{item.mrp * this.props.props.qty}</TableCell>
                                    </TableRow>);
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'baseline' }}>
                        <h3>Total : </h3>
                        <p style={{ padding: '6px' }}>{this.props.props.total}</p>
                    </div>
            </div>
        )
    }
}
