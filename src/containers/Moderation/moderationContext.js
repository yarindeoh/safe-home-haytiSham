import React, { useReducer } from 'react';

import {
    NEW_MODERATE_STORY_INIT_DATA,
    SET_LOGGED_IN,
    SET_MODERATE_STORY_DATA
} from './moderationConstants';

const initialState = {
    ...NEW_MODERATE_STORY_INIT_DATA,
    loggedIn: sessionStorage.moderatorToken !== undefined
};

function reducer(state, action) {
    switch (action.type) {
        case SET_MODERATE_STORY_DATA:
            return { ...state, ...action.payload };
        case SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.payload
            };
        default:
            throw new Error();
    }
}

export const ModerationContext = React.createContext({});

export function ModerationProvider({ children }) {
    const [moderationState, dispatch] = useReducer(reducer, initialState);
    return (
        <ModerationContext.Provider value={{ moderationState, dispatch }}>
            {children}
        </ModerationContext.Provider>
    );
}
