import Api from 'containers/Stories/storiesApi';
import { useEffect, useState, useCallback, useRef } from 'react';

import { getSlicedTagsObj } from 'services/general/generalHelpers';

export const useTags = () => {
    const [tags, setTags] = useState();
    const { tagsData, changeTagSelected } = useSelectedTags(tags);
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
        getDisplayedTags
    };
};

export const useSelectedTags = tags => {
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
            []
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
