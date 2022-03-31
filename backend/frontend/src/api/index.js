import Axios from 'axios';

const api = Axios.create({
    baseURL: 'https://shopfashi.herokuapp.com',
    headers: {
        'content-type': 'application/json',
    },
});

export default api;
