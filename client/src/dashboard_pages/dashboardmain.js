import React, { Component } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default class dashboardmain extends Component {

    state = {
        profit_total : 0.0,
        cost: 0.0,
        about_to_expire: [],
        fewer_qty: []
    }

    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    

    componentDidMount() {
        axios.get('/dashboard_details').then((result) => {
            this.setState({
                profit_total : result.data.profit,
                cost : result.data.cost,
                about_to_expire : result.data.nearexpiry,
                fewer_qty: result.data.falling_short
            });
        }).catch(err => console.log(err));


        // axios.get('/totalcost').then((result) => {
        //     this.setState({cost : result.data.cost});
        // }).catch(err => console.log(err));


        // axios.get('/abouttoexpire').then((result) => {
        //     this.setState({about_to_expire : result.data.nearexpiry});
        // }).catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <Grid style={{display: 'flex', placeContent: 'center', height: 'inherit', width: 'inherit', padding: '40px'}} container spacing={8}>
                    <Grid item xl={6} md={4} sm={6} xs={12} justifyContent="center" >
                        <Card sx={{ maxWidth: 350, maxHeight: 100, borderLeft: '4px solid #4E73DF' }}>
                            <CardContent>
                                <Typography variant='h10' sx={{fontWeight: 'bold'}}>
                                    Total Profit
                                </Typography>
                                <Typography variant='h6' sx={{fontSize: '2.5rem', color: 'gray'}}>
                                    {this.state.profit_total}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xl={6} md={4} sm={6} xs={12} justifyContent="center" >
                        <Card sx={{ maxWidth: 350, maxHeight: 100, borderLeft: '4px solid #4E73DF' }}>
                            <CardContent>
                                <Typography variant='h10' sx={{fontWeight: 'bold'}}>
                                    Total Cost
                                </Typography>
                                <Typography variant='h6' sx={{fontSize: '2.5rem', color: 'gray'}}>
                                    {this.state.cost}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xl={6} md={4} sm={6} xs={12} justifyContent="center" >
                        <Card sx={{ maxWidth: 350, maxHeight: 100, borderLeft: '4px solid #4E73DF' }}>
                            <CardContent>
                                <Typography variant='h10' sx={{fontWeight: 'bold'}}>
                                    Total Cost
                                </Typography>
                                <Typography variant='h6' sx={{fontSize: '2.5rem', color: 'gray'}}>
                                    {this.state.cost}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <div style={{padding: '40px', display: 'flex', justifyContent: 'space-between'}}>
                    <TableContainer component={Paper} sx={{border: '1px solid gainsboro', maxWidth: 400, borderLeft: '4px solid #4E73DF'}} >
                        <Table sx={{ maxWidth: 400 }} stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight: "bold"}}>Medicine</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}} align="right">Date of expiry</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.about_to_expire.map((items) => {
                                    return (
                                    <TableRow
                                        key={items._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                    >
                                        <TableCell component="th" scope="rows">{items.medicine}</TableCell>
                                        <TableCell align="right" >{new Date(items.dateofexpiry).toLocaleDateString("en-US", this.options)}</TableCell>
                                    </TableRow>);
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer component={Paper} sx={{border: '1px solid gainsboro', maxWidth: 350, borderLeft: '4px solid #4E73DF'}} >
                        <Table sx={{ maxWidth: 350 }} stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight: "bold"}}>Medicine</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}} align="right">Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.fewer_qty.map((items) => {
                                    return (
                                    <TableRow
                                        key={items._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                    >
                                        <TableCell component="th" scope="rows">{items.medicine}</TableCell>
                                        <TableCell align="right" >{items.qty}</TableCell>
                                    </TableRow>);
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </>
        )
    }
}
