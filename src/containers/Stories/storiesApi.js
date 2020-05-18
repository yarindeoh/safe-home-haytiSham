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
    getTestMock: () => {
        return get(baseUrl('getAllData'))
    }
};

export default Api;