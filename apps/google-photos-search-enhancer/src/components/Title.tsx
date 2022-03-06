import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';

export function Title({ setIsDrawerOpen }) {

  return (
    <>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={() => setIsDrawerOpen(true)}
        edge='start'
      >
        <MenuIcon />
      </IconButton>
      <div className='flex flex-grow justify-center md:justify-start'>
        <Typography variant='h6' className={'text-3xl'}>
          Google Photos Search Enhancer
        </Typography>
      </div>
    </>
  );
}
