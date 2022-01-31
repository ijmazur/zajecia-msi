import axios from 'axios';
import authHeader from './auth-header';

const API_SQUAD_URL = 'http://127.0.0.1:8000/squads';

const defaultConfig = {
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    }
};

class SquadService {
    getSquadList() {
        const config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers = {...config.headers, ...authHeader() };
        return axios.get(API_SQUAD_URL, config).then(
            response => response.data
        );
    }

    addNewSquad(squad) {
        const config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers = {...config.headers, ...authHeader() };
        return axios.post(API_SQUAD_URL + '/', squad, config).then(
            response => response.data
        );
    }

    updateSquad(squad) {
        const config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers = {...config.headers, ...authHeader() };
        return axios.put(`${API_SQUAD_URL}/${squad.id}/`, squad, config).then(
            response => response.data
        );
    }

    deleteSquad(squad) {
        const config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers = {...config.headers, ...authHeader() };
        return axios.delete(`${API_SQUAD_URL}/${squad}`, config).then(
            response => response.data
        );
    }

    getMySquads(){
        const config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers = {...config.headers, ...authHeader() };
        return axios.get(API_SQUAD_URL + '/my-squads', config).then(
            response => response.data
        );
    }
}

export default new SquadService();