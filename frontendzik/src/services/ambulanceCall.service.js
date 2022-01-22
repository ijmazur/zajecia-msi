import axios from 'axios';
import authHeader from './auth-header';

const API_AMBULANCECALL_URL = 'http://127.0.0.1:8000/ambulance-calls';

const defaultConfig = {
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    }
};

class AmbulanceCallService {
    getAmbulanceCall(selectedOption) {
        const config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers = {...config.headers, ...authHeader() };
        config.params = { option: selectedOption };
        return axios.get(API_AMBULANCECALL_URL, config).then(
            response => response.data
        );
    }

    addNewAmbulanceCall(ambulanceCall) {
        const config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers = {...config.headers, ...authHeader() };
        return axios.post(API_AMBULANCECALL_URL + '/', ambulanceCall, config).then(
            response => response.data
        );
    }

    updateAmbulanceCall(ambulanceCall) {
        const config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers = {...config.headers, ...authHeader() };
        return axios.put(`${API_AMBULANCECALL_URL}/${ambulanceCall.id}/`, ambulanceCall, config).then(
            response => response.data
        );
    }

    deleteAmbulanceCall(ambulanceCallId) {
        const config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers = {...config.headers, ...authHeader() };
        return axios.delete(`${API_AMBULANCECALL_URL}/${ambulanceCallId}`, config).then(
            response => response.data
        );
    }
}

export default new AmbulanceCallService();