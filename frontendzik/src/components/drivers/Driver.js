import './Driver.css';
import { useEffect, useState } from 'react'
import authService from '../../services/auth.service';
import UserData from '../UserData';
import Calls from '../dispositors/Calls';

export const Driver = () => {
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
                <h1>Driver's Home Page</h1>
                <UserData userData={userData}/>
            </div>
            <ul className='nav nav-tabs' id='myTab' role='tablist'>
                <li className='nav-item' role='presentation'>
                    <button className='nav-link' id='calls-tab' data-bs-toggle='tab' data-bs-target='#calls' type='button' role='tab' aria-controls='calls' aria-selected='false'>Ambulance calls</button>
                </li>
                <li className='nav-item' role='presentation'>
                    <button className='nav-link' id='squads-tab' data-bs-toggle='tab' data-bs-target='#squads' type='button' role='tab' aria-controls='squads' aria-selected='false'>My Squads</button>
                </li>
            </ul>
            <div className='tab-content' id='myTabContent'>
                {/* <div className='tab-pane fade show active' id='driver' role='tabpanel' aria-labelledby='drivers-tab'><Driver /></div> */}
                <div className='tab-pane fade' id='calls' role='tabpanel' aria-labelledby='calls-tab'><Calls /></div>
                <div className='tab-pane fade' id='squads' role='tabpanel' aria-labelledby='squads-tab'>
                    My Squad: <br/> tu sie wypluje Squad Names
                </div>
            </div>
        </div>
    );
};

export default Driver;
