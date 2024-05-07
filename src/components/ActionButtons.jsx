import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { FaCalculator, FaPlayCircle } from 'react-icons/fa';

const ActionButtons = (props) => {
    return (
        <TableRow>
            <TableCell
                align="center"
                colSpan={props.varCount * 2}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={props.calculate}
                    endIcon={<FaCalculator />}
                >
                    Calculate
                </Button>
            </TableCell>
            <TableCell
                align="center"
                colSpan={1}
            >
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={props.example}
                    endIcon={<FaPlayCircle />}
                >
                    Example
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default ActionButtons;
