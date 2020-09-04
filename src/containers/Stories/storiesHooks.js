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

    async function getByPage() {
        let result = await Api.getStoriesByTags(tags, pageSize, data.page);
        let newData = { ...data };

        if (data.page < result.pages) {
            newData.page += 1;
        } else if (data.page === result.pages) {
            newData.hasMore = false;
        }
        newData.stories = [...newData.stories, ...result?.result];
        newData.init = false;
        setData(newData);
    }

    function initState() {
        let newData = { ...data };
        newData.page = 1;
        newData.hasMore = true;
        newData.stories = [];
        newData.init = true;
        setData(newData);
    }

    useEffect(() => {
        initState();
    }, [tags]);

    useEffect(() => {
        if (data.init === true) {
            getByPage();
            setData(oldData => ({ ...oldData, init: false }));
        }
    }, [data.init]);

    return {
        stories: data.stories,
        hasMore: data.hasMore,
        getByPage
    };
};

export const useAllStories = () => {
    const [stories, setStories] = useState();
    let { tagsMap } = useTags();
    let tags_ids = tagsMap && Object.keys(tagsMap);

    async function getAllStories() {
        let page = 1;
        let pageSize = 5;
        let tmp_stories = [];
        let data = await Api.getStoriesByTags(tags_ids, pageSize, page);
        tmp_stories = [...tmp_stories, ...data.result];
        page += 1;
        for (page; page <= data.pages; page += 1) {
            data = await Api.getStoriesByTags(tags_ids || [], pageSize, page);
            tmp_stories = [...tmp_stories, ...data.result];
        }
        setStories(tmp_stories);
    }

    useEffect(() => {
        getAllStories();
    }, [tagsMap]);

    return {
        allStories: stories
    };
};
