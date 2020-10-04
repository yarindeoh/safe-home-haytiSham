import Api from 'containers/Stories/storiesApi';
import { useEffect, useState, useCallback } from 'react';

import { getSlicedTagsObj } from 'services/general/generalHelpers';
import { useFetchApiData } from 'services/general/generalHooks';

export const useTags = defaultSelectedTags => {
    const { localState: tags } = useFetchApiData(Api.getTagsMap, []);
    const { tagsData, changeTagSelected, unselectAllTags } = useSelectedTags(
        tags,
        defaultSelectedTags
    );
    const {
        isDisplayMoreTags,
        changeDisplayMoreTags,
        getDisplayedTags
    } = useShowMoreTags(tags);

    return {
        tagsMap: tags,
        tagsData: getDisplayedTags(tagsData),
        changeTagSelected,
        isDisplayMoreTags,
        changeDisplayMoreTags,
        unselectAllTags
    };
};

//TODO
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
        page: 1
    });

    const pageSize = 5;

    async function getByPage(apiCall, payload) {
        let result = await apiCall(payload);
        let newData = { ...data };

        if (data.page < result.pages) {
            newData.page += 1;
        } else if (data.page === result.pages) {
            newData.hasMore = false;
        }
        newData.stories = [...newData.stories, ...result?.result];
        setData(newData);
    }

    function initState() {
        let newData = { ...data };
        newData.page = 1;
        newData.hasMore = true;
        newData.stories = [];
        setData(newData);
    }

    useEffect(() => {
        initState();
    }, [tags]);

    useEffect(() => {
        getByPage(Api.getStoriesByTags, {
            tags,
            pageSize,
            page: data.page
        });
        setData(oldData => ({ ...oldData }));
    }, []);

    return {
        stories: data.stories,
        hasMore: data.hasMore,
        getNextPage: useCallback(() => {
            getByPage(
                Api.getStoriesByTags,
                {
                    tags,
                    pageSize,
                    page: data.page
                },
                []
            );
        })
    };
};
//
// export const usePagedStories = (apiCall, payload) => {
//     const [state, setState] = useState({
//         stories: [],
//         hasMore: true,
//         page: 1
//     });
//
//     const pageSize = 5;
//
//     async function getByPage(apiCall, payload) {
//         let result = await apiCall(payload);
//         let newData = { ...data };
//
//         if (state.page < result.pages) {
//             newData.page += 1;
//         } else if (data.page === result.pages) {
//             newData.hasMore = false;
//         }
//         newData.stories = [...newData.stories, ...result?.result];
//         setState(newData);
//     }
//
//     function initState() {
//         let newData = { ...data };
//         newData.page = 1;
//         newData.hasMore = true;
//         newData.stories = [];
//         setState(newData);
//     }
//
//     useEffect(() => {
//         getByPage(apiCall, payload);
//         setState(oldData => ({ ...oldData }));
//     });
//
//     return {
//         stories: data.stories,
//         hasMore: data.hasMore
//     };
// };
