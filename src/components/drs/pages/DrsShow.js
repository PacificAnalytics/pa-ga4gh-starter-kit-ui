import '@fontsource/roboto';
import React, {useEffect} from 'react';
import { 
  Typography, 
  Container,
  Grid, 
  Button
} from '@material-ui/core';
import {
    useParams,
    useLocation, 
    Link
} from "react-router-dom";
import DrsObjectForm from '../DrsObjectForm';
import axios from 'axios';
import UseDrsStarterKit from '../UseDrsStarterKit';

const DrsShow = (props) => {
  let drsObjectDetails = props.activeDrsObject;
  let updateActiveDrsObject = props.updateActiveDrsObject;
  let handleError = props.handleError;
  let { objectId } = useParams();
  let baseUrl = 'http://localhost:8080/admin/ga4gh/drs/v1/';
  let requestUrl=(baseUrl+'objects/'+objectId);
  const cancelToken = axios.CancelToken;
  const drsCancelToken = cancelToken.source();

  let requestConfig = {
    url: requestUrl,
    method: 'GET',
    cancelToken: drsCancelToken.token
  };

  UseDrsStarterKit(requestConfig, updateActiveDrsObject, handleError, objectId, drsCancelToken);

  const { pathname }  = useLocation();
  console.log(pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  if(!drsObjectDetails) {
    return (
      <div align="center">
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width"
    />
    <Typography variant="h3" gutterBottom>DRS Object Details</Typography>
    </div>
    );
  }
  else {
    return(
      <div align="center">
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
        <Container maxWidth="lg">
          <Grid container justify='space-between' alignItems='center'>
            <Grid item xs={2} align='left'>
              <Button variant='contained' component={Link} to='/drs' color='primary' size='large'>
              <Typography variant='button'>DRS Index</Typography>
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h3" gutterBottom>DRS Object Details</Typography>
            </Grid>
            <Grid item xs={2}/>
          </Grid>
          <DrsObjectForm 
            drsObjectDetails={drsObjectDetails} 
            readOnlyId={true}
            readOnlyForm={true}
            checksumTypes={props.checksumTypes}
            drsObjectFunctions={props.drsObjectFunctions}/>
        </Container>
      </div>
    );
  }
}

export default DrsShow;