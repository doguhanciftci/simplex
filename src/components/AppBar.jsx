import { IconButton, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { FaCalculator } from 'react-icons/fa';

const AppBar = () => {
    return (
        <MuiAppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    style={{
                        marginRight: '16px',
                    }}
                    color="inherit"
                    aria-label="menu"
                >
                    <FaCalculator />
                </IconButton>
                <Typography variant="h6">Revised Simplex Calculator</Typography>
            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;
