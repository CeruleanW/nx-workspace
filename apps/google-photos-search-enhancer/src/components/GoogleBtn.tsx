import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { credentials } from '../features/auth';
import { getTimeStamp, setUpdateTime } from '../features/client-storage';
import { requestAllMediaItems } from '../features/g-api';
import {setAxiosDefaultAuthHeader} from '../features/request';
import { Button } from '@material-ui/core';
import { useAccessUpdate, useAccess } from './Context/AccessContext';
import { useFeedbackUpdate } from './Context/FeedbackContext';

const oauth2 = {
  clientID: credentials.web.client_id,
  projectId: credentials.web.project_id,
  authUri: credentials.web.auth_uri,
  tokenUri: credentials.web.token_uri,
  scopes: [
    'https://www.googleapis.com/auth/photoslibrary',
    'https://www.googleapis.com/auth/photoslibrary.readonly',
  ],
};

export default function GoogleBtn(props) {
  // const classes = useStyles();
  const updateAccessToken = useAccessUpdate().handleAccessToken;
  const updateBackdrop = useFeedbackUpdate().handleBackdrop;
  const updateTextMessage = useFeedbackUpdate().handleTextMessage;
  const updateIsLogined = useAccessUpdate().handleIsLogined;
  const isLogined = useAccess().isLogined;

  // get the access token from Google
  const login = (response) => {
    if (response?.accessToken) {
      const token = response.accessToken;
      updateIsLogined(true);
      updateAccessToken(response.accessToken);
      setAxiosDefaultAuthHeader(token);
      // start request
      handleRequest(response.accessToken);
    }
  };

  const logout = () => {
    updateIsLogined(false);
    updateAccessToken('');
    // clear search results
  };

  const handleLoginFailure = (response) => {
    console.error(response);
    alert('Failed to log in');
  };

  const handleLogoutFailure = (response) => {
    console.error(response);
    alert('Failed to log out');
  };

  // run after the log-in is completed
  const handleRequest = (accessToken) => {
    console.log('handleRequest is called');

    // If it's the first time that the user login
    if (!getTimeStamp()) {
      updateTextMessage(
        'Initializing Local Data Storage. This may take long time depends the quantity of media items in your library'
      );
      updateBackdrop(true);
      requestAllMediaItems(accessToken)
        .then((fulfilled) => {
          // Update the LastUpdateView
          props.onSetLastUpdateTime();
        })
        .finally(() => {
          updateBackdrop(false);
          updateTextMessage('');
        });
    } else {
      //TODO: get new items since last update

      setUpdateTime()
        .then(() => {
          props.onSetLastUpdateTime();
        })
        .finally(() => {
          updateBackdrop(false);
          updateTextMessage('');
        });
    }
  };

  return (
    <>
      {isLogined ? (
        <GoogleLogout
          clientId={oauth2.clientID}
          onLogoutSuccess={logout}
          buttonText='Logout'
          // onFailure={handleLogoutFailure}
          render={(renderProps) => (
            <Button
              variant='contained'
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Logout
            </Button>
          )}
          // cookiePolicy={'single_host_origin'}
        />
      ) : (
        <GoogleLogin
          clientId={oauth2.clientID}
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy='single_host_origin'
          responseType='code,token'
          scope={oauth2.scopes[1]}
          isSignedIn={true}
          render={(renderProps) => (
            <Button
              variant='contained'
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Login
            </Button>
          )}
        />
      )}
    </>
  );
}
