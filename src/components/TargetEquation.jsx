import { InputAdornment, MenuItem, Select, TableCell, TableRow, TextField } from '@mui/material';
import React from 'react';
import { FaEquals, FaPlus } from 'react-icons/fa';

const TargetEquation = (props) => {
    return (
        <TableRow>
            <TableCell align="center">
                <Select
                    value={props.type}
                    onChange={(e) => props.setType(e.target.value)}
                >
                    <MenuItem value="Max">Max Z</MenuItem>
                    <MenuItem value="Min">Min Z</MenuItem>
                </Select>
            </TableCell>
            <TableCell align="center">
                <FaEquals />
            </TableCell>
            {props.varCount > 0 &&
                Array.from(Array(props.varCount)).map((v, i) => (
                    <React.Fragment key={i}>
                        <TableCell align="center">
                            <TextField
                                type="number"
                                value={props.c[i] || ''}
                                onChange={(e) => props.alterC(i, e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            X<sub>{i + 1}</sub>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </TableCell>
                        {i < props.varCount - 1 && (
                            <TableCell align="center">
                                <FaPlus />
                            </TableCell>
                        )}
                    </React.Fragment>
                ))}
        </TableRow>
    );
};

export default TargetEquation;
