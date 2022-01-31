import './../dispositors/Ambulance.css'
import { useState, useEffect } from 'react';
import ambulanceCallService from '../../services/ambulanceCall.service';
import DriverCall from './DriverCall';
import squadService from '../../services/squad.service';
import ambulanceService from '../../services/ambulance.service';

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
        squadService.getSquadList()
        .then((squads) => {
            ambulanceService.getAmbulances('all')
            .then((ambulances) => {
                ambulanceCallService.getAmbulanceCall(option)
                .then((data) => {
                        data.sort((ac1, ac2) => ac2.priority - ac1.priority);
                        data.forEach((ambulanceCall) => {
                            ambulanceCall.assigned_squad = squads.find((s) => s.id === ambulanceCall.assigned_squad);
                            ambulanceCall.assigned_ambulance = ambulances.find((a) => a.id === ambulanceCall.assigned_ambulance);
                        })
                        setDriverCallList(data);
                    }
                );
            })
        })
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
