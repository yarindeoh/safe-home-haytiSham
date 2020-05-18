import { useEffect, useState } from 'react';
import Api from 'containers/Story/storyApi';

export const useSimilarStories = (tags) => {
    const [data, setData] = useState();
    useEffect(() => {
        async function fetchData() {
            // setData(await Api.getAllData());
            setData(await Api.getStoriesByTags(tags));
        }
        fetchData();
    }, [tags]);
    return {
        stories: data,
    };
};
