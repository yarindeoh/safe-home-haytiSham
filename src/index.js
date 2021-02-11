import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './services/translations/i18n';

ReactDOM.hydrate(<App />, document.getElementById('root'));
