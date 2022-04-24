import MuiButton from '@mui/material/Button';

export function Button(props) {
  const { className, variant='contained', ...rest } = props;
  return (
    <>
      <MuiButton className={`w-max ${className}`} variant={variant} {...rest} />
    </>
  );
}
