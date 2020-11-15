import Configuration from 'services/api/configutation';
import { get, post } from 'services/api/restApiUtils';

function baseUrl(path) {
    const restPrefix = Configuration.get('apiPrefix');
    return `${restPrefix}/${path}`;
}

const Api = {
    postLogin: data => {
        return post(baseUrl('login'), data);
    },
    postAddModerateStory: data => {
        return post(baseUrl('addModerateStory'), data, { no_result: true });
    },
    postPublishModerateStory: data => {
        return post(baseUrl('publishModerateStory'), data, { no_result: true });
    },
    getModerationStories: ({ pageSize, page, sortField, sortDirection }) => {
        return get(
            baseUrl(
                `getStortiesForModeration?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortDirection=${sortDirection}`
            )
        );
    },
    getStoryForEdit: id => {
        return get(baseUrl(`getStoryForEdit?originalStory=${id}`));
    },
    getAllModeratedStories: ({ tags, pageSize, page, sortField }) => {
        return get(
            baseUrl(
                `getAllModeratedStories?page=${page}&pageSize=${pageSize}&sortField=${sortField}${
                    tags && tags.length > 0 ? `&tags=[${tags}]` : ''
                }`
            )
        );
    }
};

export default Api;
