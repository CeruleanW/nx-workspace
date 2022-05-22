import Theme from '../styles/base/Theme';
import { StyledEngineProvider } from '@mui/material/styles';

export function ProviderGroup({children}) {
  return (
    <Theme>
      <StyledEngineProvider injectFirst>
        {children}
      </StyledEngineProvider>
    </Theme>
  )
}
