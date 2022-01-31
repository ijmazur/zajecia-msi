import './../dispositors/Ambulance.css'
import { useState, useEffect } from 'react';
import ambulanceCallService from '../../services/ambulanceCall.service';
import DriverCall from './DriverCall';

export const DriverCalls = () => {

    const options = [
        { id: 'my-calls', name: 'My calls' },
        { id: 'all', name: 'All calls' },
        { id: 'busy', name: 'Call currently being handled' },
    ];
    const onOptionChange = (option) => {
        setSelectedStatus(option);
    };
    const [selectedStatus, setSelectedStatus] = useState(options[0]);

    const [driverCallList, setDriverCallList] = useState([]);
    const loadDriverCall = (option) => {
        ambulanceCallService.getAmbulanceCall(option).then(
            (data) => {
                data.sort((ac1, ac2) => ac2.priority - ac1.priority);
                setDriverCallList(data);
            }
        );
    };
    useEffect(() => {
        loadDriverCall(selectedStatus.id);
    }, [selectedStatus]);


    return (
        <div>
            <div className='header padding-8px'>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {selectedStatus.name}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {options.map((option) => (
                            <li key={option.id}>
                                <div className='dropdown-item' onClick={() => onOptionChange(option)}>
                                    {option.name}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {driverCallList.length !== 0 ?
                <div className="list">
                    {driverCallList.map((driverCall) => (
                        <DriverCall key={driverCall.id} driverCall={driverCall} />
                    ))}
                </div>
                : 'No ambulances to display'
            }
        </div>
    );
};

export default DriverCalls;
