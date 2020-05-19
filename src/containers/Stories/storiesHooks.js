import Api from 'containers/Stories/storiesApi';
import { useEffect, useState } from 'react';

export const useData = () => {
    const [data, setData] = useState();
    useEffect(() => {
        async function fetchData() {
            // setData(await Api.getAllData());
            setData(await Api.getTestMock());
        }
        fetchData();
    }, []);
    return {
        data,
    };
};

export const useAllTags = () => {
    const [tags, setTags] = useState();
    useEffect(() => {
        async function fetchData() {
            setTags(await Api.getAllTags());
        }
        fetchData();
    }, []);
    return tags;
};

export const useFilteredStories = (tags) => {
    const [data, setData] = useState();
    useEffect(() => {
        async function fetchData() {
            if (!tags.length) {
                setData(await Api.getTestMock());
            } else {
                setData(await Api.getStoriesByTags(tags || []));
            }
        }
        fetchData();
    }, [tags]);
    return {
        stories: data,
    };
};

export const usePublicStories = () => {
    const [data, setData] = useState();
    useEffect(() => {
        async function fetchData() {
            setData(await Api.getPublicStories());
        }
        fetchData();
    }, []);
    return {
        publicStories: data,
    };
};
