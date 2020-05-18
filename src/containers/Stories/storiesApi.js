import Configuration from '../../services/configutation.js';
import { get } from 'services/restApiUtils';

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