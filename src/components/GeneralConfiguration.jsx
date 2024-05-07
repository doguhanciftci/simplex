import { Grid, TextField } from '@mui/material';
import React from 'react';

const GeneralConfiguration = (props) => {
    return (
        <Grid
            container
            style={{ paddingBottom: '16px' }}
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
        >
            <Grid item>
                <TextField
                    value={props.varCount}
                    onChange={(e) => props.setVarCount(e.target.value === '' ? '' : parseInt(e.target.value))}
                    type="number"
                    label="Total Variables"
                />
            </Grid>
            <Grid item>
                <TextField
                    value={props.consCount}
                    onChange={(e) => props.setConsCount(e.target.value === '' ? '' : parseInt(e.target.value))}
                    type="number"
                    label="Total Contraints"
                />
            </Grid>
        </Grid>
    );
};

export default GeneralConfiguration;
