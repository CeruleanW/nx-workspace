import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SeeMyProject from '../../components/molecules/More';
import { ProjectsCarousel } from '../../components/organisms/ProjectsCarousel';
import { motion } from 'framer-motion';
import styles from '../../styles/pages/Home.module.scss';
import { useProjectsData } from '../../hooks';
import { Loading } from '@root/shared/components/atomics/Loading';
import { Header } from './Header';
import { ProfileImg } from './ProfileImg';


export const useStyles = makeStyles((theme) => ({
  maincontent: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(13),
      paddingRight: theme.spacing(17),
    },
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  noWidthOverflow: {
    maxWidth: '100%',
  },
  halfBackground: {
    background: `linear-gradient(to top, ${theme.palette.secondary.light} 50%, transparent 50%)`,
  },
}));

//Styles
export const variants = {
  animate: { opacity: 1, x: 0 },
  right: { opacity: 0, x: 1000 },
  left: { opacity: 0, x: -1000 },
};

export function Home() {
  const { projectData, isLoading, error } = useProjectsData();

  if (error) {
    return <div>Error! {error?.messsage}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles['container']}>
      <div className={styles['left']}>
        <Header />
        <motion.div
          initial='left'
          animate='animate'
          variants={variants}
          transition={{ duration: 0.8 }}
        >
          <div className={styles['leftBottom']}>
            <SeeMyProject height={40} />
          </div>
          <Box mt={3}>
            <ProjectsCarousel data={projectData} />
          </Box>
        </motion.div>
      </div>
      <div className={styles['right']}>
        <ProfileImg></ProfileImg>
      </div>
    </div>
  );
}


