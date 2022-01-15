import './Login.css';
import authService from '../services/auth.service';
import { useLocation } from 'react-router';

export const Login = () => {
    const { state } = useLocation();
    const { data } = state; // Read values passed on state

    const sumbitLogin = (event) => {
        event.preventDefault();
        const username = event.target[0].value;
        const password = event.target[1].value;

        authService.login(username, password).then(
            (data) => {
                console.log('logged in');
            },
            (error) => {
                console.log('error');
            }
        );
    };

    return (
        <div className='center'>
            <form onSubmit={sumbitLogin}>
                <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Username</label>
                    <input type='text' className='form-control' id='username' placeholder='Enter username'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='exampleInputPassword1'>Password</label>
                    <input type='password' className='form-control' id='password' placeholder='Password'/>
                </div>
                <button type='submit' className='btn btn-primary'>Log in</button>
            </form>
        </div>
    );
};

export default Login;
