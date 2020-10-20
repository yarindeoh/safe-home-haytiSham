import { useState, useCallback, useEffect } from 'react';
import { getBreakpoint } from './breakpoints';

export function useSwitch() {
    const [isEnable, setIsEnable] = useState(true);
    const changeSwitch = useCallback(
        () => setIsEnable(prevEnableTags => !prevEnableTags),
        []
    );

    return { isEnable, changeSwitch };
}

export const useBack = (props, setSubmitted, path = '/') => {
    const back = e => {
        e.preventDefault();
        setSubmitted(false);
        props.history.push(path);
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

export function useResize() {
    const [breakpoint, setBreakpoint] = useState(getBreakpoint());
    useEffect(() => {
        function handleResize() {
            setBreakpoint(getBreakpoint());
        }
        window.addEventListener('resize', handleResize);
        return _ => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return breakpoint;
}
