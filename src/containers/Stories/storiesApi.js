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
    getStoriesByTags: ({ tags, pageSize, page, sortField }) => {
        return get(
            baseUrl(
                `getStoriesByTags?page=${page}&pageSize=${pageSize}&sortField=${sortField}${
                    tags && tags.length > 0 ? `&tags=[${tags}]` : ''
                }`
            )
        );
    },
    getTagsMap: () => {
        return get(baseUrl('getTagsMap'));
    }
};

export default Api;
