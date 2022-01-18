import './Dispositor.css';
import { useEffect, useState } from 'react'
import authService from '../../services/auth.service';
import UserData from '../UserData';
import Ambulances from './Ambulances';
import Calls from './Calls';

export const Dispositor = () => {
    const [userData, setUserData] = useState();

    useEffect(() => {
        authService.getCurrentUser().then(
            (data) => {
                setUserData(data);
            }
        )
    }, [])

    return (
        <div className='main'>
            <div className="header">
                <h1>Dispositor's Home Page</h1>
                <UserData userData={userData}/>
            </div>
            <ul className='nav nav-tabs' id='myTab' role='tablist'>
                <li className='nav-item' role='presentation'>
                    <button className='nav-link active' id='ambulances-tab' data-bs-toggle='tab' data-bs-target='#ambulances' type='button' role='tab' aria-controls='ambulances' aria-selected='true'>Ambulances</button>
                </li>
                <li className='nav-item' role='presentation'>
                    <button className='nav-link' id='calls-tab' data-bs-toggle='tab' data-bs-target='#calls' type='button' role='tab' aria-controls='calls' aria-selected='false'>Ambulance calls</button>
                </li>
                <li className='nav-item' role='presentation'>
                    <button className='nav-link' id='squads-tab' data-bs-toggle='tab' data-bs-target='#squads' type='button' role='tab' aria-controls='squads' aria-selected='false'>Squads</button>
                </li>
            </ul>
            <div className='tab-content' id='myTabContent'>
                <div className='tab-pane fade show active' id='ambulances' role='tabpanel' aria-labelledby='ambulances-tab'><Ambulances /></div>
                <div className='tab-pane fade' id='calls' role='tabpanel' aria-labelledby='calls-tab'><Calls /></div>
                <div className='tab-pane fade' id='squads' role='tabpanel' aria-labelledby='squads-tab'>Squads</div>
            </div>
        </div>
    );
};

export default Dispositor;
