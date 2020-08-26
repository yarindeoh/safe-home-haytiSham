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
    const [data, setData] = useState({
        stories: [],
        hasMore: true,
        page: 1,
        init: false
    });


    const pageSize = 5;

    async function getByPage(){
        let result = await Api.getStoriesByTags(tags || [], pageSize, data.page);
        let newData = {...data}

        if( data.page<result.pages){
            newData.page+=1;
        }
        else if( data.page===result.pages){
            newData.hasMore = false;
        }
        newData.stories = [...newData.stories, ...result?.result]
        newData.init = false;
        setData(newData)
    }



    function initState(){
        let newData = {...data}
        newData.page = 1;
        newData.hasMore = true;
        newData.stories = [];
        newData.init = true;
        setData(newData);
    }

    useEffect(() => {
        initState()
    }, [tags]);

    useEffect(() => {
        if (data.init===true)
        {
            getByPage();
        }
    }, [data.init]);

   

    return {
        stories: data.stories,
        hasMore: data.hasMore,
        getByPage
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
