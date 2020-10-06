import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import LoginInput from 'containers/Moderation/components/LoginInput';
import { useTranslation } from 'react-i18next';
import {
    useLoginFiledChange,
    useLoginSubmit
} from 'containers/Moderation/moderationHooks';


export const LoginForm = withRoute(props => {
    const { t } = useTranslation();
    const { loginData, handleFiledChange } = useLoginFiledChange();
    const { handleLogin } = useLoginSubmit(loginData);

    return (
        <div className={'login-page'}>

        <div className={'login-card'}>
            <h3>{t('login.header')}</h3>
            <form onSubmit={handleLogin} >
                <LoginInput
                    name="userName"
                    type="text"
                    label={t('login.userName')}
                    value={loginData.userName}
                    onChange={e => handleFiledChange(e, 'userName')}
                    required
                />
                <LoginInput
                    name="password"
                    type="password"
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
        </div>
    );
});

export default LoginForm;
