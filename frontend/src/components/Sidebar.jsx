import React from 'react'

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Bloodtype, LocalHospital, Home, HeartBroken, Cancel } from '@mui/icons-material'

import { Link  } from 'react-router-dom'

const drawerWidth = 240;

function Sidebar() {
    return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            <Divider />
            <List>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to='/'>
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText primary='Home' />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={Link} to='/accustrip'>
                    <ListItemIcon>
                      <Bloodtype />
                    </ListItemIcon>
                    <ListItemText primary='Accustrip URS reader' />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={Link} to='/cardio'>
                    <ListItemIcon>
                      <HeartBroken />
                    </ListItemIcon>
                    <ListItemText primary='Cardio' />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={Link} to='/todo'>
                    <ListItemIcon>
                      <Cancel />
                    </ListItemIcon>
                    <ListItemText primary='Page for another medical device' />
                  </ListItemButton>
                </ListItem>
            </List>
            <Divider />
          </Drawer>
        </Box>
      );
}

export default Sidebar