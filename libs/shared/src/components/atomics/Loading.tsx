// import CircularProgress from '@material-ui/core/CircularProgress';
import CircularProgress from '@mui/material/CircularProgress';


export function Loading(props) {
  return (
    <CircularProgress {...props}/>
  );
}


export function CenteredLoading(props) {

  return (
    <div className={'flex flex-col flex-grow justify-center items-center w-full'} {...props}>
      <Loading />
    </div>
  );
}
