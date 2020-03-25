export const BASE_URL = "http://localhost:8080/";

let obj = {
    get(url) {
        const METHOD = 'get';
        return doHttpCall(url, METHOD);
    },
    post(url, body) {
        const METHOD = 'post';
        return doHttpCall(url, METHOD, body);
    },
    put(url, body) {
        const METHOD = 'put';
        return doHttpCall(url, METHOD, body);
    },
    delete(url, body) {
        const METHOD = 'delete';
        return doHttpCall(url, METHOD, body);
    }
};

async function doHttpCall(url, method, body) {

    const NEW_URL = BASE_URL + url;
    const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    const promise = new Promise((resolve, reject) => {
        let options = {
            method: method,
            headers: header
        };
        if (method === 'post' || method === 'put') {
            options.body = JSON.stringify(body)
        }
        fetch(NEW_URL, options)
            .then((response) => {
                resolve(response)
            }).catch((message) => {
            reject(message);
        });
    });
    return promise;
}

export default obj;