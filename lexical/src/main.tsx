import { type ReactNode, StrictMode } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import {
  CssBaseline,
  Direction,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material';

import rtlPlugin from '@graasp/stylis-plugin-rtl';

import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
// import { RouterProvider, createRouter } from '@tanstack/react-router';
import { prefixer } from 'stylis';

// import '@/config/i18n';

import Lexical from './components/Lexical';

const theme = createTheme();

// Set up a Router instance
// const router = createRouter({
//   routeTree,
//   defaultPreload: 'intent',
//   scrollToTopSelectors: ['#main'],
//   scrollRestoration: true,
//   context: {
//     // at this stage, we set it to `undefined`. A more appropriate value will be set later in AuthProvider when we wrap the app.
//     auth: undefined!,
//   },
// });

// Register things for typesafety
// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router;
//   }
// }

type ThemeWrapperProps = {
  children: ReactNode;
};

const getCacheForDirection = (direction?: Direction): EmotionCache =>
  createCache({
    key: `mui-dir-${direction}`,
    stylisPlugins: [prefixer, ...(direction === 'rtl' ? [rtlPlugin] : [])],
  });

function ThemeWrapper({ children }: Readonly<ThemeWrapperProps>) {
  // // use the hook as it allows to use the correct instance of i18n
  // const { i18n: i18nInstance } = useTranslation();
  // const direction = i18nInstance.dir(i18nInstance.language);

  // // needed to set the right attribute on the HTML
  // useEffect(
  //   () => {
  //     const dir = i18nInstance.dir(i18nInstance.language);
  //     console.debug(
  //       `Language changed to ${i18nInstance.language}, updating direction to ${dir}`,
  //     );
  //     document.documentElement.setAttribute('dir', dir);
  //   },
  //   // here we need to react to the change of the language, the instance does not change.
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [i18nInstance.language],
  // );

  return (
    <MuiThemeProvider theme={{ ...theme, direction: 'ltr' }}>
      <CacheProvider value={getCacheForDirection('ltr')}>
        {children}
      </CacheProvider>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeWrapper>
        <CssBaseline />
        <Lexical />
        {/* <InnerApp /> */}
      </ThemeWrapper>
    </HelmetProvider>
  );
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // we disable strict mode because the map component (leaflet) can not handle it.
    // ideally we would like to be able to enable strict mode to have a better DX and find bugs.
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
