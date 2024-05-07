import { InputAdornment, MenuItem, Select, TableCell, TableRow, TextField } from '@mui/material';
import React from 'react';
import { FaEquals, FaGreaterThanEqual, FaLessThanEqual, FaPlus } from 'react-icons/fa';

const SubjectEquations = (props) => {
    return (
        <>
            <TableRow key={-1}>
                <TableCell>Subject to constraints</TableCell>
            </TableRow>
            {props.consCount > 0 &&
                Array.from(Array(props.consCount)).map((v, j) => (
                    <TableRow
                        key={j}
                        align="center"
                    >
                        {props.varCount > 0 &&
                            Array.from(Array(props.varCount)).map((v, i) => (
                                <React.Fragment key={i}>
                                    <TableCell align="center">
                                        <TextField
                                            type="number"
                                            value={(props.A[j] && props.A[j][i]) || ''}
                                            onChange={(e) => props.alterA(j, i, e.target.value)}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">X{i + 1}</InputAdornment>,
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
                        <TableCell align="center">
                            <Select defaultValue="-1">
                                <MenuItem value="-1">
                                    <FaLessThanEqual />
                                </MenuItem>
                                <MenuItem value="0">
                                    <FaEquals />
                                </MenuItem>
                                <MenuItem value="1">
                                    <FaGreaterThanEqual />
                                </MenuItem>
                            </Select>
                        </TableCell>
                        <TableCell align="center">
                            <TextField
                                value={props.b[j] || ''}
                                onChange={(e) => props.alterB(j, e.target.value)}
                                type="number"
                            />
                        </TableCell>
                    </TableRow>
                ))}
        </>
    );
};

export default SubjectEquations;
