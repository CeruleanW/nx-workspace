import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import '../../styles/components/link.scss';

export default function Nav(props) {
  const allTabs = props.routes;

  return (
    <AppBar position='static'>
      <Toolbar disableGutters>
        <p className={`nav-title px-4 no-decoration`}>
          <Link to={allTabs[0]}>&#10023; Asher.Y</Link>
        </p>
        <div className='flex-1'></div>
        <Hidden smDown>{props.children}</Hidden>
        <Hidden mdUp>
          <Menu routes={allTabs} pageTitles={props.pageTitles} />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
