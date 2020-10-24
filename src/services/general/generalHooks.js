import { useState, useEffect } from 'react';
import { getBreakpoint } from './breakpoints';

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

// function usePagination(pages, pageNumber) {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [hasMore, setHasMore] = useState(true);
//     useEffect(() => {
//         if (pageNumber < pages) {
//             setCurrentPage(currentPage + 1);
//             setHasMore(true);
//         } else if (pageNumber === pages) {
//             setCurrentPage(pageNumber);
//             setHasMore(false);
//         }
//     }, [pageNumber, pages]);
//
//     return {
//         pageNumber,
//         pages,
//         hasMore
//     };
// }
