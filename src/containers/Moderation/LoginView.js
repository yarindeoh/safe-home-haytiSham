import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import {
    useModerationContext,
    useEditModerationStory
} from './moderationHooks';
import LoggedInView from 'containers/Moderation/LoggedInView';
import LoginForm from 'containers/Moderation/components/LoginForm';

export const LoginView = withRoute(props => {
    const { moderationState } = useModerationContext();
    const { story, getModerationStory } = useEditModerationStory();

    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };

    const handleStoryClick = storyId => {
        try {
            getModerationStory(storyId);
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div>
            {moderationState?.loggedIn ? (
                <LoggedInView
                    changeLocationByPath={changeLocationByPath}
                    handleStoryClick={handleStoryClick}
                />
            ) : (
                <LoginForm />
            )}
        </div>
    );
});
