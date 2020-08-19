import React, {useState} from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Context } from 'services/routing/context';
import { AddStoryContext } from 'containers/AddStory/addStoryContext';
import { addStoryDataInit } from 'containers/AddStory/addStoryConstants';
import { StoriesView } from 'containers/Stories/StoriesView';
import './scss/componentsStyle/App.scss';
import { StoryView } from 'containers/Story/StoryView';
import { AddStoryView } from 'containers/AddStory/AddStoryView';
import { StoryVideo } from 'containers/Story/components/StoryVideo';
import { createBrowserHistory } from 'history';
import { LoginView } from './containers/Moderation/loginView';
import { ModerationView } from './containers/Moderation/ModerationView';
import { moderationDataInit } from './containers/Moderation/moderationConstants';
import { ModerationContext } from './containers/Moderation/moderationContext';

export const history = createBrowserHistory();

export const App = () => {
    const [addStoryData, setAddStoryData] = useState(addStoryDataInit);    
    const [moderationData, setModerationData] = useState(Object.assign({}, moderationDataInit, {loggedIn: sessionStorage.moderatorToken !== undefined}));    
    return (
    <Context.Provider history={history}>
        <ModerationContext.Provider value={{moderationData, setModerationData}}>
            <AddStoryContext.Provider value={{addStoryData, setAddStoryData}}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact={true} component={StoriesView} />
                        <Route path="/story" component={StoryView} />
                        <Route path="/addStory" exact={true} component={AddStoryView} />
                        <Route path="/publicStory/:id" component={StoryVideo} />
                        <Route path="/admin" component={LoginView} />
                        <Route path="/moderateStory" component={ModerationView} />
                    </Switch>
                </BrowserRouter>
            </AddStoryContext.Provider>
        </ModerationContext.Provider>        
    </Context.Provider>
)};
