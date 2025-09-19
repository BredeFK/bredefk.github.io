import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Theme} from '@radix-ui/themes';
import "@radix-ui/themes/styles.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <React.StrictMode>
            <Theme appearance='dark' accentColor='blue' grayColor='auto' radius='large'>
                <App/>
            </Theme>
        </React.StrictMode>
    );
