import React, { useState, useContext } from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'components/Input';
import { useTranslation } from 'react-i18next';
import {
    useModerationContext,
    useLoginFiledChange,
    useLoginSubmit,
    useModerationStories
} from './moderationHooks';
import { StoryHighlight } from 'containers/Story/components/StoryHighlight';
import { useAllStories } from 'containers/Stories/storiesHooks';

// import BackArrowIcon from 'src/media/icons/backArrow.svg';

export const LoginView = withRoute(props => {
    const { t } = useTranslation();
    const { moderationState, dispatch } = useModerationContext();
    const [loginData, setLoginData] = useState({ userName: '', password: '' });
    const { handleFiledChange } = useLoginFiledChange(loginData, setLoginData);
    const { handleLogin } = useLoginSubmit(loginData);

    const { storiesToModerate } = useModerationStories();
    const { allStories } = useAllStories();

    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };

    return (
        <div>
            {moderationState?.loggedIn ? (
                <div>
                    {/* list with stories before moderation */}
                    <header>
                        <h3>{t('login.listToModerate')}</h3>
                    </header>
                    <main className={'stories'}>
                        <ol>
                            {storiesToModerate &&
                                Object.keys(storiesToModerate).map(key => {
                                    return (
                                        <StoryHighlight
                                            liStyle={{ margin: '10px' }}
                                            story={storiesToModerate[key]}
                                            key={key}
                                            changeLocationByPath={() =>
                                                changeLocationByPath(
                                                    `moderateStory/${storiesToModerate[key]._id}`,
                                                    storiesToModerate[key]
                                                )
                                            }
                                        />
                                    );
                                })}
                        </ol>
                    </main>
                    {/* All Stories */}
                    <header>
                        <h3>{t('login.listAllStories')}</h3>
                    </header>
                    <main className={'stories'}>
                        <ol>
                            {allStories &&
                                Object.keys(allStories).map(key => {
                                    return (
                                        <StoryHighlight
                                            liStyle={{ margin: '10px' }}
                                            story={allStories[key]}
                                            key={key}
                                            changeLocationByPath={() =>
                                                changeLocationByPath(
                                                    `moderateStory/${allStories[key]._id}`,
                                                    allStories[key]
                                                )
                                            }
                                        />
                                    );
                                })}
                        </ol>
                    </main>
                </div>
            ) : (
                // form to login
                <div id={'testimony-form'}>
                    {/* <header>
                    <BackArrowIcon className={'back-arrow-icon'} onClick={back}/>
                    <h1>{t('addStoryView.myConfession')}</h1>
                </header> */}
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
