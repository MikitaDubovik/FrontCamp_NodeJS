const HttpService = require('./http-service').HttpService;

class HttpServiceFactory {
    constructor() {
        this.httpService = new HttpService();
    }

    async doRequest(url, type, options) {
        let response;
        switch (type) {
            case "GET":
                response = await this.get(url, options);
                break;
            case "POST":
                response = await this.post(url, options);
                break;
            case "PUT":
                response = await this.put(url, options)
                break;
            default:
                throw new Error(`Can't interact with method ${type}`);
        }

        return response
    }

    async get(url, options) {
        return await this.httpService.doRequest(url, options);
    }

    async post(url, options) {
        options.method = 'POST';
        return await this.httpService.doRequest(url, options);
    }

    async put(url, options) {
        options.method = 'PUT';
        return await this.httpService.doRequest(url, options);
    }
}

exports.HttpServiceFactory = HttpServiceFactory;