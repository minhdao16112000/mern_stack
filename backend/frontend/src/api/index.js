import Axios from "axios";

const api = Axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'content-type': 'application/json'
    }
});

export default api;
