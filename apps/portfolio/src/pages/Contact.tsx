// include a contact form and your social media channels.
import React, { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  useMediaQuery,
  Modal,
  CircularProgress,
} from '@material-ui/core';
import { EMAILAPIURL } from '../features/notification';
import { makeStyles } from '@material-ui/core/styles';
import {SocialMedia} from '../components/molecules/SocialMedia';
import { useTheme } from '@material-ui/styles';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import styles from '../styles/pages/Contact.module.scss';
import { usePersonalData } from '../hooks';
import { Loading } from '@root/shared/components/atomics';

const useStyles = makeStyles((theme) => {
  const py = theme.spacing(10);
  return {
    textArea: {
      // maxWidth: "90vw",
      width: '100%',
      fontSize: theme.spacing(2.1),
    },
    submit: {
      borderRadius: '0',
      marginTop: theme.spacing(1),
    },
    root: {
      padding: `${py}px ${theme.spacing(8)}px`,
      [theme.breakpoints.up('md')]: {
        padding: `${py}px ${theme.spacing(20)}px`,
      },
      [theme.breakpoints.up('lg')]: {
        padding: `${py}px ${theme.spacing(30)}px`,
      },
    },
    spinner: {
      position: 'absolute',
      top: `50%`,
      left: `50%`,
      border: 'none',
    },
  };
});

const SimpleTextField = (props) => {
  const { label, inputRef, name } = props;
  // ref={register}
  return (
    <TextField
      label={label}
      variant='filled'
      margin='normal'
      required
      fullWidth
      color={'secondary'}
      inputRef={inputRef}
      name={name}
    />
  );
};

function createRequestOption(data) {
  const myHeaders = createHeader();

  const raw = JSON.stringify({
    ...data,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    // mode: 'no-cors',
  };
  return requestOptions;
}

function createHeader() {
  let myHeaders = {};
  Object.assign(myHeaders, { 'Content-Type': 'application/json' });
  Object.assign(myHeaders, { 'Access-Control-Allow-Origin': '*' });
  return myHeaders;
}

export default function Contact() {
  const {data, isLoading, error} = usePersonalData();
  const classes = useStyles();
  const theme = useTheme() as any;
  const isMobile = useMediaQuery(theme?.breakpoints?.down('xs'), {
    defaultMatches: true,
  });
  const [isReady, setIsReady] = useState(true);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    setIsReady(false);

    //submit data to API for notification
    const requestOptions = createRequestOption(data) as any;
    // console.log(requestOptions);
    await fetch(EMAILAPIURL, requestOptions)
      .then((response) => response.text())
      .then(() => {
        alert('Success!');
        setIsReady(true);
      })
      .catch((error) => console.log('error:', error));
  };

  if (error) {
    return <div>Error! {error?.messsage}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }


  return (
    <Box maxWidth={1280} className={classes.root}>
      <Typography variant={'h2'} component={'p'}>
        Get in touch?
      </Typography>
      <Typography variant={'h2'} component={'p'}>
        Drop me a line!
      </Typography>
      <Box mt={1}>
        <Typography>
          Are you looking for a developer, or just want to talk? Please feel to
          contact me. free.
        </Typography>
      </Box>
      <Box maxWidth={850} mt={4}>
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container justifyContent='center'>
              <Grid container item spacing={isMobile ? 0 : 4}>
                <Grid item xs={12} sm={6}>
                  <SimpleTextField
                    label='Name'
                    inputRef={register}
                    name={'name'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SimpleTextField
                    label='Email'
                    inputRef={register}
                    name={'email'}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={'Message'}
                  name={'message'}
                  variant='filled'
                  margin='normal'
                  required
                  fullWidth
                  color={'secondary'}
                  multiline={true}
                  rows={5}
                  inputRef={register}
                />
              </Grid>
            </Grid>
            <Button
              className={`${classes.submit} ${styles.tooltip}`}
              variant='contained'
              color='primary'
              size='large'
              endIcon={''}
              target='_blank'
              rel='noopener'
              type='submit'
              onClick={handleSubmit(onSubmit)}
              href='#'
            >
              <span className={''}>Send</span>
            </Button>
          </form>
        </motion.div>
      </Box>
      <Box mt={18} width={120}>
        <SocialMedia text={''} email={data?.resume?.email}/>
      </Box>
      <Modal
        open={!isReady}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        disableEnforceFocus
      >
        <CircularProgress className={classes.spinner} />
      </Modal>
    </Box>
  );
}
