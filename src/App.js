import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Context } from './context';
import { StoriesView } from 'containers/Stories/StoriesView';
import 'resources/scss/style.scss';
import { StoryView } from 'containers/Story/StoryView';

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const App = () => (
    <Context.Provider history={history}>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={StoriesView} />
                <Route path="/story" exact={true} component={StoryView} />
            </Switch>
        </BrowserRouter>
    </Context.Provider>
);
