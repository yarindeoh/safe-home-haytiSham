import React from 'react';
import { ModerateStoriesList } from 'containers/Moderation/components/ModerateStoriesList';
import { TagsFilter } from 'containers/Stories/components/TagsFilter';

export const LoggedInView = ({ handleStoryClick }) => {
    return (
        <div>
            <div className={'logged-in-view-container'}>
                <ModerateStoriesList handleStoryClick={handleStoryClick} />
                <div className={'stories-list-admin'}>
                    <TagsFilter
                        storiesListClassName={'stories-admin'}
                        handleStoryClick={handleStoryClick}
                        displayEditImg
                        isAdmin={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoggedInView;
