import axios from 'axios';
import authHeader from './auth-header';

const API_AMBULANCE_URL = 'http://127.0.0.1:8000/ambulances';

const defaultConfig = {
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    }
};

class AmbulanceService {
    getAmbulances(selectedOption) {
        const config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers = {...config.headers, ...authHeader() };
        config.params = { option: selectedOption };
        return axios.get(API_AMBULANCE_URL, config).then(
            response => response.data
        );
    }

    addNewAmbulance(ambulance) {
        const config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers = {...config.headers, ...authHeader() };
        return axios.post(API_AMBULANCE_URL + '/', ambulance, config).then(
            response => response.data
        );
    }
}

export default new AmbulanceService();