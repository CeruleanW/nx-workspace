import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { PhotoList } from './PhotoList';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
    marginTop: '10px',
    marginLeft: '10px',
  },
  gridListTile: {
    maxWidth: 480,
    maxHeight: 360,
  },
  image: {
    maxWidth: '100%',
    '&:hover': {
      opacity: 0.5,
    },
  },
  masonryGrid: {
    display: 'flex',
    marginLeft: '-30px' /* gutter size offset */,
    width: '100%',
  },
  masonryGridColumn: {
    paddingLeft: '20px' /* gutter size */,
    backgroundClip: 'padding-box',
    /* change div to reference your elements you put in <Masonry> */
    '& > div': {
      marginBottom: '30px',
    },
  },
}));

export default function PhotosContainer(props) {
  const { list } = props;

  // Style
  const classes = useStyles();

  // States
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const displayedPhotos = list;

  // TODO: because async requests after searching for displaying, we have to wait
  // should fix the timeout logic later
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingPhotos(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classes.root}>
      {loadingPhotos ? (
        <Grid container spacing={1}>
          {displayedPhotos.map((photoItem) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              key={photoItem?.baseUrl}
            >
              <Skeleton variant='rect' height={300} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <PhotoList photoUrls={displayedPhotos} {...props} />
      )}
    </div>
  );
}
