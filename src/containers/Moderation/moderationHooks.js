import { useState, useContext, useEffect } from 'react';
import Api from './moderationApi';
import { ModerationContext } from './moderationContext';
import {
    NEW_MODERATE_STORY_INIT_DATA,
    SET_LOGGED_IN,
    SET_MODERATE_STORY_DATA,
    SET_TAGS
} from './moderationConstants';
import {
    extractFieldsFromObj,
    getArrayOfTagsIds,
    filterObjByKey,
    getTagsAsArray
} from 'services/general/generalHelpers';
import { useHistory } from 'react-router';

export function useModerationContext() {
    const context = useContext(ModerationContext);
    if (context === undefined) {
        throw new Error(
            'ModerationContext must be used within a ModerationProvider'
        );
    }
    return context;
}

export const useRemoveTokenOnError = () => {
    const { dispatch } = useModerationContext();

    function removeTokenOnError(e) {
        if (e.message === '401') {
            window.alert('User Token is not valid');
            localStorage.removeItem('moderatorToken');
            dispatch({
                type: SET_LOGGED_IN,
                payload: localStorage.getItem('moderatorToken') !== null
            });
        }
    }
    return {
        removeTokenOnError
    };
};

export const useLoginFiledChange = () => {
    const [loginData, setLoginData] = useState({ userName: '', password: '' });
    const handleFieldChange = (e, filed) => {
        let newLoginData = { ...loginData };
        newLoginData[filed] = e.target.value;
        setLoginData(newLoginData);
    };

    return {
        loginData,
        handleFieldChange
    };
};

export const useModerationFiledChange = () => {
    const { moderationState, dispatch } = useModerationContext();
    const handleFieldChange = (e, filed) => {
        let newModerationState = { ...moderationState };
        newModerationState[filed] = e.target.value;
        dispatch({
            type: SET_MODERATE_STORY_DATA,
            payload: newModerationState
        });
    };

    return {
        handleFieldChange
    };
};

export const useLoginSubmit = loginData => {
    const { dispatch } = useModerationContext();

    const handleLogin = e => {
        e.preventDefault();

        async function postLogin() {
            try {
                const serverData = await Api.postLogin(loginData);
                localStorage.setItem('moderatorToken', serverData.token);
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
    const { removeTokenOnError } = useRemoveTokenOnError();
    const [data, setData] = useState({
        storiesPerPage: undefined,
        currentPage: 1,
        totalPages: 0,
        totalStories: 0
    });
    const pageSize = 10;

    async function handlePageChange(event, page) {
        try {
            let result = await Api.getModerationStories(
                pageSize,
                page,
                'createdAt',
                'ASC'
            );
            let newData = { ...data };
            newData.totalPages = result.pages;
            newData.currentPage = page;
            newData.totalStories = result.total;
            newData.storiesPerPage = [...result?.result];
            setData(newData);
        } catch (e) {
            removeTokenOnError(e);
        }
    }

    useEffect(() => {
        if (moderationState.loggedIn) {
            handlePageChange(undefined, 1);
        }
    }, [moderationState.loggedIn]);

    return {
        stories: data.storiesPerPage,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalStories: data.totalStories,
        handlePageChange
    };
};

export const useEditModerationStory = () => {
    let history = useHistory();
    const { removeTokenOnError } = useRemoveTokenOnError();

    async function getModerationStory(id) {
        try {
            let result = await Api.getStoryForEdit(id);
            if (result !== undefined) {
                let id =
                    result.originalStory !== null
                        ? result.originalStory._id
                        : result.moderatedStory?._id;
                history.push(`/moderateStory/${id}`, result);
            }
        } catch (e) {
            removeTokenOnError(e);
        }
    }

    return {
        getModerationStory
    };
};

/////TODO need to change context and check original!==null

export const useModerationStory = (moderatedStory, tagsMap) => {
    const { moderationState, dispatch } = useModerationContext();
    useEffect(() => {
        if (moderatedStory._id !== moderationState._id) {
            const processedStory = extractFieldsFromObj(moderatedStory, [
                '_id',
                'originalStory',
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
                payload: { ...NEW_MODERATE_STORY_INIT_DATA, ...processedStory }
            });
            dispatch({
                type: SET_TAGS,
                payload: []
            });
        }
    }, []);

    useEffect(() => {
        if (moderatedStory.tags?.length > 0) {
            let chosenTags = getTagsAsArray(
                filterObjByKey(tagsMap, moderatedStory.tags)
            );
            dispatch({
                type: SET_TAGS,
                payload: chosenTags
            });
        }
    }, [tagsMap]);

    return {};
};

export const useModerateStorySubmit = () => {
    const { moderationState, dispatch } = useModerationContext();
    const { removeTokenOnError } = useRemoveTokenOnError();
    const [submitted, setSubmitted] = useState(false);
    let moderationDataToPost = { ...moderationState };
    delete moderationDataToPost.loggedIn;
    if (moderationDataToPost.originalStory === '') {
        moderationDataToPost.originalStory = moderationState._id;
    }
    delete moderationDataToPost._id;
    moderationDataToPost.tags = getArrayOfTagsIds(moderationDataToPost.tags);

    const handleSubmit = e => {
        e.preventDefault();

        async function postData() {
            try {
                await Api.postAddModerateStory(moderationDataToPost);
                dispatch({
                    type: SET_MODERATE_STORY_DATA,
                    payload: {
                        ...moderationState,
                        ...NEW_MODERATE_STORY_INIT_DATA
                    }
                });
                setSubmitted(true);
            } catch (e) {
                removeTokenOnError(e);
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

export const useSelectedTags = () => {
    const { dispatch } = useModerationContext();
    function handleSelectedTags(selectedList) {
        dispatch({
            type: SET_TAGS,
            payload: selectedList
        });
    }

    return {
        handleSelectedTags
    };
};
