import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Route, Redirect } from 'react-router-dom';
import {
    useModerationContext,
} from './moderationHooks';
import LoginForm from 'containers/Moderation/components/LoginForm';

export const LoginView = withRoute(props => {
    const { moderationState } = useModerationContext();

    return (
        <>
        <Route exact path="/admin">
            {moderationState?.loggedIn ? <Redirect to="/admin/loggedIn" /> : <LoginForm />}
        </Route>
            
        </>
    );
});
