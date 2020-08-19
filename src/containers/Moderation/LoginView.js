import React, { useState, useContext } from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'components/Input';
import { useTranslation } from 'react-i18next';
import {
    useFiledChange,
    useLoginSubmit,
    useModerationStories
} from './moderationHooks';
import { ModerationContext } from './moderationContext';
import { StoryHighlight } from 'containers/Story/components/StoryHighlight';
import { useAllStories } from 'containers/Stories/storiesHooks';

// import BackArrowIcon from 'src/media/icons/backArrow.svg';

export const LoginView = withRoute(props => {
    const { t } = useTranslation();
    const { moderationData } = useContext(ModerationContext);
    const [loginData, setLoginData] = useState({ userName: '', password: '' });
    const { handleFiledChange } = useFiledChange(loginData, setLoginData);
    const { handleLogin } = useLoginSubmit(loginData);

    const { storiesToModerate } = useModerationStories();
    const { allStories } = useAllStories(moderationData.loggedIn);

    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };

    return (
        <div>
            {moderationData.loggedIn ? (
                <div>
                    {/* list with stories before moderation */}
                    <header>
                        <h3>{t('login.listToModerate')}</h3>
                    </header>
                    <main className={'stories'}>
                        {storiesToModerate &&
                            Object.keys(storiesToModerate).map(key => {
                                return (
                                    <StoryHighlight
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
                    </main>
                    {/* All Stories */}
                    <header>
                        <h3>{t('login.listAllStories')}</h3>
                    </header>
                    <main className={'stories'}>
                        {allStories &&
                            Object.keys(allStories).map(key => {
                                return (
                                    <StoryHighlight
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
