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
            props.history.push(`/moderateStory/${story._id}`, story);
            ///TODO: for TEST nNEED TO DELETE AFTER IMPLEMENT API's
        } catch (error) {
            let story_tmp = {
                additionalnfo: '',
                background: 'טסט3',
                contact: true,
                createdAt: '2020-10-10T09:47:37.450Z',
                howDidYouManged: 'טסט3',
                mail: 'טסט3',
                moderated: false,
                name: 'טסט3',
                quote: '',
                sequence: 42,
                storyContent: 'טסט3',
                updatedAt: '2020-10-10T09:47:37.450Z',
                whatHelpedYou: '',
                whatTriggeredChange: 'טסט3',
                __v: 0,
                _id: '5f81833943bf3c258489bbb1'
            };
            props.history.push(
                `/moderateStory/5f81833943bf3c258489bbb1`,
                story_tmp
            );
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
