const configData = {
    //TODO:: add env var for api url 
    defaultApiPrefix: `${process.env.API_URL}`
};

class Configuration {
    set(key, value) {
        const prev = configData[key];
        configData[key] = value;
        return prev;
    }
    get(key) {
        return configData[key];
    }
}

const configuration = new Configuration();

(function setDefaultRestPrefixes(config) {
    config.set('apiPrefix', config.get('defaultApiPrefix'));
})(configuration);

export default configuration;