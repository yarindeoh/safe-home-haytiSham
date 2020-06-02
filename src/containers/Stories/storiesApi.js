import Configuration from 'services/api/configutation';
import { get } from 'services/api/restApiUtils';

function baseUrl(path) {
    const restPrefix = Configuration.get('apiPrefix');
    return `${restPrefix}/${path}`;
}

const Api = {
    getAllData: () => {
        return get(baseUrl('getAllData'));
    },
    getAllTags: () => {
        return get(baseUrl('getAllTags'));
    },
    getTagsFromKeys: () => {
        //TODO - integrate with server. - this is an example
        //code for parsing tags numbers into strings:
        const array = [11, 8, 15, 9, 10, 27, 5, 21];
        let tagsMap = baseUrl('getTagsMap');
        let result = array.map((value, index) => map[value]);
        return result;
    },
    getStoriesByTags: ({ tags }) => {
        return get(baseUrl(`getStoriesByTags?${tags}`));
    },
    getPublicStories: () => {
        return get(baseUrl('getPublicStories'));
    },
};

export default Api;
