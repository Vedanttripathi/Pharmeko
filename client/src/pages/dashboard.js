import React, { Component } from 'react'
import Drawer from '@mui/material/Drawer/Drawer';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography/Typography'
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import './dashboard.css';
import { Divider } from '@mui/material';
import Stocks from '../dashboard_pages/stocks';
import Bill from '../dashboard_pages/bill';
import AddStocks from '../dashboard_pages/addStocks';
import Dashboardmain from '../dashboard_pages/dashboardmain';
import UpdateStocks from '../dashboard_pages/updateStocks';
import { Box } from '@mui/system';
import { Redirect } from "react-router";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';



class Dashboard extends Component {

    drawerWidth = 250;

    state = {
        component: <Dashboardmain />,
        logout: false
    }

    logout = () => {
        console.log('working');
        window.sessionStorage.setItem("isLoggedIn", false);
        this.setState({ logout : true });
        // this.render();
    }
    
    render() {
        if (!window.sessionStorage.getItem("isLoggedIn") || this.state.logout) {
            return <Redirect to='/' />
        }
        return (
            <div className='dasboard'>
                <Drawer
                PaperProps={{
                    sx: {
                      backgroundColor: "#4B9CFF",
                      color: "white",
                    }
                  }}
                className='drawer'
                variant='permanent'
                anchor='left'
                style={{width: '500px', backgroundColor: 'gray'}}
                classes={{ paper: 'drawer' }}
                >
                    <Typography variant='h6' style={{ padding: '24px 30px', fontWeight: 'medium' }}>Dashboard</Typography>
                    <Divider style={{backgroundColor: "ghostwhite"}} />
                    <List>
                        <ListItem style={{ padding: '10px 40px' }} button onClick={() => this.setState({ component : <Dashboardmain /> })}>
                            <ListItemText primary='Dashboard'  />
                        </ListItem>
                        <ListItem style={{ padding: '10px 40px' }} button onClick={() => this.setState({ component : <Stocks /> })}>
                            <ListItemText primary='Stock' />
                        </ListItem>
                        <ListItem style={{ padding: '10px 40px' }} button onClick={() => this.setState({ component : <Bill /> })}>
                            <ListItemText primary='Billing'  />
                        </ListItem>
                        <ListItem style={{ padding: '10px 40px' }} button onClick={() => this.setState({ component : <AddStocks /> })}>
                            <ListItemText primary='Add Stock'  />
                        </ListItem>
                        <ListItem style={{ padding: '10px 40px' }} button onClick={() => this.setState({ component : <UpdateStocks /> })}>
                            <ListItemText primary='Remove Stock'  />
                        </ListItem>
                    </List>
                </Drawer>
                <div style={{width: `calc(100% - ${this.drawerWidth}px)`, marginLeft: this.drawerWidth, height: '100vh'}}>
                    <AppBar  position="sticky" elevation={1} style={{padding: 20, backgroundColor: "white", display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Typography variant="h4" color="black" style={{ fontWeight: 400 }}>
                            Pharmeko
                        </Typography>
                        <LogoutOutlinedIcon style={{color: 'black'}} onClick={this.logout}/>
                    </AppBar>
                    <Box >
                        {this.state.component}
                    </Box>
                </div>
                
            </div>
        )
    }
}


export default Dashboard;




// appbar : sx={{ width: `calc(100% - ${this.drawerWidth}px)`, ml: `${this.drawerWidth}px` }}
// component Box : sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${this.drawerWidth}px)` } }}