import { LinearProgress } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import LogRocket from 'logrocket';
import React, {  useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ScrollToTop from './components/atomics/ScrollToTop';
import Footer from './components/Footer/Footer';
import NavTabs from './components/molecules/NavTabs';
import Nav from './components/organisms/Nav';
import { STATEMENT } from './data/globals';
import { PAGE_ROUTES, PAGE_TITLES } from './routes';
import { easterEgg } from './lib/easter-egg';
import Theme from './styles/base/Theme';
import './styles/main.scss';
import { StyledEngineProvider } from '@mui/material/styles';
import { MainRoutesGroup } from './routes/MainRoutesGroup';

LogRocket.init('5bsway/portfolio');


export default function App() {
  useEffect(() => {
    easterEgg();
    console.log(STATEMENT);
  }, []);

  return (
    <Theme>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <BrowserRouter>
          <div className={'root-container'}>
            <Nav routes={PAGE_ROUTES} pageTitles={PAGE_TITLES}>
              <Route
                path="/"
                render={({ location }) => (
                  <NavTabs
                    routes={PAGE_ROUTES}
                    value={location.pathname}
                    pageTitles={PAGE_TITLES}
                  />
                )}
              />
            </Nav>
            <React.Suspense fallback={<LinearProgress color={'secondary'} />}>
              <main className={'root-main'}>
                <MainRoutesGroup />
              </main>
              <Footer />
              <ScrollToTop />
            </React.Suspense>
          </div>
        </BrowserRouter>
      </StyledEngineProvider>
    </Theme>
  );
}
