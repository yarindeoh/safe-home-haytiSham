import { useState, useContext, useEffect } from 'react';
import Api from 'containers/Moderation/moderationApi';
import { ModerationContext } from 'containers/Moderation/moderationContext';
import {
    NEW_MODERATE_STORY_INIT_DATA,
    SET_LOGGED_IN,
    SET_MODERATE_STORY_DATA,
    SET_TAGS,
    SET_ERROR,
    PAGE_SIZE
} from 'containers/Moderation/moderationConstants';
import {
    extractFieldsFromObj,
    getArrayOfTagsIds,
    filterObjByKey,
    getTagsAsArray
} from 'services/general/generalHelpers';
import { useLoginSubmit } from 'services/general/generalHooks';
import { useHistory } from 'react-router';
import { usePagination } from 'services/general/generalHooks';

export function useModerationContext() {
    const context = useContext(ModerationContext);
    if (context === undefined) {
        throw new Error(
            'ModerationContext must be used within a ModerationProvider'
        );
    }
    return context;
}

export const useModerationErrorsHandler = () => {
    const { loggedOutHandler } = useModerationLoggedOut();
    const { dispatch } = useModerationContext();

    async function on401(e) {
        dispatch({
            type: SET_ERROR,
            payload: e.message
        });
        return await loggedOutHandler();
    }

    function onDefault(e) {
        dispatch({
            type: SET_ERROR,
            payload: e.message
        });
    }

    const ErrorsHandlerFunctionObj = {
        '401': e => on401(e),
        default: e => onDefault(e)
    };

    async function moderationErrorsHandler(e) {
        let handleErrorToInvoke =
            ErrorsHandlerFunctionObj[e.message] !== undefined
                ? ErrorsHandlerFunctionObj[e.message]
                : ErrorsHandlerFunctionObj.default;
        return await handleErrorToInvoke(e);
    }
    return {
        moderationErrorsHandler
    };
};

export const useModerationApiWrapper = apiFunc => {
    const { moderationErrorsHandler } = useModerationErrorsHandler();
    const { moderationState } = useModerationContext();

    async function apiWrapper(params) {
        try {
            if (!moderationState.loggedIn) return;
            return await apiFunc(params);
        } catch (e) {
            moderationErrorsHandler(e);
        }
    }

    return {
        apiWrapper
    };
};

export const useModerationLoggedOut = () => {
    const history = useHistory();
    const { moderationState, dispatch } = useModerationContext();

    const loggedOutHandler = async () => {
        localStorage.removeItem('moderatorToken');
        dispatch({
            type: SET_LOGGED_IN,
            payload: localStorage.getItem('moderatorToken') !== null
        });
        history.replace('/admin');
    };

    useEffect(() => {
        if (!moderationState?.loggedIn) {
            history.replace('/admin');
        }
    }, [moderationState?.loggedIn]);

    return {
        loggedOutHandler
    };
};

export const useModerationLoginSubmit = loginData => {
    const { dispatch } = useModerationContext();
    const { moderationErrorsHandler } = useModerationErrorsHandler();
    const { postLogin } = useLoginSubmit(
        loginData,
        Api.postLogin,
        'moderatorToken'
    );

    const handleModerationLogin = e => {
        e.preventDefault();

        async function callPostLogin() {
            try {
                await postLogin();
                dispatch({
                    type: SET_LOGGED_IN,
                    payload: true
                });
                dispatch({
                    type: SET_ERROR,
                    payload: null
                });
            } catch (e) {
                moderationErrorsHandler(e);
            }
        }
        callPostLogin();
    };

    return {
        handleModerationLogin
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

export const useModerationStories = () => {
    const { apiWrapper: getModerationStories } = useModerationApiWrapper(
        Api.getModerationStories
    );
    const {
        getByPage,
        data,
        replaceRelatedOptions,
        total,
        totalPages,
        page,
        didFetch
    } = usePagination(getModerationStories, PAGE_SIZE);
    const { moderationState } = useModerationContext();

    useEffect(() => {
        if (moderationState.loggedIn) {
            (async function getWithOptions() {
                replaceRelatedOptions(
                    {
                        sortField: 'createdAt',
                        sortDirection: 'ASC'
                    },
                    true
                );
            })();
        }
    }, [moderationState.loggedIn]);

    function handlePageChange(e, page) {
        getByPage(page);
    }

    return {
        stories: data,
        currentPage: page,
        totalPages: totalPages,
        totalStories: total,
        handlePageChange: handlePageChange,
        didFetch
    };
};

export const useEditModerationStory = () => {
    const history = useHistory();
    const { apiWrapper: getStoryForEdit } = useModerationApiWrapper(
        Api.getStoryForEdit
    );

    async function getModerationStory(id) {
        let result = await getStoryForEdit(id);
        if (result !== undefined) {
            let id =
                result.originalStory !== null
                    ? result.originalStory._id
                    : result.moderatedStory?._id;
            history.push(`/moderateStory/${id}`, result);
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
                'contact',
                'contactTime',
                'publish'
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
        if (moderatedStory.tagsIds?.length > 0) {
            const chosenTags = getTagsAsArray(
                filterObjByKey(tagsMap, moderatedStory.tagsIds)
            );
            dispatch({
                type: SET_TAGS,
                payload: chosenTags
            });
        }
    }, [tagsMap]);

    return {};
};

export const useModerateStorySubmit = originalStoryModerated => {
    const { moderationState } = useModerationContext();
    const { apiWrapper: postAddModerateStory } = useModerationApiWrapper(
        Api.postAddModerateStory
    );

    const [submitted, setSubmitted] = useState(false);
    let moderationDataToPost = { ...moderationState };
    delete moderationDataToPost.loggedIn;
    if (moderationDataToPost.originalStory === '') {
        moderationDataToPost.originalStory = moderationState._id;
    }
    delete moderationDataToPost._id;
    moderationDataToPost.tags = getArrayOfTagsIds(moderationDataToPost.tags);
    moderationDataToPost.publish = originalStoryModerated
        ? moderationDataToPost.publish
        : true;

    const handleSubmit = e => {
        e.preventDefault();

        async function postData() {
            await postAddModerateStory(moderationDataToPost);
            setSubmitted(true);
        }
        postData();
    };

    return {
        submitted,
        setSubmitted,
        handleSubmit
    };
};

export const useDialogOkClick = back => {
    const { moderationState, dispatch } = useModerationContext();

    const handleDialogOkClick = e => {
        e.preventDefault();
        dispatch({
            type: SET_MODERATE_STORY_DATA,
            payload: {
                ...moderationState,
                ...NEW_MODERATE_STORY_INIT_DATA
            }
        });
        back(e);
    };

    return {
        handleDialogOkClick
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

export const usePublishModerateStory = () => {
    const { moderationState } = useModerationContext();
    const { apiWrapper: postPublishModerateStory } = useModerationApiWrapper(
        Api.postPublishModerateStory
    );

    const [publishPostSuccess, setPublishPostSuccess] = useState(false);

    async function handlePublish(publish) {
        const dataToSubmit = {
            publish: publish,
            moderatedStory: moderationState._id
        };
        await postPublishModerateStory(dataToSubmit);
        setPublishPostSuccess(true);
    }

    return {
        handlePublish,
        publishPostSuccess
    };
};

export const useModeratedStories = tags => {
    const { moderationState } = useModerationContext();

    const { apiWrapper: getAllModeratedStories } = useModerationApiWrapper(
        Api.getAllModeratedStories
    );
    const { getNextPage, hasMore, data, replaceRelatedOptions } = usePagination(
        getAllModeratedStories,
        PAGE_SIZE
    );

    useEffect(() => {
        (async function fetchData() {
            if (!moderationState.loggedIn) return;
            replaceRelatedOptions({ tags: tags, sortField: 'updatedAt' });
        })();
    }, [tags]);

    return {
        stories: data,
        hasMore: hasMore,
        getNextPage
    };
};
