import {
    AppBar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import * as math from 'mathjs';
import React, { useEffect, useState } from 'react';
import { FaCalculator, FaEquals, FaGreaterThanEqual, FaLessThanEqual, FaPlayCircle, FaPlus } from 'react-icons/fa';

function App() {
    const [varCount, setVarCount] = useState(2);
    const [consCount, setConsCount] = useState(3);

    const [A, setA] = useState(Array.from(Array(3), () => new Array(2).fill(0)));

    const [c, setC] = useState(Array.from(Array(2).fill(0)));
    const [b, setB] = useState(Array.from(Array(3).fill(0)));

    const [type, setType] = useState('Max');

    const [solution, setSolution] = useState([]);

    useEffect(() => {
        if (consCount >= 0 && varCount > 0) {
            let newA = Array.from(Array(consCount), () => new Array(varCount).fill(0));
            newA.forEach((row, row_index) => {
                if (A[row_index]) {
                    newA[row_index] = A[row_index];
                }
            });
            setA(newA);

            let newB = Array.from(Array(consCount));
            setB(newB);

            let newC = Array.from(Array(varCount));
            setC(newC);
        }
        // eslint-disable-next-line
    }, [varCount, consCount]);

    const alterA = (row, col, value) => {
        value = value === '' ? 0 : parseInt(value);
        let newA = [...A];
        newA[row][col] = value;
        setA(newA);
    };

    const alterB = (row, value) => {
        value = value === '' ? 0 : parseInt(value);
        let newB = [...b];
        newB[row] = value;
        setB(newB);
    };

    const alterC = (row, value) => {
        value = value === '' ? 0 : parseInt(value);
        let newC = [...c];
        newC[row] = value;
        setC(newC);
    };

    const iteration = (m_A, c_all, non_basic, basic, b_inv, xb) => {
        let m_cn = non_basic.map((n) => c_all[n]);
        let m_cb = basic.map((b) => c_all[b]);

        let N = math.column(m_A, non_basic[0]);
        for (var i = 1; i < non_basic.length; i++) {
            N = math.concat(N, math.column(m_A, non_basic[i]));
        }

        let w = math.multiply(m_cb, b_inv);
        // let zn = math.multiply(w, m_A);
        let zn = math.multiply(w, N);
        let zn_cn = math.subtract(zn, m_cn);
        let entering_value = math.min(zn_cn);
        if (entering_value >= 0) {
            console.log('no negative values');
            return 0;
        }
        let entering_index = zn_cn.toArray().indexOf(entering_value);
        console.log(`x${entering_index + 1} enters the basis with ${entering_value}`);

        // let a2 = math.column(m_A, entering_index);
        let a2 = math.column(N, entering_index);
        let y2 = math.multiply(b_inv, a2);

        let ratios = [];
        for (var j = 0; j < y2._size[0]; j++) {
            ratios.push(xb.get([j]) / y2.valueOf()[j][0]);
        }
        let leaving_index = ratios.indexOf(math.min(ratios));
        console.log(`x${varCount + leaving_index + 1} leaves the basis`);

        let n = y2.map(function (value, index, matrix) {
            if (index[0] === leaving_index) {
                return 1 / value;
            } else {
                return (-1 * value) / matrix.get([leaving_index, 0]);
            }
        });

        let e = math.identity(consCount);

        e = e.map(function (value, index, matrix) {
            if (index[1] === leaving_index) {
                return n.get([index[0], 0]);
            } else {
                return value;
            }
        });

        b_inv = math.multiply(e, b_inv);

        let entering_variable = non_basic[entering_index];
        let leaving_variable = basic[leaving_index];

        non_basic[entering_index] = leaving_variable;
        basic[leaving_index] = entering_variable;

        return [non_basic, basic, b_inv, entering_variable, leaving_variable];
    };

    const calculate = () => {
        setSolution((oldSolution) => [
            ...oldSolution,
            <Typography
                align="center"
                variant="h3"
            >
                Solution
            </Typography>,
        ]);
        let m_A = math.matrix(A);
        m_A = math.concat(m_A, math.identity(consCount));

        let non_basic = Array.from({ length: varCount }, (_, i) => i);
        let basic = Array.from({ length: consCount }, (_, i) => i + varCount);

        let c_all = [...c].concat(Array.from(Array(consCount).fill(0)));

        let xb = math.matrix(b);
        let b_inv = math.identity(consCount);
        let iter = 0;
        while (true) {
            iter += 1;
            console.log('İteration #' + iter);
            let text = 'Step #' + iter;
            let result = iteration(m_A, c_all, non_basic, basic, b_inv, xb);
            if (result === 0) {
                setSolution((oldSolution) => [
                    ...oldSolution,
                    <div>
                        <Card>
                            <CardHeader title={text} />
                            <CardContent>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>No negative values</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Current basis is OPTIMAL</TableCell>
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                        <Typography
                            align="center"
                            variant="h3"
                        >
                            End of Solution
                        </Typography>
                    </div>,
                ]);
                break;
            } else {
                let entering_var, leaving_var;
                [non_basic, basic, b_inv, entering_var, leaving_var] = result;

                xb = math.multiply(b_inv, math.matrix(b));
                let z = math.multiply(
                    basic.map((b) => c_all[b]),
                    xb
                );

                let basicPrint = [...basic];
                let nonBasicPrint = [...non_basic];
                setSolution((oldSolution) => [
                    ...oldSolution,
                    <Card>
                        <CardHeader title={text} />
                        <CardContent>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Basic Variables</TableCell>
                                            {basicPrint.map((b) => (
                                                <TableCell>x{b + 1}</TableCell>
                                            ))}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Non-Basic Variables</TableCell>
                                            {nonBasicPrint.map((b) => (
                                                <TableCell>x{b + 1}</TableCell>
                                            ))}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Entering Variable</TableCell>
                                            <TableCell>x{entering_var + 1}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Leaving Variable</TableCell>
                                            <TableCell>x{leaving_var + 1}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Z</TableCell>
                                            <TableCell>{z}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                        </CardContent>
                        <CardActions></CardActions>
                    </Card>,
                ]);
            }
        }

        console.log('doguhan');
    };

    const example = () => {
        setVarCount(2);
        setConsCount(3);
        setA([
            [1, 0],
            [0, 2],
            [3, 2],
        ]);
        setB([4, 12, 18]);
        setC([3, 5]);
    };

    return (
        <div
            style={{
                backgroundColor: 'white',
                width: '100%',
            }}
        >
            <AppBar position="static">
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
            </AppBar>
            <br />
            <br />
            <Grid
                container
                style={{ paddingBottom: '16px' }}
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                <Grid item>
                    <TextField
                        value={varCount}
                        onChange={(e) => setVarCount(e.target.value === '' ? '' : parseInt(e.target.value))}
                        type="number"
                        label="Total Variables"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        value={consCount}
                        onChange={(e) => setConsCount(e.target.value === '' ? '' : parseInt(e.target.value))}
                        type="number"
                        label="Total Contraints"
                    />
                </Grid>
            </Grid>
            <Divider />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                <Select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <MenuItem value="Max">Max Z</MenuItem>
                                    <MenuItem value="Min">Min Z</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell align="center">
                                <FaEquals />
                            </TableCell>
                            {/* <TableCell align='center'><FaEquals /></TableCell> */}
                            {varCount > 0 &&
                                Array.from(Array(varCount)).map((v, i) => (
                                    <>
                                        <TableCell
                                            key={i}
                                            align="center"
                                        >
                                            <TextField
                                                type="number"
                                                value={c[i] || ''}
                                                onChange={(e) => alterC(i, e.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            X<sub>{i + 1}</sub>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                        {i < varCount - 1 && (
                                            <TableCell align="center">
                                                <FaPlus />
                                            </TableCell>
                                        )}
                                    </>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={-1}>
                            <TableCell>Subject to constraints</TableCell>
                        </TableRow>
                        {consCount > 0 &&
                            Array.from(Array(consCount)).map((v, j) => (
                                <TableRow
                                    key={j}
                                    align="center"
                                >
                                    {varCount > 0 &&
                                        Array.from(Array(varCount)).map((v, i) => (
                                            <>
                                                <TableCell
                                                    key={i}
                                                    align="center"
                                                >
                                                    <TextField
                                                        type="number"
                                                        value={(A[j] && A[j][i]) || ''}
                                                        onChange={(e) => alterA(j, i, e.target.value)}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">X{i + 1}</InputAdornment>,
                                                        }}
                                                    />
                                                </TableCell>
                                                {i < varCount - 1 && (
                                                    <TableCell align="center">
                                                        <FaPlus />
                                                    </TableCell>
                                                )}
                                            </>
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
                                            value={b[j] || ''}
                                            onChange={(e) => alterB(j, e.target.value)}
                                            type="number"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        <TableRow>
                            <TableCell
                                align="center"
                                colSpan={varCount * 2}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => calculate()}
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
                                    onClick={() => example()}
                                    endIcon={<FaPlayCircle />}
                                >
                                    Example
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <br /> <br />
            {solution.map((s, index) => {
                return <div key={index}>{s}</div>;
            })}
        </div>
    );
}

export default App;
