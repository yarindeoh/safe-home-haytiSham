import Api from 'containers/Stories/storiesApi';
import { useEffect, useState, useCallback } from 'react';
import { useFetchApiData, usePagination } from 'services/general/generalHooks';
import { PAGE_SIZE } from './storiesConstants';

export const useTags = defaultSelectedTags => {
    const { localState: tags } = useFetchApiData(Api.getTagsMap, []);
    const [isDisplayMoreTags, setIsDisplayMoreTags] = useState(false);
    const { tagsData, changeTagSelected, unselectAllTags } = useSelectedTags(
        tags,
        defaultSelectedTags
    );

    return {
        tagsMap: tags,
        changeTagSelected,
        isDisplayMoreTags,
        unselectAllTags,
        changeDisplayMoreTags: useCallback(() => {
            setIsDisplayMoreTags(showMoreTags => !showMoreTags);
        }, []),
        tagsData
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

export const useStories = tags => {
    const { getNextPage, hasMore, data, replaceRelatedOptions } = usePagination(
        Api.getStoriesByTags,
        PAGE_SIZE
    );

    useEffect(() => {
        (async function fetchData() {
            replaceRelatedOptions({ tags: tags, sortField: 'createdAt' });
        })();
    }, [tags]);

    return {
        stories: data,
        hasMore: hasMore,
        getNextPage
    };
};
