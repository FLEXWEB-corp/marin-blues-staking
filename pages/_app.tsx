import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global-styles';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div
        style={{
          textAlign: 'center',
          height: '80px',
          backgroundColor: 'white',
        }}
      >
        헤더
      </div>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
