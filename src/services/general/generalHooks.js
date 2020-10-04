import { useState, useCallback, useEffect } from 'react';

export function useSwitch() {
    const [isEnable, setIsEnable] = useState(true);
    const changeSwitch = useCallback(
        () => setIsEnable(prevEnableTags => !prevEnableTags),
        []
    );

    return { isEnable, changeSwitch };
}

export const useBack = (props, setSubmitted) => {
    const back = e => {
        e.preventDefault();
        setSubmitted(false);
        props.history.push('/');
    };

    return {
        back
    };
};

export const useFetchApiData = (apiCall, state) => {
    const [localState, setLocalState] = useState(state);
    useEffect(() => {
        (async function fetchData() {
            setLocalState(await apiCall(localState || []));
        })();
    }, []);
    return {
        localState
    };
};

const useFetch = (url, options = {}) => {
    const [response, setResponse] = useState(null);
    useEffect(async () => {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
    });
    return response;
};
