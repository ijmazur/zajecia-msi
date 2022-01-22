import axios from 'axios';
import authHeader from './auth-header';

const API_DRIVER_URL = 'http://127.0.0.1:8000/drivers';

const defaultConfig = {
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    }
};

class DriverService {
    getDriverList() {
        const config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers = {...config.headers, ...authHeader() };
        return axios.get(API_DRIVER_URL, config).then(
            response => response.data
        );
    }
}

export default new DriverService();