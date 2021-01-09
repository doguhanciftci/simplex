import { AppBar, Button, Divider, Grid, InputAdornment, IconButton, Paper, Select, Table, MenuItem, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { FaCalculator, FaEquals, FaGreaterThanEqual, FaLessThanEqual, FaPlus } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    width: '100%',
    // width: 'auto',
    // height: theme.spacing(500)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  gridContainer: {
    width: '100%',
    paddingLeft: theme.spacing(50),
    paddingRight: theme.spacing(50),
    paddingBottom: theme.spacing(2),
  },
  buttonGenerate: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    verticalAlign: 'center'
  }
}));

function App() {

  const classes = useStyles();

  const [varCount, setVarCount] = useState(3);
  const [consCount, setConsCount] = useState(3);

  const [matrix, setMatrix] = useState(Array.from(Array(3 + 1), () => new Array(3 + 1)));

  const [b, setB] = useState(Array.from(Array(3)));

  const [type, setType] = useState('Max');

  useEffect(() => {
    if (consCount >= 0 && varCount > 0) {
      let newMatrix = Array.from(Array(consCount + 1), () => new Array(varCount));
      newMatrix.forEach((row, row_index) => {
        if (matrix[row_index]){
          newMatrix[row_index] = matrix[row_index]
        }
      })
      setMatrix(newMatrix);

      let newB = Array.from(Array(consCount));
      setB(newB);
    }
  // eslint-disable-next-line
  }, [varCount, consCount]);

  const alterMatrix = (row, col, value) => {
    value = value === '' ? 0 : parseInt(value);
    let newMatrix = [...matrix];
    newMatrix[row][col] = value;
    setMatrix(newMatrix);
  }

  const alterB = (row, value) => {
    value = value === '' ? 0 : parseInt(value);
    let newB = [...b];
    newB[row] = value;
    setB(newB);
    console.log(newB);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <FaCalculator />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Revised Simplex Calculator
          </Typography>
        </Toolbar>
      </AppBar>
      <br /><br />
      <Grid container spacing={0} className={classes.gridContainer}>
        <Grid item xs={6}>
          <TextField
            value={varCount}
            onChange={e => setVarCount(e.target.value === '' ? '' : parseInt(e.target.value))}
            type='number'
            label='Total Variables' />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={consCount}
            onChange={e => setConsCount(e.target.value === '' ? '' : parseInt(e.target.value))}
            type='number'
            label="Total Contraints" />
        </Grid>
      </Grid>
      <Divider />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Select
                  value={type}
                  onChange={e => setType(e.target.value)}>
                  <MenuItem value='Max'>Max Z</MenuItem>
                  <MenuItem value='Min'>Min Z</MenuItem>
                </Select>
              </TableCell>
              <TableCell align='center'><FaEquals /></TableCell>
              {/* <TableCell align='center'><FaEquals /></TableCell> */}
              {
                varCount > 0 && Array.from(Array(varCount)).map((v, i) =>
                  <>
                    <TableCell key={i} align='center'>
                      <TextField
                        type='number'
                        value={(matrix[0] && matrix[0][i]) || ''}
                        onChange={e => alterMatrix(0, i, e.target.value)}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">X<sub>{i + 1}</sub></InputAdornment>,
                        }}
                      />
                    </TableCell>
                    {i < varCount - 1 && <TableCell align='center'><FaPlus /></TableCell>}
                  </>
                )
              }
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={-1}>
              <TableCell>Subject to constraints</TableCell>
            </TableRow>
            {
              consCount > 0 && Array.from(Array(consCount)).map((v, j) =>
                <TableRow key={j} align='center'>
                  {
                    varCount > 0 && Array.from(Array(varCount)).map((v, i) =>
                      <>
                        <TableCell key={i} align='center'>
                          <TextField
                            type='number'
                            value={(matrix[j + 1] && matrix[j + 1][i]) || ''}
                            onChange={e => alterMatrix(j + 1, i, e.target.value)}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">X{i + 1}</InputAdornment>,
                            }}
                          />
                        </TableCell>
                        {i < varCount - 1 && <TableCell align='center'><FaPlus /></TableCell>}
                      </>
                    )
                  }
                  <TableCell align='center'>
                    <Select
                      // value={type}
                      // onChange={e => setType(e.target.value)}
                      defaultValue='-1'>
                      <MenuItem value='-1'><FaLessThanEqual /></MenuItem>
                      <MenuItem value='0'><FaEquals /></MenuItem>
                      <MenuItem value='1'><FaGreaterThanEqual /></MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align='center'>
                    <TextField 
                    value={b[j] || ''}
                    onChange={e => alterB(j, e.target.value)}
                    type='number' />
                  </TableCell>
                </TableRow>
              )
            }
            <TableRow>
              <TableCell align='center' colSpan={(varCount * 2) + 1}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<FaCalculator />}>
                  Calculate
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ height: '1000px' }}>

      </div>
    </div>
  );
}

export default App;
