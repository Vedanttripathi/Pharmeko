import React, { Component } from 'react'
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


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

export default class updateStocks extends Component {


    state = {
        all_items : [],
        billing_items : [],
        curr: '',
        showfields: false,
        showmodal: false,
        message: ''
    };

    showFields = () => {
        if (this.state.curr) {
            this.setState({showFields: true});
        }
    }


    remove = () => {
        if (this.state.curr) {
            axios.post('/delete', {medicine : this.state.curr.medicine}).then(() => {
                this.setState({showmodal: true, message: 'Successfully removed'});
            }).catch((err) => {
                console.log(err);
            });
            
        }
    }

    modalHandle = () => {
        if (this.state.showmodal) {
            this.setState({ showmodal : false });
        }
    }


    getitems = () => {
        axios.get('/allstock').then((response) => {
            this.setState({ all_items: response.data});
        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.getitems();
    }

    render() {
        return (
            <div style={{display: 'grid', placeContent: 'center', height: 'inherit', width: '100%', padding: '40px'}} container spacing={2}>
                <div style={{display: 'flex', flexDirection: 'row', placeContent: "center", alignItems: "space-around", justifyContent: 'space-around', width: '100%'}}>
                <Autocomplete
                        sx = {{marginRight: '20px', width: 500}}
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
                    {/* <Button sx={{minWidth: 100, marginRight: '20px'}} onClick={() => this.setState({showfields: true})} variant="outlined">SEARCH</Button> */}
                    <Button sx={{minWidth: 100, marginRight: '20px'}} onClick={this.remove} variant="outlined" color='error'>REMOVE</Button>
                </div>
                {/* <div style={{display: this.state.showfields ? 'grid' : 'none', marginTop: '40px'}}>
                <TextField id="outlined-basic" value={this.state.curr.medicine}  style = {{width: 300, marginBottom: '20px'}} variant="outlined"></TextField>
                <TextField id="outlined-basic" value={this.state.curr.company}  style = {{width: 300, marginBottom: '20px'}} variant="outlined"></TextField>
                <TextField id="outlined-basic" value={this.state.curr.qty} style = {{width: 300, marginBottom: '20px'}} variant="outlined"></TextField>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                        <Select
                            sx={{ maxWidth: 120, marginBottom: '20px' }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.curr.unit}
                            label="Unit"
                            onChange={this.unitinput}
                            >
                            <MenuItem value={"Tab"}>Tab</MenuItem>
                            <MenuItem value={"Ampule"}>Ampule</MenuItem>
                            <MenuItem value={"Bottle"}>Bottle</MenuItem>
                        </Select>
                </FormControl>
                <TextField id="outlined-basic" value={this.state.curr.costprice} style = {{width: 300, marginBottom: '20px'}} variant="outlined"></TextField>
                <TextField id="outlined-basic" value={this.state.curr.mrp} style = {{width: 300, marginBottom: '20px'}} variant="outlined"></TextField>
                <TextField id="outlined-basic" value={this.state.curr.salt} style = {{width: 300, marginBottom: '20px'}} variant="outlined"></TextField>
                <div style={{width: 300}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date of Purchase"
                                    value={this.state.curr.dateofpurchase}
                                    onChange={(newValue) => {
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                    </LocalizationProvider>
                </div>
                </div> */}
                <Modal
                    open={this.state.showmodal}
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
            </div>
        )
    }
}
