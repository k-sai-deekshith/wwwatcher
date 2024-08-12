import { Global, css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';

const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: ${theme.typography.fontFamily};
          background-color: ${theme.palette.background.default};
          color: ${theme.palette.text.primary};
        }

        * {
          box-sizing: inherit;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      `}
    />
  );
};

export default GlobalStyles;
