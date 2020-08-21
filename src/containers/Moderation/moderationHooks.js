import React, { useState, useContext, useEffect } from 'react';
import Api from './moderationApi';
import { ModerationContext } from './moderationContext';
import {
    NEW_MODERATE_STORY_INIT_DATA,
    SET_LOGGED_IN,
    SET_MODERATE_STORY_DATA
} from './moderationConstants';
import { extractFieldsFromObj } from 'services/general/generalHelpers';

export function useModerationContext() {
    const context = React.useContext(ModerationContext);
    if (context === undefined) {
        throw new Error(
            'ModerationContext must be used within a ModerationProvider'
        );
    }
    return context;
}

export const useLoginFiledChange = (data, setData) => {
    const handleFiledChange = (e, filed) => {
        let newData = { ...data };
        newData[filed] = e.target.value;
        setData(newData);
    };

    return {
        handleFiledChange
    };
};

export const useModerationFiledChange = () => {
    const { moderationState, dispatch } = useModerationContext();
    const handleFiledChange = (e, filed) => {
        let newModerationState = { ...moderationState };
        newModerationState[filed] = e.target.value;
        dispatch({
            type: SET_MODERATE_STORY_DATA,
            payload: newModerationState
        });
    };

    return {
        handleFiledChange
    };
};

export const useLoginSubmit = loginData => {
    const { dispatch } = useModerationContext();

    const handleLogin = e => {
        e.preventDefault();

        async function postLogin() {
            try {
                const serverData = await Api.postLogin(loginData);
                sessionStorage.moderatorToken = serverData.token;
                dispatch({
                    type: SET_LOGGED_IN,
                    payload: true
                });
            } catch (e) {
                window.alert(e);
            }
        }
        postLogin();
    };

    return {
        handleLogin
    };
};

export const useModerationStories = () => {
    const { moderationState } = useModerationContext();

    const [stories, setStories] = useState();
    useEffect(() => {
        if (moderationState.loggedIn) {
            (async () => {
                await setStories(
                    await Api.getModerationStories('createdAt', 'ASC')
                );
            })();
        }
    }, [moderationState.loggedIn]);
    return {
        storiesToModerate: stories?.result
    };
};

export const useModerationStory = story => {
    const { moderationState, dispatch } = useModerationContext();
    useEffect(() => {
        if (story._id !== moderationState._id) {
            const processedStory = extractFieldsFromObj(story, [
                '_id',
                'additionalnfo',
                'background',
                'mail',
                'howDidYouManged',
                'name',
                'quote',
                'storyContent',
                'whatHelpedYou',
                'whatTriggeredChange',
                'contact'
            ]);
            dispatch({
                type: SET_MODERATE_STORY_DATA,
                payload: { ...moderationState, ...processedStory }
            });
        }
    }, []);
    return {};
};

export const useModerateStorySubmit = selectedTags => {
    const { moderationState, dispatch } = useModerationContext();
    const [submitted, setSubmitted] = useState(false);
    let moderationDataToPost = { ...moderationState };
    delete moderationDataToPost.loggedIn;
    moderationDataToPost.originalStory = moderationState._id;
    delete moderationDataToPost._id;

    //TODO: add to json selectedTags

    const handleSubmit = e => {
        e.preventDefault();

        async function postData() {
            try {
                await Api.postModerateStory(moderationDataToPost);
                dispatch({
                    type: SET_MODERATE_STORY_DATA,
                    payload: {
                        ...moderationState,
                        ...NEW_MODERATE_STORY_INIT_DATA
                    }
                });
                setSubmitted(true);
            } catch (e) {
                window.alert(e);
            }
        }
        postData();
    };

    return {
        submitted,
        setSubmitted,
        handleSubmit
    };
};

export const useBack = (props, setSubmitted, path) => {
    const back = e => {
        e.preventDefault();
        setSubmitted(false);
        props.history.push(path);
    };

    return {
        back
    };
};

export const useSelectedTags = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    function onSelect(selectedList, selectedItem) {
        setSelectedTags(selectedTags => [...selectedTags, selectedItem]);
    }
    function onRemove(selectedList, selectedItem) {
        setSelectedTags(selectedTags =>
            selectedTags.filter(e => e !== selectedItem)
        );
    }

    return {
        selectedTags,
        onSelect,
        onRemove
    };
};
