import React from 'react';
import { 
  Typography, 
  Container, 
  Table,
  TableContainer, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Button, 
  Grid, 
  IconButton
} from '@material-ui/core';
import {Link} from "react-router-dom";
import { scrollToTop } from '../../../functions/common';
import EditIcon from '@material-ui/icons/Edit';

  /* Render index table rows populated with data */
const DrsIndexRows = (props) => {
  const drsObjectsList = props.drsObjectsList;
  if (!drsObjectsList){
    return null;
  }
  else {
    const rows = drsObjectsList.map((drsObject) =>
    <TableRow key={drsObject.id}>
      <TableCell align="left">
        <Typography>{drsObject.id}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>{drsObject.name}</Typography>
      </TableCell>
      <TableCell align="right">
        <Button
          aria-label={`view-details-button`}
          variant="contained"
          color='default'
          component={Link}
          to={`/drs/${drsObject.id}`}
          onClick={scrollToTop}
        >
          <Typography variant="button">View Details</Typography>
        </Button>
      </TableCell>
      <TableCell align="center">
        <IconButton 
          aria-label={`edit-button`}
          variant="contained" 
          color='primary' 
          component={Link} 
          to={`/drs/${drsObject.id}/edit`}
          onClick={scrollToTop}
        >
          <EditIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
    );
    return (
      <TableBody>{rows}</TableBody>
    );
  }
}

const DrsIndex = (props) => {
  /* Render DrsIndex page */
  return (
    <div align="center">
      <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <Container maxWidth="lg" >
        <Grid container justify='space-between' alignItems='center'>
          <Grid item xs={2} align='left'>
            <Button 
              variant='contained' 
              component={Link} 
              to='/' 
              color='primary' 
              size='large'
              onClick={scrollToTop}
            >
              <Typography variant='button'>Home</Typography>
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h2" gutterBottom>Welcome to DRS Starter Kit</Typography>
          </Grid>
          <Grid item xs={2} align='right'>
            <Button 
              variant='contained' 
              component={Link} 
              to='/drs/new' 
              color='primary' 
              size='large'
              onClick={scrollToTop}
            >
              <Typography variant='button'>New DRS Object</Typography>
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="h5">DRS Object ID</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h5">Name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5">View Details</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5">Edit</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <DrsIndexRows drsObjectsList={props.drsObjectsList}/>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default DrsIndex;