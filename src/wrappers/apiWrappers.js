
import axios from 'axios';


axios.interceptors.response.use(function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401){
            localStorage.removeItem('persist:root');
            window.location.reload();
        }
        return Promise.reject(error);
    });

export const sendRequest = async (url, method, token, data=null) => {
    let response = await axios({
        method: method,
        url: url,
        baseURL: 'http://localhost:8000/api/',
        data: data,
        headers: token?{'Authorization': `Bearer ${token}`}:null,
    });
    return response.data;
}
