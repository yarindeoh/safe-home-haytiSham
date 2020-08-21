import React, { useReducer } from 'react';

import { NEW_STORY_INIT_DATA } from './addStoryConstants';

const initialState = NEW_STORY_INIT_DATA;

function reducer(state, action) {
    switch (action.type) {
        case 'SET_STORY_DATA':
            return { ...state, ...action.payload };
        case 'SET_CONTACT':
            return {
                ...state,
                contact: action.payload
            };
        default:
            throw new Error();
    }
}

export const AddStoryContext = React.createContext({});

export function AddStoryProvider({ children }) {
    const [addStoryState, dispatch] = useReducer(reducer, initialState);
    return (
        <AddStoryContext.Provider value={{ addStoryState, dispatch }}>
            {children}
        </AddStoryContext.Provider>
    );
}
