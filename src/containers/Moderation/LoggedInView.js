import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { useTranslation } from 'react-i18next';
import { ModerateStoriesList } from 'containers/Moderation/components/ModerateStoriesList';
import { TagsFilter } from 'containers/Stories/components/TagsFilter';

export const LoggedInView = withRoute(props => {
    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };

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
                    />
                </div>
            </div>
        </div>
    );
});

export default LoggedInView;
