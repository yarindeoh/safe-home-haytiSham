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
import { LoggedInView } from 'containers/Moderation/LoggedInView';
import { ModerationView } from 'containers/Moderation/ModerationView';
import { ModerationProvider } from 'containers/Moderation/moderationContext';
import ScrollToTop from 'components/ScrollToTop';
import Pages from 'containers/StaticPages/Pages';
import { initializeAnalytics } from './services/analytics/analytics';

export const history = createBrowserHistory();
initializeAnalytics();

export const App = () => {
    return (
        // TODO:: fix to value
        <RouterContext.Provider history={history}>
            <AddStoryProvider>
                <BrowserRouter>
                    <ScrollToTop />
                    <Switch>
                        <Route path="/" exact={true} component={StoriesView} />
                        <Route path="/story/:id" component={StoryView} />
                        <Route
                            path="/addStory"
                            exact={true}
                            component={AddStoryView}
                        />
                        <Route path="/publicStory/:id" component={StoryVideo} />
                        <Route path="/pages" component={Pages} />
                        <ModerationProvider>
                            <Route exact path="/admin" component={LoginView} />
                            <Route
                                exact
                                path="/admin/loggedIn"
                                component={LoggedInView}
                            />
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
