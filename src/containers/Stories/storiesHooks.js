import Api from 'containers/Stories/storiesApi';
import ModerationApi from 'containers/Moderation/moderationApi';
import { useModerationRemoveTokenOnError } from 'containers/Moderation/moderationHooks';
import { useEffect, useState, useCallback } from 'react';
import { useFetchApiData } from 'services/general/generalHooks';

import { getSlicedTagsObj } from 'services/general/generalHelpers';
import { PAGE_SIZE } from './storiesConstants';

export const useTags = defaultSelectedTags => {
    const { localState: tags } = useFetchApiData(Api.getTagsMap, []);
    const [isDisplayMoreTags, setIsDisplayMoreTags] = useState(false);
    const { tagsData, changeTagSelected, unselectAllTags } = useSelectedTags(
        tags,
        defaultSelectedTags
    );
    const getDisplayedTags = useCallback(
        tags =>
            isDisplayMoreTags ? tags : tags && getSlicedTagsObj(tags, 0, 5),
        [isDisplayMoreTags]
    );
    return {
        tagsMap: tags,
        changeTagSelected,
        isDisplayMoreTags,
        unselectAllTags,
        changeDisplayMoreTags: useCallback(() => {
            setIsDisplayMoreTags(showMoreTags => !showMoreTags);
        }, []),
        tagsData: getDisplayedTags(tagsData)
    };
};

export const useSelectedTags = tags => {
    const [tagsData, setTagsData] = useState({});
    const generateTagsData = useCallback(
        tags =>
            tags
                ? Object.keys(tags).reduce((accumulator, tagId) => {
                      accumulator[tagId] = {
                          value: tags[tagId],
                          selected: false
                      };
                      return accumulator;
                  }, {})
                : null,
        [tags]
    );
    useEffect(() => {
        setTagsData(generateTagsData(tags));
    }, [tags]);
    return {
        tagsData,
        unselectAllTags: useCallback(() => {
            setTagsData(prevTagsData => {
                let tags = { ...prevTagsData };
                return Object.keys(tags).map(id => {
                    return Object.assign({}, tags[id], {
                        selected: false
                    });
                });
            });
        }, [tagsData]),
        changeTagSelected: useCallback(
            tag =>
                setTagsData(prevTagsData => {
                    return {
                        ...prevTagsData,
                        [tag]: {
                            ...prevTagsData[tag],
                            selected: !prevTagsData[tag].selected
                        }
                    };
                }),
            [tagsData]
        )
    };
};

export const useFilteredStories = (tags, isAdmin) => {
    const { removeModerationTokenOnError } = useModerationRemoveTokenOnError();

    const [data, setData] = useState({
        stories: [],
        hasMore: true,
        page: 1,
        init: false
    });

    const pageSize = PAGE_SIZE;

    async function addNextPageData(tags, storiesSoFar, pageNumber) {
        const get_function = isAdmin
            ? ModerationApi.getAllModeratedStories
            : Api.getStoriesByTags;
        try {
            let result = await get_function({
                tags,
                pageSize,
                page: pageNumber
            });
            let newData = { ...data };

            if (pageNumber < result.pages) {
                newData.page = pageNumber + 1;
                newData.hasMore = true;
            } else if (data.page === result.pages) {
                newData.page = pageNumber;
                newData.hasMore = false;
            }
            newData.stories = [...storiesSoFar, ...result?.result];
            newData.init = true;
            setData(newData);
        } catch (error) {
            removeModerationTokenOnError(error);
        }
    }
    async function replaceRelatedTags(tags) {
        await addNextPageData(tags, [], 1);
    }
    async function getNextPage() {
        await addNextPageData(tags, data.stories, data.page);
    }

    useEffect(() => {
        replaceRelatedTags(tags);
    }, [tags]);

    return {
        stories: data.stories,
        hasMore: data.hasMore,
        getNextPage,
        init: data.init
    };
};
