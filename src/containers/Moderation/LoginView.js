import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'components/Input';
import { useTranslation } from 'react-i18next';
import {
    useModerationContext,
    useLoginFiledChange,
    useLoginSubmit
} from './moderationHooks';
import { ModerateStoriesList } from 'containers/Moderation/components/ModerateStoriesList';
import { TagsFilter } from 'containers/Stories/components/TagsFilter';

import '../../scss/componentsStyle/LoginView.scss';

export const LoginView = withRoute(props => {
    const { t } = useTranslation();
    const { moderationState } = useModerationContext();
    const { loginData, handleFiledChange } = useLoginFiledChange();
    const { handleLogin } = useLoginSubmit(loginData);

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
                <div id={'testimony-form'}>
                    <h3>{t('login.header')}</h3>

                    <form onSubmit={handleLogin}>
                        <Input
                            name="userName"
                            label={t('login.userName')}
                            value={loginData.userName}
                            onChange={e => handleFiledChange(e, 'userName')}
                            required
                        />
                        <Input
                            name="password"
                            label={t('login.password')}
                            value={loginData.password}
                            onChange={e => handleFiledChange(e, 'password')}
                            required
                        />
                        <input
                            className="submit-button"
                            type="submit"
                            value={t('login.loginButtonText')}
                        ></input>
                    </form>
                </div>
            )}
        </div>
    );
});
