import Configuration from 'services/api/configutation';
import { get } from 'services/api/restApiUtils';

function baseUrl(path) {
    const restPrefix = Configuration.get('apiPrefix');
    return `${restPrefix}/${path}`;
}

const Api = {
    getStoriesByTags: ({ tags }) => {
        return get(baseUrl(`getStoriesByTags?${tags}`));
    },
};

export default Api;
