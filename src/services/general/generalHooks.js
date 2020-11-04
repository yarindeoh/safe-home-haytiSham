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

export const useLoginFiledChange = () => {
    const [loginData, setLoginData] = useState({ userName: '', password: '' });
    const handleFieldChange = (e, filed) => {
        let newLoginData = { ...loginData };
        newLoginData[filed] = e.target.value;
        setLoginData(newLoginData);
    };

    return {
        loginData,
        handleFieldChange
    };
};

export const useLoginSubmit = (loginData, postFunction, itemInLocalStorage) => {
    async function postLogin() {
        try {
            const serverData = await postFunction(loginData);
            localStorage.setItem(itemInLocalStorage, serverData.token);
            return Promise.resolve();
        } catch (error) {
            if (error.message === '403') {
                window.alert('UserName or Password is not Valid');
            }
            return Promise.reject(error);
        }
    }

    return {
        postLogin
    };
};

//Generic Remove Token on 401 from localStorage
export const useRemoveTokenOnError = itemInLocalStorage => {
    async function removeTokenOnError(e) {
        if (e.message === '401') {
            try {
                localStorage.removeItem(itemInLocalStorage);
                return Promise.resolve();
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }
    return {
        removeTokenOnError
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

export function useDialog() {
    const [open, setOpen] = useState(false);
    const [dialogParams, setDialogParams] = useState({});

    const showDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    return {
        open,
        showDialog,
        closeDialog,
        dialogParams,
        setDialogParams
    };
}

export const useResetDialogParams = (
    trigger,
    showDialog,
    setDialogParams,
    dialogParams
) => {
    useEffect(() => {
        if (trigger) {
            setDialogParams(dialogParams);
            showDialog();
        }
    }, [trigger]);

    return {};
};

export const useResizeTextArea = () => {
    let observe;
    if (window.attachEvent) {
        observe = function(element, event, handler) {
            element.attachEvent('on' + event, handler);
        };
    } else {
        observe = function(element, event, handler) {
            element.addEventListener(event, handler, false);
        };
    }
    function init() {
        function resize(element) {
            element.style.height = 'auto';
            element.style.height = element.scrollHeight + 'px';
        }
        /* 0-timeout to get the already changed text */
        function delayedResize(element) {
            window.setTimeout(function() {
                resize(element);
            }, 0);
        }
        let textareas = document.getElementsByTagName('textarea');
        for (let i = 0; i < textareas.length; i++) {
            let textarea = textareas[i];
            observe(textarea, 'change', function() {
                resize(this);
            });
            observe(textarea, 'cut', function() {
                delayedResize(this);
            });
            observe(textarea, 'paste', function() {
                delayedResize(this);
            });
            observe(textarea, 'drop', function() {
                delayedResize(this);
            });
            observe(textarea, 'keydown', function() {
                delayedResize(this);
            });
            observe(textarea, 'resize', function() {
                delayedResize(this);
            });
            resize(textarea);
        }
    }

    useEffect(() => {
        init();
    });

    useEffect(() => {
        const updateTextAreaDimensions = () => {
            init();
        };

        window.addEventListener('resize', updateTextAreaDimensions);

        return () =>
            window.removeEventListener('resize', updateTextAreaDimensions);
    }, []);

    return {};
};

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
