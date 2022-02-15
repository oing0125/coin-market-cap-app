class HttpClient {

    constructor() {
        this.API_SERVER_ENDPOINT = "http://localhost:8090";
    }

    doGet(path, parameters, callback){

        let url = new URL(this.API_SERVER_ENDPOINT + path);
        url.search = new URLSearchParams(parameters).toString();
        fetch(url)
            .then(response => response.json())
            .then(data => {
                callback(data);
            }).catch(error => {
                console.log(error);
                callback([]);
            });
    }

    doPost(path, param, callback){
        fetch(this.API_SERVER_ENDPOINT + path, {
			method: 'POST',
			body: param
		})
            .then(response => response.json())
            .then(data => {
                callback(data);
            }).catch(error => {
                console.log(error);
                callback([]);
            })
    }
  }

  export default HttpClient;