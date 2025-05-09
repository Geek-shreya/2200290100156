import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button 
          color="inherit" 
          component={Link} 
          to="/"
          sx={{ marginRight: 2 }}
        >
          Stock Prices
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/correlation"
        >
          Correlation Heatmap
        </Button>
      </Toolbar>
    </AppBar>
  );
}