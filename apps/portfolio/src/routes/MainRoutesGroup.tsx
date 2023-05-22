import { AnimatePresence } from 'framer-motion';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../pages/Home';
import { ProjectDetailPage } from '../pages/ProjectDetail';
import { Projects } from '../pages/Projects';
import { Resume } from '../pages/Resume';
import { PAGE_ROUTES } from './constants';
import { lazy } from 'react';
import {Contact} from '../pages/Contact';

const AboutMe = lazy(() => import('../pages/AboutMe'));

export function MainRoutesGroup() {
  return (
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
          <Route
            path={PAGE_ROUTES[2]}
            render={() => <AboutMe />}
          />
          <Route
            path={PAGE_ROUTES[3]}
            render={() => <Contact />}
          />
          <Route
            path={PAGE_ROUTES[4]}
            render={() => <Resume />}
          />
        </Switch>
      </AnimatePresence>
    )}
  />
  )
}
