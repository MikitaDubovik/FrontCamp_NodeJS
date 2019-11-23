const fetch = require("node-fetch");

class HttpService {
    
    constructor() {
        this.apiKey = '&apiKey=980e9d4359984b1bb923d5e1043ce9e2';
        this.baseUrl = 'https://newsapi.org/';
        this.bodyKey = 'body';
    }

    async doRequest(arg, options) {
        if (options && options.hasOwnProperty(this.bodyKey)) {
            options[this.bodyKey] = JSON.stringify(options[this.bodyKey]);
        }
        const response = await fetch(`${this.baseUrl}${arg}${this.apiKey}`, options);
        if (response.ok) {
            const responseData = await response.json();

            return responseData;
        }

        return null;
    }
}

exports.HttpService = HttpService;