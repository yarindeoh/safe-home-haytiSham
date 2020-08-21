import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AddStoryProvider } from 'containers/AddStory/addStoryContext';
import { StoriesView } from 'containers/Stories/StoriesView';
import './scss/componentsStyle/App.scss';
import { StoryView } from 'containers/Story/StoryView';
import { AddStoryView } from 'containers/AddStory/AddStoryView';
import { StoryVideo } from 'containers/Story/components/StoryVideo';
import { RouterContext } from 'services/routing/routerContext';
import { createBrowserHistory } from 'history';
import { LoginView } from './containers/Moderation/loginView';
import { ModerationView } from './containers/Moderation/ModerationView';
import { ModerationProvider } from './containers/Moderation/moderationContext';

export const history = createBrowserHistory();

export const App = () => {
    return (
        <RouterContext.Provider history={history}>
            <ModerationProvider>
                <AddStoryProvider>
                    <BrowserRouter>
                        <Switch>
                            <Route
                                path="/"
                                exact={true}
                                component={StoriesView}
                            />
                            <Route path="/story" component={StoryView} />
                            <Route
                                path="/addStory"
                                exact={true}
                                component={AddStoryView}
                            />
                            <Route
                                path="/publicStory/:id"
                                component={StoryVideo}
                            />
                            <Route path="/admin" component={LoginView} />
                            <Route
                                path="/moderateStory"
                                component={ModerationView}
                            />
                        </Switch>
                    </BrowserRouter>
                </AddStoryProvider>
            </ModerationProvider>
        </RouterContext.Provider>
    );
};
