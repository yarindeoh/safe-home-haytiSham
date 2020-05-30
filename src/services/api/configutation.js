const configData = {
    // defaultApiPrefix: 'http://localhost:9000/mock'
    defaultApiPrefix: 'http://localhost:5000'
    // defaultApiPrefix: '/'
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