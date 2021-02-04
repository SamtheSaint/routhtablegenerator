import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography
} from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import Matrix from '../components/react-matrix';
import { generateRouthTable } from '../lib/routh';

function App() {
  const [routhTable, setRouthTable] = useState(undefined);
  const [coefficients, setCoefficients] = useState(undefined);

  const inputMatrixRef = useRef(undefined);
  const outputMatrixRef = useRef(undefined);

  const initialColumns = [['4'], ['3'], ['5'], ['2'], ['1']];

  const handleClick = (e) => {
    const __columns = inputMatrixRef.current.getColumns();
    const __coefficients = [];
    for (const subArray of __columns) {
      __coefficients.push(Number(subArray[0]));
    }
    setCoefficients(__coefficients);
    const __routhTable = generateRouthTable(__coefficients);
    console.log('Routh Table: ', __routhTable);
    setRouthTable(__routhTable);
  };

  const routhToColumns = (__routhTable) => {
    const __columns = [];
    for (let i = 0; i < __routhTable[0].length; i++) {
      const sub = [];
      for (let j = 0; j < __routhTable.length; j++) {
        sub.push(__routhTable[j][i]);
      }
      __columns.push(sub);
    }
    return __columns;
  };

  useEffect(() => {
    if (outputMatrixRef.current) {
      outputMatrixRef.current.setState({
        columns: routhToColumns(routhTable)
      });
    }
  }, [routhTable]);

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h3" color="inherit">
            Generate Routh Table
          </Typography>
        </Toolbar>
      </AppBar>
      <Box style={{ margin: '24px 0' }}>
        <Typography variant="h4">
          Enter coefficients of the characteristic polynomial:
        </Typography>
        <Grid container>
          <Matrix
            columns={initialColumns}
            resize="horizontal"
            ref={inputMatrixRef}
          />
          <Button onClick={handleClick} style={{ marginLeft: 8 }}>
            <Typography variant="button">Submit</Typography>
          </Button>
        </Grid>
      </Box>
      <Box>
        {routhTable && (
          <>
            <Typography variant="h4">
              Routh Table for coefficients: [{coefficients.join(' ')}]
            </Typography>
            <Matrix
              ref={outputMatrixRef}
              columns={routhToColumns(routhTable)}
              readonly={true}
            />
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;
