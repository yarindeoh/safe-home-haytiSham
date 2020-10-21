import Api from 'containers/Stories/storiesApi';
import { useEffect, useState, useCallback } from 'react';
import { useFetchApiData } from 'services/general/generalHooks';

import { getSlicedTagsObj } from 'services/general/generalHelpers';

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

export const useSelectedTags = (tags, defaultSelectedTags = []) => {
    const [tagsData, setTagsData] = useState({});
    useEffect(() => {
        setTagsData(generateTagsData(tags));
    }, [tags]);
    const generateTagsData = useCallback(
        tags =>
            tags
                ? Object.keys(tags).reduce((accumulator, tagId) => {
                      const tagIdNumber = parseInt(tagId);
                      accumulator[tagId] = {
                          value: tags[tagId],
                          selected: tagIdNumber
                              ? defaultSelectedTags.indexOf(tagIdNumber) > -1
                              : false
                      };
                      return accumulator;
                  }, {})
                : null,
        [tags]
    );

    return {
        tagsData,
        unselectAllTags: useCallback(
            () =>
                setTagsData(prevTagsData => {
                    return Object.keys(prevTagsData).reduce((acc, tag) => {
                        acc[tag] = {
                            ...prevTagsData[tag],
                            selected: false
                        };

                        return acc;
                    }, {});
                }),
            []
        ),
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
            []
        )
    };
};

export const useFilteredStories = tags => {
    const [data, setData] = useState({
        stories: [],
        hasMore: true,
        page: 1,
        init: false
    });

    const pageSize = 5;

    async function addNextPageData(tags, storiesSoFar, pageNumber) {
        let result = await Api.getStoriesByTags({
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
