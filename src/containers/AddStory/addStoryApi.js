import Configuration from 'services/api/configutation';
import { post } from 'services/api/restApiUtils';

function baseUrl(path) {
    const restPrefix = Configuration.get('apiPrefix');
    return `${restPrefix}/${path}`;
}

const Api = {
    postAddStory: (data) => {
        return post(baseUrl('addStory'), data, {no_result:true});
    }
};

export default Api;