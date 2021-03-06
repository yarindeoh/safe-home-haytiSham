import Configuration from 'services/api/configutation';
import { get } from 'services/api/restApiUtils';

function baseUrl(path) {
    const restPrefix = Configuration.get('apiPrefix');
    return `${restPrefix}/${path}`;
}

const Api = {
    getStory: () => {
        return get(baseUrl(`story/5f96df576c491f0f3064bfc4`));
        // return get(baseUrl(`story/${id}`));
    }
};

export default Api;
