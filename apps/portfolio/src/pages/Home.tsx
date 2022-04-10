import { Typography, Box } from '@material-ui/core';
import Image from 'material-ui-image';
import { makeStyles } from '@material-ui/core/styles';
import SeeMyProject from '../components/molecules/More';
import { ProjectsCarousel } from '../components/organisms/ProjectsCarousel';
import DotBox from '../components/atomics/DotBox';
import { motion } from 'framer-motion';
import { FULLNAME, JOBTITLE } from '../data/globals';
import styles from '../styles/pages/Home.module.scss';
import { useProjectsData } from '../hooks';
import { Loading } from '@root/shared/components/atomics/Loading';

const mainPhoto = '/img/avatar.png';

const useStyles = makeStyles((theme) => ({
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

export function Header() {
  const classes = useStyles();
  return (
    <>
      <Typography variant='h1' component='h1'>
        Hi! <span>I'm</span> {FULLNAME}
      </Typography>
      <Box width={'fit-content'}>
        <h1>
          <span className={`${classes.halfBackground} text-4xl`}>
            {JOBTITLE}
          </span>
        </h1>
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Typography variant='subtitle1'>
            coding at Toronto, Canada.
          </Typography>
        </motion.div>
      </Box>
    </>
  );
}

//Styles
const variants = {
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
        <motion.div
          initial='right'
          animate='animate'
          variants={variants}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={mainPhoto}
            alt={`${FULLNAME}'s profile`}
            imageStyle={{ width: '100%', zIndex: '1' }}
            aspectRatio={0.75}
            disableTransition
          />
          <DotBox />
        </motion.div>
      </div>
    </div>
  );
}
