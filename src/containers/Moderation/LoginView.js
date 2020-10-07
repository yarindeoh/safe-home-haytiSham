import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { useTranslation } from 'react-i18next';
import { useModerationContext } from './moderationHooks';
import { ModerateStoriesList } from 'containers/Moderation/components/ModerateStoriesList';
import { TagsFilter } from 'containers/Stories/components/TagsFilter';
import LoginForm from 'containers/Moderation/components/LoginForm';

export const LoginView = withRoute(props => {
    const { t } = useTranslation();
    const { moderationState } = useModerationContext();

    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };

    return (
        <div>
            {moderationState?.loggedIn ? (
                <div>
                    <div className={'login-view-container'}>
                        <ModerateStoriesList
                            changeLocationByPath={changeLocationByPath}
                            title={t('login.listToModerate')}
                        />
                        <div style={{ gridArea: 'auto' }}>
                            <TagsFilter
                                changeLocationByPath={changeLocationByPath}
                                rootPath={'/moderateStory'}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                // form to login
                <LoginForm />
            )}
        </div>
    );
});
