import React, { Component } from 'react';
import Preview from './preview';
import Button from '@mui/material/Button/Button';
import ReactToPrint from 'react-to-print';
import Grid from '@mui/material/Grid/Grid';
import axios from "axios";
import { Redirect } from "react-router";

 
class print extends Component {

    state = {
        redirect: false
    }

    setredirect = (data) => {
        axios.post('/update', {billed: data.billing_items}).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
        this.setState({redirect: true});
    }

    // updateStock = (data) => {
    //     // console.log('here')
    //     axios.post('/update', {billed: data.billing_items}).then((res) => {
    //         console.log(res);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
        
    // }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/dashboard' />
        }
        const { state } = this.props.location;
        const pagestyle = `
        @page {
            margin: 15mm 0mm;
            size: A4;
            height: 100%;
            width: 100%;
        }
        @media print{ body{ -webkit-print-color-adjust: exact; } }
        `;
        // this.updateStock(state); 
        return (
            <div>
                <Preview props={state}  ref={el => (this.componentRef = el)} />
                <Grid container direction={'row'} style={{width: '1000', padding: '40px', display: 'flex', justifyContent: 'flex-end'}}>
                    <Grid item >
                        <ReactToPrint pageStyle={pagestyle}
                            trigger={() => {
                            return <Button size='large' color='success' variant="contained">Print</Button>;
                        }}
                        content={() => this.componentRef}
                        onAfterPrint={() => this.setredirect(state)}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default print


