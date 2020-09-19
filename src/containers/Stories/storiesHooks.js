import Api from 'containers/Stories/storiesApi';
import { useEffect, useState, useCallback } from 'react';

import { getSlicedTagsObj } from 'services/general/generalHelpers';

export const useTags = defaultSelectedTags => {
    const [tags, setTags] = useState();
    const { tagsData, changeTagSelected, unselectAllTags } = useSelectedTags(
        tags,
        defaultSelectedTags
    );
    const {
        isDisplayMoreTags,
        changeDisplayMoreTags,
        getDisplayedTags
    } = useShowMoreTags(tags);

    // get tags after mounts
    useEffect(() => {
        (async function fetchData() {
            setTags(await Api.getTagsMap());
        })();
    }, []);

    return {
        tagsMap: tags,
        tagsData: getDisplayedTags(tagsData),
        changeTagSelected,
        isDisplayMoreTags,
        changeDisplayMoreTags,
        unselectAllTags
    };
};

export const useSelectedTags = (tags, defaultSelectedTags = []) => {
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
                : {},
        []
    );

    const [tagsData, setTagsData] = useState({});

    useEffect(() => {
        setTagsData(generateTagsData(tags));
    }, [tags]);

    return {
        tagsData,
        unselectAllTags: useCallback(
            () =>
                setTagsData(prevTagsData => {
                    return Object.keys(prevTagsData).reduce(
                        (accumelator, tag) => {
                            accumelator[tag] = {
                                ...prevTagsData[tag],
                                selected: false
                            };

                            return accumelator;
                        },
                        {}
                    );
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

export const useShowMoreTags = () => {
    const [isDisplayMoreTags, setIsDisplayMoreTags] = useState(false);
    return {
        isDisplayMoreTags,
        changeDisplayMoreTags: useCallback(() => {
            setIsDisplayMoreTags(showMoreTags => !showMoreTags);
        }, []),
        getDisplayedTags: useCallback(
            tags =>
                isDisplayMoreTags ? tags : tags && getSlicedTagsObj(tags, 0, 5),
            [isDisplayMoreTags]
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

    async function getByPage(tags, storiesSoFar, pageNumber) {
        let result = await Api.getStoriesByTags(tags, pageSize, pageNumber);
        let newData = { ...data };

        if (pageNumber < result.pages) {
            newData.page = pageNumber + 1;
        } else if (data.page === result.pages) {
            newData.page = pageNumber;
            newData.hasMore = false;
        }
        newData.stories = [...storiesSoFar, ...result?.result];
        newData.init = true;
        setData(newData);
    }

    async function replaceRelatedTags(tags) {
        await getByPage(tags, [], 1);
    }
    async function getNextPage() {
        await getByPage(tags, data.stories, data.page);
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
