import React, { useState } from 'react'
import driverService from '../../services/driver.service';

const AddSquadForm = (onSquadAdded, isEditing, onCancel) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [drivers, setDrivers] = useState([]);
    const [allDrivers, setAllDrivers] = useState([]);

    useEffect(() => {
        if (isEditing != null) {
            setId(isEditing.id);
            setName(isEditing.vehicle_name);
            setDrivers(isEditing.drivers);
        }
        driverService.getDriverList()
        .then((driver) => {
            setAllDrivers(driver);
        })
    }, [isEditing]);

    const submitSquad = (event) => {
        event.preventDefault();
        const squad = {
            'id': id,
            'name': event.target[0].value,
        };
        onSquadAdded(squad);
    }; 

    return (
        <div>
            
        </div>
    )
}

export default AddSquadForm
