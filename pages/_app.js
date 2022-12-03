import './../styles/globals.css';
import React from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider, CssBaseline} from '@mui/material';
import AppWrapper from './../components/AppWrapper';
import store from './../app/store';
import theme from './../theme';

function MyApp({Component, pageProps}) {
    return (
        <AppWrapper>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </ThemeProvider>
            </Provider>
        </AppWrapper>
    );
}

export default MyApp;
