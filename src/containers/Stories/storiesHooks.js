import Api from 'containers/Stories/storiesApi';
import { useEffect, useState, useCallback } from 'react';

import { getSlicedTagsObj } from 'services/general/generalHelpers';

export const useAllTags = () => {
    const [tags, setTags] = useState();
    useEffect(() => {
        (async function fetchData() {
            setTags(await Api.getTagsMap());
        })();
    }, []);
    return tags;
};

export const useDisplayedTags = tags => {
    const [showMoreTags, setShowMoreTags] = useState(false);

    const tagsToReturn = showMoreTags
        ? tags
        : tags && getSlicedTagsObj(tags, 0, 5);
    return {
        tags: tagsToReturn,
        showMoreTags,
        handleShowMoreTagsChange: useCallback(() => {
            setShowMoreTags(showMoreTags => !showMoreTags);
        }, [])
    };
};

export const useFilteredStories = tags => {
    const [stories, setStories] = useState();
    useEffect(() => {
        (async () => {
            await setStories(await Api.getStoriesByTags(tags || []));
        })();
    }, [tags]);
    return {
        stories: stories?.result
    };
};

export const useTagsMap = () => {
    const [tags, setTags] = useState();
    useEffect(() => {
        (async function fetchData() {
            setTags(await Api.getAllTags());
        })();
    }, [tags]);
    return {
        tags
    };
};

export const useAllStories = needToRefresh => {
    let tags = useAllTags();
    tags = tags && Object.keys(tags);
    const [stories, setStories] = useState();
    useEffect(() => {
        if (needToRefresh) {
            (async () => {
                await setStories(await Api.getStoriesByTags(tags || []));
            })();
        }
    }, [needToRefresh]);
    return {
        allStories: stories?.result
    };
};
