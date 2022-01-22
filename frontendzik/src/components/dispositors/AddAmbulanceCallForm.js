import React from 'react';
import { useState, useEffect } from 'react';
import ambulanceService from '../../services/ambulance.service';
import squadService from '../../services/squad.service';


const AddAmbulanceCallForm = ({ onAmbulanceCallAdded, isEditing, onCancel }) => {
    const [id, setId] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [ambulanceList, setAmbulanceList] = useState([]);
    const [selectedAmbulance, setSelectedAmbulance] = useState();
    const [squadList, setSquadList] = useState([]);
    const [selectedSquad, setSelectedSquad] = useState();


    useEffect(() => {
        if (isEditing != null) {
            setId(isEditing.id);
            setDescription(isEditing.description);
            setPriority(isEditing.priority);
            setStreet(isEditing.street);
            setNumber(isEditing.number);
            setCity(isEditing.city);
            setSelectedAmbulance(isEditing.assigned_ambulance);
            setSelectedSquad(isEditing.assigned_squad);
        }
        ambulanceService.getAmbulances('free')
        .then((ambulances) => {
            setAmbulanceList(ambulances);
        });
        squadService.getSquadList()
        .then((squad) => {
            setSquadList(squad);
        });
    }, [isEditing]);

    const submitAmbulanceCall = (event) => {
        event.preventDefault();
        const ambulanceCall = {
            'id': id,
            'description': event.target[0].value,
            'priority': event.target[1].value,
            'assigned_ambulance': selectedAmbulance ? selectedAmbulance.id : null,
            'assigned_squad': selectedSquad ? selectedSquad.id : null,
            'street': event.target[4].value,
            'number': event.target[5].value,
            'city': event.target[6].value
        };
        onAmbulanceCallAdded(ambulanceCall);
    };

    return (
        <div>
            <form onSubmit={submitAmbulanceCall}>
                <div className='form-group'>
                    <label htmlFor='assign-code'>Description: </label>
                    <input type='text-field' className='form-control' id='assign-code' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='assign-squad'>Priority: </label>
                    <input type='number' className='form-control' id='assign-squad' placeholder='Priority' value={priority} onChange={(e) => setPriority(e.target.value[1])} required />
                </div>
                <div className="form-group">
                    <div className="dropdown"  >
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" style={{ width: '100%'}} data-bs-toggle="dropdown" aria-expanded="false">
                            Select Ambulance: {selectedAmbulance ? selectedAmbulance.vehicle_name : ''}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ width: '100%'}}>
                            {ambulanceList.map((ambulance) => (
                                <li key={ambulance.id}>
                                    <div className='dropdown-item' style={{ backgroundColor: selectedAmbulance && selectedAmbulance.id === ambulance.id ? 'grey' : null }} onClick={() => setSelectedAmbulance(ambulance)}>
                                        {ambulance.vehicle_name}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="form-group">
                    <div className="dropdown"  >
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" style={{ width: '100%'}} data-bs-toggle="dropdown" aria-expanded="false">
                            Select Squad: {selectedSquad ? selectedSquad.name : ''}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ width: '100%'}}>
                            {squadList.map((squad) => (
                                <li key={squad.id}>
                                    <div className='dropdown-item' style={{ backgroundColor: selectedSquad && selectedSquad.id === squad.id ? 'grey' : null }} onClick={() => setSelectedSquad(squad)}>
                                        {squad.name}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
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
                            <input type='text' className='form-control' id='location-street' placeholder='Enter street' value={street} onChange={(e) => setStreet(e.target.value)} required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='location-number'>Street number</label>
                            <input type='number' className='form-control' id='location-number' placeholder='Enter street number' value={number} onChange={(e) => setNumber(e.target.value)} required />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='location-city'>City</label>
                        <input type='text' className='form-control' id='location-city' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                </div>
                <div>
                    {isEditing ?
                        <div style={{display: 'flex', width: '100%', columnGap: '8px'}}>
                            <button type='submit' style={{width: '100%'}} className='btn btn-primary'>Save</button>
                            <button type='button' style={{width: '100%'}} className='btn btn-primary' onClick={onCancel}>Cancel</button>
                        </div>
                        : <button type='submit' style={{width: '100%'}} className='btn btn-primary'>Add</button>
                    }
                </div>
            </form>
        </div>
    );
};

export default AddAmbulanceCallForm
