import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { AddStoryProvider } from 'containers/AddStory/addStoryContext';
import { StoriesView } from 'containers/Stories/StoriesView';
import './scss/componentsStyle/App.scss';
import { StoryView } from 'containers/Story/StoryView';
import { AddStoryView } from 'containers/AddStory/AddStoryView';
import { StoryVideo } from 'containers/Story/components/StoryVideo';
import { RouterContext } from 'services/routing/routerContext';
import { LoginView } from 'containers/Moderation/LoginView';
import { ModerationView } from 'containers/Moderation/ModerationView';
import { ModerationProvider } from 'containers/Moderation/moderationContext';

export const history = createBrowserHistory();

export const App = () => {
    return (
        <RouterContext.Provider history={history}>
            <AddStoryProvider>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact={true} component={StoriesView} />
                        <Route path="/story" component={StoryView} />
                        <Route
                            path="/addStory"
                            exact={true}
                            component={AddStoryView}
                        />
                        <Route path="/publicStory/:id" component={StoryVideo} />
                        <ModerationProvider>
                            <Route path="/admin" component={LoginView} />
                            <Route
                                path="/moderateStory"
                                component={ModerationView}
                            />
                        </ModerationProvider>
                    </Switch>
                </BrowserRouter>
            </AddStoryProvider>
        </RouterContext.Provider>
    );
};
