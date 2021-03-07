import Api from 'containers/Story/storyApi';
import React, { useState, useEffect } from 'react';

export const useStory = id => {
    const [story, setStory] = useState({});

    useEffect(() => {
        const asyncFetch = async () => {
            const response = await Api.getStory(id);
            setStory(response);
        };
        asyncFetch();
    }, [id]);

    return story;
};
