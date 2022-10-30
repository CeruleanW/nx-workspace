import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// import React from 'react';
import { format } from '@root/shared/features/date';

/**
 * e.g. Last Update: 2022-10-30 10:31:34
 */
export function LastUpdateTime({ lastUpdateTime, ...optionals }) {
  return (
    <>
      <Typography
        variant='subtitle1'
        display='block'
        gutterBottom
        color='textSecondary'
      >
        <Box>Last Update:</Box>
        {lastUpdateTime ? format(new Date(lastUpdateTime), 'yyyy-MM-dd HH:mm:ss') : 'No data'}
      </Typography>
    </>
  )
}
