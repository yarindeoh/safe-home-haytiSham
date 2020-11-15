import { useState, useEffect, useCallback } from 'react';
import { getBreakpoint } from './breakpoints';
import autosize from 'autosize';

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
            return Promise.reject(error);
        }
    }

    return {
        postLogin
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
            element.style.height = element.scrollHeight + 'px';
            autosize(element);
        }

        let textareas = document.getElementsByTagName('textarea');
        for (let i = 0; i < textareas.length; i++) {
            let textarea = textareas[i];
            observe(textarea, 'change', function() {
                autosize(this);
            });
            observe(textarea, 'cut', function() {
                autosize(this);
            });
            observe(textarea, 'paste', function() {
                autosize(this);
            });
            observe(textarea, 'drop', function() {
                autosize(this);
            });
            observe(textarea, 'keydown', function() {
                autosize(this);
            });
            observe(textarea, 'resize', function() {
                autosize(this);
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

// TODO:: consider use reducer to manage state
export const usePagination = (fn, pageSize) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [data, setData] = useState([]);
    const [localOptions, setLocalOptions] = useState({});
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [didFetch, setDidFetch] = useState(false);

    const getNext = useCallback(
        async (
            options = {},
            currData = [],
            pageNumber,
            shouldGetByPage = false
        ) => {
            const res = await fn({
                page: pageNumber,
                pageSize: pageSize,
                ...(options || localOptions)
            });
            if (!res) return;
            setCurrentPage(shouldGetByPage ? pageNumber : pageNumber + 1);
            setData(
                shouldGetByPage ? [...res.result] : [...currData, ...res.result]
            );
            setHasMore(pageNumber < res.pages);
            setTotal(res.total);
            setTotalPages(res.pages);
            Object.keys(options).length>0 && setLocalOptions(options);
            setDidFetch(true);
        },
        [data, currentPage, hasMore]
    );

    const replaceRelatedOptions = async (options, shouldGetByPage = false) => {
        await getNext(options, [], 1, shouldGetByPage);
    };
    async function getNextPage() {
        if(currentPage===1) return; //mean we still don't finish replaceRelatedOptions.
        await getNext(localOptions, data, currentPage);
    }

    async function getByPage(page) {
        await getNext(localOptions, data, page, true);
    }
    return {
        hasMore: hasMore,
        page: currentPage,
        currLength: data?.length,
        data: data,
        total,
        totalPages,
        didFetch,
        getNextPage,
        replaceRelatedOptions,
        getByPage
    };
};
