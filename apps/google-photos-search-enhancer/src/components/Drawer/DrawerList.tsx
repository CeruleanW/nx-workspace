import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useState, useEffect } from 'react';
import {
  clearData, getTimeStamp,
  setTimeStamp, useIndexedDB
} from '../../features/client-storage';
import { useAccess } from '../Context/AccessContext';
import { useDispatch } from 'react-redux';
import { setIsUpdateDataModalShown, setSnackbar } from '../../providers/redux/globalSlice';
import { SnackbarMessage } from '../../providers';
import { requestAllMediaItems } from '../../features/g-api';
import { getNow } from '@root/shared/features/date';
import MyDialog from '../MyDialog';
import { Typography } from '@material-ui/core';

const updateMsg: SnackbarMessage = {
  message: 'Update completed!',
  severity: 'success',
  isOpen: true
};

const clearMsg: SnackbarMessage = {
  message: 'Clear completed!',
  severity: 'success',
  isOpen: true
};

/**
 * A list of draw items
 */
export function DrawerList() {
  const { data: localMediaKeys, error: localMediaKeysError } = useIndexedDB();
  const isLogined = useAccess().isLogined;
  const dispatch = useDispatch();

  // States
  // const [lastUpdateTime, setLastUpdateTime] = useState('');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [openUpdateAlertDialog, setOpenUpdateAlertDialog] = useState(false);
  const [isUpdateRequestAgreed, setIsUpdateRequestAgreed] = useState(undefined);

  /**
   *
   */
  const handleUpdateLocalMediaItems = async () => {
    dispatch(setIsUpdateDataModalShown(true));

    requestAllMediaItems()
      .then((fulfilled) => {
        console.log('Update completed!');

        // show success snackbar
        dispatch(setSnackbar(updateMsg));

        // Update the LastUpdate Time
        // const now = String(getNow());
        // setLastUpdateTime(now);
      })
      .finally(() => {
        // close modal & backdrop
        dispatch(setIsUpdateDataModalShown(false));
      });
    setIsUpdateRequestAgreed(undefined);
  }

  // Update local data when update request is confrimed
  useEffect(() => {
    if (isUpdateRequestAgreed === true) {
      handleUpdateLocalMediaItems();
    }
  }, [isUpdateRequestAgreed]);

  /**
   * clear client storage,
   */
  const handleClear = async () => {
    await clearData();

    setTimeStamp(false);
    // setLastUpdateTime(getTimeStamp());

    // show success snackbar

    dispatch(setSnackbar(clearMsg));
  };

  const isDataReady = Boolean(localMediaKeys && localMediaKeys.length);

  return (
    <>
      <List>
        <ListItem
          button
          onClick={() => setOpenUpdateAlertDialog(true)}
          disabled={!isLogined}
        >
          <ListItemText primary='Update data' />
        </ListItem>
        <ListItem button onClick={handleClear} disabled={!isDataReady}>
          <ListItemText primary='Clear data' />
        </ListItem>
        <ListItem
          button
          onClick={() => setIsHelpModalOpen(true)}
          disabled={isHelpModalOpen}
        >
          <ListItemText primary='Help' />
        </ListItem>
      </List>
      <MyDialog
        open={openUpdateAlertDialog}
        onClose={() => setOpenUpdateAlertDialog(false)}
        onAgreed={(isAgreed) => setIsUpdateRequestAgreed(isAgreed)}
      >
        <Typography color='textPrimary'>
          Depending on the quantity of items in your Google Photos Library, the
          updating time could be up to a few minutes. Are you sure to update?
        </Typography>
      </MyDialog>
    </>
  )
}
