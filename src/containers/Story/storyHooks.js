import Api from 'containers/Story/storyApi';
import { useFetchApiData } from 'services/general/generalHooks';

export const useStory = () => {
    const { localState: story } = useFetchApiData(Api.getStory, []);

    return story;
};
