import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import 'services/translations/i18n';
import MessengerCustomerChat from 'react-messenger-customer-chat';

ReactDOM.render(
    <>
        <App />
        <MessengerCustomerChat
            pageId="129705330373192"
            appId="1301955370137940"
            themeColor="white"
        />
    </>,
    document.getElementById('root')
);
