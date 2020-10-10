import React from 'react';
import { ModerateStoriesList } from 'containers/Moderation/components/ModerateStoriesList';
import { TagsFilter } from 'containers/Stories/components/TagsFilter';

export const LoggedInView = ({ changeLocationByPath, handleStoryClick }) => {
    return (
        <div>
            <div className={'logged-in-view-container'}>
                <ModerateStoriesList
                    changeLocationByPath={changeLocationByPath}
                />
                <div className={'stories-list-admin'}>
                    <TagsFilter
                        storiesListClassName={'stories-admin'}
                        handleStoryClick={handleStoryClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoggedInView;
