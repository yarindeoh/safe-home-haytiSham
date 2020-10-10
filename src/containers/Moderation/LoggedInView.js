import React from 'react';
import { ModerateStoriesList } from 'containers/Moderation/components/ModerateStoriesList';
import { TagsFilter } from 'containers/Stories/components/TagsFilter';

export const LoggedInView = ({ changeLocationByPath }) => {
    return (
        <div>
            <div className={'logged-in-view-container'}>
                <ModerateStoriesList
                    changeLocationByPath={changeLocationByPath}
                />
                <div className={'stories-list-admin'}>
                    <TagsFilter
                        changeLocationByPath={changeLocationByPath}
                        rootPath={'/moderateStory'}
                        storiesListClassName={'stories-admin'}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoggedInView;
