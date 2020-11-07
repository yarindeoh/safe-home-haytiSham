import React from 'react';
import { ModerateStoriesList } from 'containers/Moderation/components/ModerateStoriesList';
import { TagsFilter } from 'containers/Stories/components/TagsFilter';
import {
    useModeratedStories,
    useEditModerationStory,
    useModerationLoggedOut
} from 'containers/Moderation/moderationHooks';

export const LoggedInView = () => {
    const { getModerationStory } = useEditModerationStory();
    useModerationLoggedOut();

    const handleStoryClick = storyId => {
        try {
            getModerationStory(storyId);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <div className={'logged-in-view-container'}>
                <ModerateStoriesList handleStoryClick={handleStoryClick} />
                <div className={'stories-list-admin'}>
                    <TagsFilter
                        storiesListClassName={'stories-admin'}
                        handleStoryClick={handleStoryClick}
                        displayEditImg
                        useStoriesHook={useModeratedStories}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoggedInView;
