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
        data
    };
};
