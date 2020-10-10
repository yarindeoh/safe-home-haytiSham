import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { useModerationContext } from './moderationHooks';
import LoggedInView from 'containers/Moderation/LoggedInView';
import LoginForm from 'containers/Moderation/components/LoginForm';

export const LoginView = withRoute(props => {
    const { moderationState } = useModerationContext();

    return (
        <div>
            {moderationState?.loggedIn ? (
                <LoggedInView {...props} />
            ) : (
                <LoginForm />
            )}
        </div>
    );
});
