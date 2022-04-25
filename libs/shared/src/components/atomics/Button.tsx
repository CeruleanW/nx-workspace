import MuiButton from '@mui/material/Button';
import styled from 'styled-components';

const ResetBg = styled(MuiButton)`
  background-color: #1976d2; /* fix conflict between tailwindcss and mui button color */
`;

export function Button(props) {
  const { className, variant = 'contained', ...rest } = props;
  return (
    <>
      <ResetBg className={`w-max ${className}`} variant={variant} {...rest} />
    </>
  );
}
