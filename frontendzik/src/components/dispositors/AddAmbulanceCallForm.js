import React from 'react';
import { useState, useEffect } from 'react';
import ambulanceService from '../../services/ambulance.service';
import squadService from '../../services/squad.service';
import Ambulances from './Ambulances';


const AddAmbulanceCallForm = ({ onAmbulanceCallAdded, isEditing }) => {
    const [id, setId] = useState('');
    const [description, setCode] = useState('');
    const [status, setPriority] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [ambulanceList, setAmbulanceList] = useState([]);
    const [selectedAmbulances, setSelectedAmbulances] = useState(null);
    const [squadList, setSquadList] = useState([]);
    const [selectedSquad, setSelectedSquad] = useState(null);


    useEffect(() => {
        if (isEditing != null) {
            setId(isEditing.id);
            setCode(isEditing.code);
            setPriority(isEditing.status);
            setStreet(isEditing.street);
            setNumber(isEditing.number);
            setCity(isEditing.city);
            setSelectedAmbulances();
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
            'status': event.target[1].value,
        };
        onAmbulanceCallAdded(ambulanceCall);
    };

    return (
        <div>
            <form onSubmit={submitAmbulanceCall}>
                <div className='form-group'>
                    <label htmlFor='assign-code'>Description: </label>
                    <input type='text-field' className='form-control' id='assign-code' placeholder='Enter Code' value={description} onChange={(e) => setCode(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='assign-squad'>Priority: </label>
                    <input type='number' className='form-control' id='assign-squad' placeholder='Priority' value={status} onChange={(e) => setPriority(e.target.value[1])} required />
                </div>
                <div className="form-group">
                    <div className="dropdown"  >
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" style={{ width: '100%'}} data-bs-toggle="dropdown" aria-expanded="false">
                            Select Ambulance: {selectedAmbulances ? selectedAmbulances.vehicle_name : ''}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ width: '100%'}}>
                            {ambulanceList.map((ambulance) => (
                                <li key={ambulance.id}>
                                    <div className='dropdown-item' style={{ backgroundColor: selectedAmbulances && selectedAmbulances.id === ambulance.id ? 'grey' : null }} onClick={() => setSelectedAmbulances(ambulance)}>
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
            </form>
        </div>
    );
};

export default AddAmbulanceCallForm
