import Api from 'containers/Stories/storiesApi';
import { useEffect, useState, useCallback, useRef } from 'react';

import { getSlicedTagsObj } from 'services/general/generalHelpers';

export const useTags = (defaultSelectedTags) => {
    const [tags, setTags] = useState();
    const { tagsData, changeTagSelected, selectAllTags } = useSelectedTags(
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
        selectAllTags
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
        changeTagSelected: useCallback(
            tag =>
                setTagsData(prevTagsData => {
                    return {
                        ...prevTagsData,
                        [tag]: {
                            ...prevTagsData[tag],
                            selected: !(prevTagsData[tag].selected)
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

export const useAllStories = () => {
    const [stories, setStories] = useState();
    let tags = useAllTags();
    let tags_ids = tags && Object.keys(tags);
    useEffect(() => {
            (async () => {
                await setStories(await Api.getStoriesByTags(tags_ids || []));
            })();
    }, [tags]);
    return {
        allStories: stories?.result
    };
};
