import Axios from 'axios';

const api = Axios.create({
    baseURL: 'https://shopfashi.herokuapp.com',
    // baseURL: 'https://localhost:5000',
    headers: {
        'content-type': 'application/json',
    },
});

export default api;
