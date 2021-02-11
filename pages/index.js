import {
	AppBar,
	Box,
	Button,
	Container,
	Grid,
	Toolbar,
	Typography
} from '@material-ui/core';
import Head from 'next/head';
import { StrictMode, useEffect, useRef, useState } from 'react';
import MathJax from 'react-mathjax';
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

  const generateEquation = () => {
    const N = coefficients.length;
    const equation = coefficients
      .map((v, i) => `${v}s^${N - i - 1}`)
      .join(' + ');
    return equation;
  };

  useEffect(() => {
    if (outputMatrixRef.current) {
      outputMatrixRef.current.setState({
        columns: routhToColumns(routhTable)
      });
    }
  }, [routhTable]);

  return (
    <StrictMode>
      <Head>
        <title>Routh Table Generator</title>
      </Head>
      <MathJax.Provider>
        <Container maxWidth="md">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h3" color="inherit">
                Generate Routh Table
              </Typography>
            </Toolbar>
          </AppBar>
          <Box style={{ margin: '16px 0' }}>
            <Typography variant="h4">
              Routh-Hurwitz Stability Criterion:
            </Typography>
            <Typography variant="body1" style={{ padding: '8px 0' }}>
              In control system theory, the Routh–Hurwitz stability criterion is
              a mathematical test that is a necessary and sufficient condition
              for the stability of a linear time invariant (LTI) control
              system&nbsp;
              <a href="https://en.wikipedia.org/wiki/Routh%E2%80%93Hurwitz_stability_criterion">
                (Wikipedia).
              </a>
            </Typography>
            <Typography variant="body1">
              In summary, if there is no sign change in the first column of the
              Routh table then the characteristic polynomial describes an
              asymptotic stable system.
            </Typography>
          </Box>
          <Box style={{ margin: '16px 0' }}>
            <Typography variant="h4">
              Enter the coefficients of the characteristic polynomial:
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
          <Box style={{ margin: '16px 0' }}>
            {routhTable && (
              <>
                <Typography variant="h4">
                  Routh Table for polynomial:{' '}
                  <MathJax.Node inline formula={generateEquation()} />
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
      </MathJax.Provider>
    </StrictMode>
  );
}

export default App;
