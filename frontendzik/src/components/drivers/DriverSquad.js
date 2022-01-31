import React, { useState, useEffect } from 'react'
import squadService from '../../services/squad.service';
import driverService from '../../services/driver.service';
import SquadInfo from './SquadInfo';

const DriverSquad = () => {
    const [squadList, setSquadList] = useState([]);
    const loadSquads = () => {
        driverService.getDriverList()
        .then((drivers) => {
            squadService.getMySquads()
            .then((data) => {
                    data.forEach((squad) => {
                        squad.drivers = squad.drivers.map((driverId) => drivers.find((d) => d.id === driverId))                        
                    })
                    setSquadList(data);
                }
            );
        })
    }
    useEffect(() => {
        loadSquads();
    }, []);


    return (
        <div>
            { squadList.length !== 0 ? 
                <div className="list">
                    {squadList.map((squad) => (
                        <SquadInfo key={squad.id} squad={squad}/>
                    ))}
                </div>
                : 'No squads to display'
            }
        </div>
    );
};

export default DriverSquad
