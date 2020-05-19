import Configuration from 'services/api/configutation';
import { get } from 'services/api/restApiUtils';

function baseUrl(path) {
    const restPrefix = Configuration.get('apiPrefix');
    return `${restPrefix}/${path}`;
}

const Api = {
    // getAllData: () => {
    //     return get(baseUrl('getAllData'));
    // },
    getTestMock: () => {
        return get(baseUrl('getAllData'));
    },
    getAllTags: () => {
        return get(baseUrl('getAllTags'));
    },
    getStoriesByTags: ({ tags }) => {
        return get(baseUrl(`getStoriesByTags?${tags}`));
    },
    getPublicStories: () => {
        return get(baseUrl('getPublicStories'));
    },
};

export default Api;
