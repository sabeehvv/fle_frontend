import React from 'react';
import './Loading.css';
import { MagnifyingGlass } from 'react-loader-spinner'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

export function CircularColor() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <CircularProgress style={{ color: '#3382f6' }} />
      <CircularProgress style={{ color: '#9abdff' }} />
      <CircularProgress style={{ color: '#fcdcb7' }} />
    </Grid>
  );
}

const Loader = () => {
  return (
    <div className='container'>
      <div className="loader">
        <MagnifyingGlass
          visible={true}
          height="180"
          width="180"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor = '#c0efff'
          color = '#e15b64'
        />
      </div>
    </div>
  );
};

export default Loader;