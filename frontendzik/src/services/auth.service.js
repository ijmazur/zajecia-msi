import axios from "axios";
// import API_URL from './../App.js'

const API_AUTH_URL = 'http://127.0.0.1:8000/' + 'api/token/';

class AuthService {
    login(username, password) {
        return axios
            .post(API_AUTH_URL, {
                username,
                password
            })
            .then(response => {
                console.log(response);
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();