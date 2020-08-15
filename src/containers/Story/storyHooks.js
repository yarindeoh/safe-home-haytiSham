import { useEffect, useState } from 'react';
import Api from 'containers/Stories/storiesApi';

export const useSimilarStories = tags => {
    const [data, setData] = useState();
    useEffect(() => {
        (async function fetchData() {
            setData(await Api.getStoriesByTags(tags || []));
        })();
    }, [tags]);
    return {
        stories: data && data.result
    };
};
