import { amber, deepOrange, grey } from '@mui/material/colors';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main:"#D6FC73"
          },
           background: {
            default: '#A9A9A9',
            paper: deepOrange[900],
          },
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[900],
          },
        }
      : {
          primary: {
            main:'#BEE48E'},
          divider: deepOrange[700],
          background: {
            default: '#000',
            paper: deepOrange[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});
