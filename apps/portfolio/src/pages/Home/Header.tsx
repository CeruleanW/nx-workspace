import { Typography, Box } from '@material-ui/core';
import { motion } from 'framer-motion';
import { FULLNAME, JOBTITLE } from '../../lib/constants';
import { useStyles } from '../Home';

const imgUrl = 'https://i.imgur.com/ZAIrnnZ.jpg'; //Fire Flames
const imgUrl2 = 'https://i.imgur.com/07foc9r.jpg';

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
