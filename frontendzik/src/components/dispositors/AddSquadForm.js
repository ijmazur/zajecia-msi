import React, { useState, useEffect } from 'react'
import driverService from '../../services/driver.service';

const AddSquadForm = ({ onSquadAdded, isEditing, onCancel }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [drivers, setDrivers] = useState([]);
    const [allDrivers, setAllDrivers] = useState([]);

    useEffect(() => {
        if (isEditing != null) {
            setId(isEditing.id);
            setName(isEditing.name);
            setDrivers(isEditing.drivers);
        }
        driverService.getDriverList()
            .then((drivers) => {
                setAllDrivers(drivers);
            })
    }, [isEditing]);



    const submitSquad = (event) => {
        event.preventDefault();
        const squad = {
            'id': id,
            'name': event.target[0].value,
            'drivers': drivers.map((d) => d.id),
        };
        console.log('squad', squad);
        console.log('drivers', drivers);
        onSquadAdded(squad);
    };


    const addDriver = (driver, event) => {
        event.stopPropagation();
        if (drivers.some((d) => d.id === driver.id)) {
            setDrivers(drivers.filter((d) => d.id != driver.id));
        } else {
            const asd = drivers.concat(driver);
            setDrivers(asd);
        }
    }

    return (
        <div>
            <form onSubmit={submitSquad}>
                <div className='form-group'>
                    <label htmlFor='Squad-name'>Squad Name</label>
                    <input type='text' className='form-control' id='squad-name' placeholder='Enter squad name' value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <div className="dropdown"  >
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" style={{ width: '100%' }} data-bs-toggle="dropdown" aria-expanded="false">
                            Select Drivers: {drivers ? drivers.length : ''}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ width: '100%' }}>
                            {allDrivers.map((driver) => (
                                <li key={driver.id}>
                                    <div className='dropdown-item' style={{ backgroundColor: drivers.some((d) => d.id === driver.id) ? 'grey' : null }} onClick={(event) => addDriver(driver, event)}>
                                        {driver.first_name}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {isEditing ?
                    <div style={{ display: 'flex', width: '100%', columnGap: '8px' }}>
                        <button type='submit' style={{ width: '100%' }} className='btn btn-primary'>Save</button>
                        <button type='button' style={{ width: '100%' }} className='btn btn-primary' onClick={onCancel}>Cancel</button>
                    </div>
                    : <button type='submit' style={{ width: '100%' }} className='btn btn-primary'>Add</button>
                }
            </form>
        </div>
    )
}

export default AddSquadForm
