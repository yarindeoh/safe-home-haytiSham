import Configuration from 'services/api/configutation';
import { get } from 'services/api/restApiUtils';

function baseUrl(path) {
    const restPrefix = Configuration.get('apiPrefix');
    return `${restPrefix}/${path}`;
}

const Api = {
    getAllTags: () => {
        return get(baseUrl('getAllTags'));
    },
    getStoriesByTags: tags => {
        return get(baseUrl(`getStoriesByTags?tags=[${tags}]`));
    },
    getTagsMap: () => {
        return get(baseUrl('getTagsMap'));
    }
};

export default Api;
