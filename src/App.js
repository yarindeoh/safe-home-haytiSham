import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Context } from 'services/routing/context';
import { StoriesView } from 'containers/Stories/StoriesView';
import './scss/componentsStyle/App.scss';
import { StoryView } from 'containers/Story/StoryView';
import { AddStoryView } from 'containers/AddStory/AddStoryView';
import { StoryViedo } from 'containers/Story/components/StoryVideo';
import { createBrowserHistory } from 'history';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Build a Library to Reference Icons (font-awesome)
library.add(fab, fas);

export const history = createBrowserHistory();

export const App = () => (
    <Context.Provider history={history}>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={StoriesView} />
                <Route path="/story" component={StoryView} />
                <Route path="/addStory" exact={true} component={AddStoryView} />
                <Route path="/publicStory" component={StoryViedo} />
            </Switch>
        </BrowserRouter>
    </Context.Provider>
);
