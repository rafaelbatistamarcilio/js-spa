export class HttpService {

    getHeaders() {
        const requestParams = {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        return requestParams;
    }

    postHeaders(data) {
        const requestParams = {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        return requestParams;
    }

    putHeaders(data) {
        const requestParams = {
            mode: 'cors',
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        return requestParams;
    }

    deleteHeaders() {
        const requestParams = {
            mode: 'cors',
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        return requestParams;
    }

    async executeRequest(url, headers) {

        const result = await fetch( url, headers)
            .then(responseData => responseData.json())
            .catch(error => { throw Error('Error: ' + JSON.stringify(error)); });
        return result;
    }

    async get(url) {
        const headers = this.getHeaders();
        const response = await this.executeRequest(url, headers);
        return response;
    }

    async post(url, body){
        const headers = this.postHeaders(body)
        const response = await this.executeRequest(url, headers);
        return response;
    }

    async put(url, body){
        const headers = this.putHeaders(body)
        const response = await this.executeRequest(url, headers);
        return response;
    }

    async delete(url){
        const headers = this.deleteHeaders()
        const response = await this.executeRequest(url, headers);
        return response;
    }
}