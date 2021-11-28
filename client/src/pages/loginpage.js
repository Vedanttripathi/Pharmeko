import React, {Component} from "react";
import Box from '@mui/material/Box/Box';
import TextField from "@mui/material/TextField/TextField";
import './loginpage.css';
import { Grid } from "@mui/material";
import Button from "@mui/material/Button/Button";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography/Typography'
import axios from "axios";
import { Redirect } from "react-router";


class Loginpage extends Component {

    axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };

    state = {
        name : '',
        password : '',
        loggedIn: false,
        role: '',
        message: ''
    }

    onNameChange = (event) => {
        this.setState({ name : event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password : event.target.value });
    }

    onLogin = () => {
        axios.post('/login', {
            name: this.state.name,
            password: this.state.password
        }).then((response) => {
            // console.log(loggedin);
            if (response.data.loggedin) {
                window.sessionStorage.setItem("isLoggedIn", response.data.loggedin);
                window.sessionStorage.setItem("role", response.data.role);
                this.setState({ 
                    loggedIn: response.data.loggedin,
                    role: response.data.role,
                    name: '',
                    password: ''
                 });
            }
            else {
                this.setState({ loggedIn: response.data.loggedin, message: 'Either the username or the password is incorrect' });
            }
        }).catch((err) => {
            console.log(err);
            // Set the loggedin to false here otherwise it will alwasy login in user even if they are not supposed to be.
            this.setState({ loggedIn: false, message: 'Either the username or the password is incorrect' });
        });
        // this.setState({ loggedIn : true })
    }


    render() {
        if (this.state.loggedIn && this.state.role === 'Admin') {
           return <Redirect to='/dashboard' />
        }
        if (this.state.loggedIn && this.state.role === 'Staff') {
           return <Redirect to='/billing' />
        }

        // Add another if condition here for retail login
        return (
            <>
            <AppBar position="static" color='primary' style={{padding: 20}}>
                <Typography variant="h4" color="inherit" style={{ fontWeight: 400 }}>
                    Pharmeko
                </Typography>
            </AppBar>
            <Grid container justify="center" direction="column" alignItems="center" justifyContent="center" className='login-page-main'>
                <Grid item xl={6} md={6} sm={12} xs={12}  className='login-page-inner-left' style={{display: 'grid', placeContent: 'center'}}>
                    <h1 className='login-page-logo'>Pharmeko !</h1>
                </Grid>
                <Grid item xl={6} md={6} sm={12} xs={12} className='login-page-inner-right'>
                    <Box sx={{ p: 2, border: '1px solid gainsboro', height: 450, width: 350, display: 'grid', placeContent: 'center', borderRadius: 2}}>
                        <p className='red'>{this.state.message}</p>
                        <TextField id="outlined-basic" label='Name' style = {{width: 'inherit', marginTop: 20, marginBottom: 20}} variant="outlined" onChange={this.onNameChange}></TextField>
                        <TextField  type="password" label='Password' style = {{width: 'inherit', marginBottom: 60}} variant="outlined" onChange={this.onPasswordChange}></TextField>
                        <Button onClick={this.onLogin} variant="outlined">Login</Button>
                    </Box>
                </Grid>
            </Grid>
            </>
        );
    }
}


export default Loginpage;