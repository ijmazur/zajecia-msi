import React from 'react';
import { useState, useEffect } from 'react';

const AddAmbulanceForm = ({onAmbulanceAdded, isEditing, onCancel}) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        if (isEditing != null) {
            setId(isEditing.id);
            setName(isEditing.vehicle_name);
            setRegistrationNumber(isEditing.registration_number);
            setStreet(isEditing.street);
            setNumber(isEditing.number);
            setCity(isEditing.city);
        }
    }, [isEditing]);

    const submitAmbulance = (event) => {
        event.preventDefault();
        const ambulance = {
            'id': id,
            'vehicle_name': event.target[0].value,
            'registration_number': event.target[1].value,
            'street': event.target[2].value,
            'number': event.target[3].value,
            'city': event.target[4].value,
        };
        onAmbulanceAdded(ambulance);
    }; 

    return (
        <div>
            <form onSubmit={submitAmbulance}>
                <div className='form-group'>
                    <label htmlFor='vehicle-name'>Vehicle name</label>
                    <input type='text' className='form-control' id='vehicle-name' placeholder='Enter vehicle make and model' value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='registration-number'>Registration number</label>
                    <input type='text' className='form-control' id='registration-number' placeholder='Enter registration number' value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} required/>
                </div>
                <div>
                    <p>Vehicle location</p>
                    <div className="adress-container" style={{
                        display: 'grid',
                        gridTemplateColumns: '3fr 1fr',
                        columnGap: '8px'
                    }}>
                        <div className='form-group'>
                            <label htmlFor='location-street'>Street</label>
                            <input type='text' className='form-control' id='location-street' placeholder='Enter street' value={street} onChange={(e) => setStreet(e.target.value)}required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='location-number'>Street number</label>
                            <input type='number' className='form-control' id='location-number' placeholder='Enter street number' value={number} onChange={(e) => setNumber(e.target.value)}required/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='location-city'>City</label>
                        <input type='text' className='form-control' id='location-city' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} required/>
                    </div>
                </div>
                    {isEditing ?
                        <div style={{display: 'flex', width: '100%', columnGap: '8px'}}>
                            <button type='submit' style={{width: '100%'}} className='btn btn-primary'>Save</button>
                            <button type='button' style={{width: '100%'}} className='btn btn-primary' onClick={onCancel}>Cancel</button>
                        </div>
                        : <button type='submit' style={{width: '100%'}} className='btn btn-primary'>Add</button>
                    }
            </form>
        </div>
    );
};

export default AddAmbulanceForm
