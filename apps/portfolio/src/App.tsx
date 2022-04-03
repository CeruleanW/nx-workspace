import { LinearProgress } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AnimatePresence } from 'framer-motion';
import LogRocket from 'logrocket';
import React, { lazy, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollToTop from './components/atomics/ScrollToTop';
import Footer from './components/Footer/Footer';
import NavTabs from './components/molecules/NavTabs';
import Nav from './components/organisms/Nav';
import { STATEMENT } from './data/globals';
import { PAGE_ROUTES, PAGE_TITLES } from './routes';
import { easterEgg } from './lib/easter-egg';
import { Resume } from './pages/Resume';
import { Projects } from './pages/Projects';
import { Home } from './pages/Home';
import { ProjectDetailPage } from './pages/ProjectDetail';
import Theme from './styles/base/Theme';
import './styles/main.scss';

LogRocket.init('5bsway/portfolio');

const AboutMe = lazy(() => import('./pages/AboutMe'));
const Contact = lazy(() => import('./pages/Contact'));

export default function App() {
  useEffect(() => {
    easterEgg();
    console.log(STATEMENT);
  }, []);

  return (
    <Theme>
      <CssBaseline />
      <BrowserRouter>
        <div className={'root-container'}>
          <Nav routes={PAGE_ROUTES} pageTitles={PAGE_TITLES}>
            <Route
              path='/'
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
              <Route
                render={({ location }) => (
                  <AnimatePresence exitBeforeEnter initial={false}>
                    <Switch key={location.pathname}>
                      <Route
                        exact
                        path={PAGE_ROUTES[0]}
                        render={() => <Home />}
                      />
                      <Route
                        path={`${PAGE_ROUTES[1]}/:id`}
                        render={() => <ProjectDetailPage />}
                      />
                      <Route
                        path={PAGE_ROUTES[1]}
                        render={() => <Projects />}
                      />
                      <Route path={PAGE_ROUTES[2]} render={() => <AboutMe />} />
                      <Route path={PAGE_ROUTES[3]} render={() => <Contact />} />
                      <Route path={PAGE_ROUTES[4]} render={() => <Resume />} />
                    </Switch>
                  </AnimatePresence>
                )}
              />
            </main>
            <Footer />
            <ScrollToTop />
          </React.Suspense>
        </div>
      </BrowserRouter>
    </Theme>
  );
}
