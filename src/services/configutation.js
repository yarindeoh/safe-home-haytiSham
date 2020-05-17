const configData = {
    defaultApiPrefix: 'http://0.0.0.0:8080/'
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