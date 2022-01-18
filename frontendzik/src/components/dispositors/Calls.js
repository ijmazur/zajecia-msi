import './Ambulances.css';
import { useState, useEffect } from 'react';
import AddAmbulanceCallForm from './AddAmbulanceCallForm.js';
import AmbulanceCalls from './AmbulanceCalls';
import ambulanceCallService from '../../services/ambulanceCall.service';

export const Calls = () => {

    const options = [
        {id: 'all', name: 'All calls'},
        {id: 'busy', name: 'Call currently being handled'},
    ];
    const onOptionChange = (option) => {
        setSelectedStatus(option);
    };
    const [selectedStatus, setSelectedStatus] = useState(options[0]);

    const [showAddAmbulanceCallForm, setShowAddAmbulanceCallForm] = useState(false);
    const toggleShowAddAmbulanceCallForm = () => {
        setShowAddAmbulanceCallForm(!showAddAmbulanceCallForm);
    };

    const [ambulanceCallList, setAmbulanceCallList] = useState([]);
    const loadAmbulanceCall = (option) => {
        ambulanceCallService.getAmbulanceCall(option).then(
            (data) => {
                // setAmbulanceCallList(data);
                console.log('data', data);
            }
        );
    };
    useEffect(() => {
        loadAmbulanceCall(selectedStatus.id);
    }, [selectedStatus]);

    const onAmbulanceCallAdded = (ambulanceCall) => {
        ambulanceCallService.addNewAmbulanceCall(ambulanceCall).then(
            () => loadAmbulanceCall(selectedStatus.id)
        );
    }; 

    return (
        <div>
            <div className='header padding-8px'>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {selectedStatus.name}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        { options.map((option) => (
                            <li key={option.id}>
                                <div className='dropdown-item' onClick={() => onOptionChange(option)}>
                                    {option.name}
                                </div>
                            </li>
                        )) }
                    </ul>
                </div>
                <button type='button' className={showAddAmbulanceCallForm ? 'btn btn-primary' : 'btn btn-secondary'} onClick={ toggleShowAddAmbulanceCallForm }>Add new call</button>
            </div>
            { showAddAmbulanceCallForm ? 
                <div className="padding-8px">
                    <AddAmbulanceCallForm onAmbulanceCallAdded={onAmbulanceCallAdded} />
                </div>
                : null 
            }
            { ambulanceCallList.length !== 0 ? 
                <div className="padding-8px">
                    {ambulanceCallList.map((ambulance) => (
                        <AmbulanceCalls key={ambulance.id} ambulance={ambulance}/>
                    ))}
                </div>
                : 'No ambulances to display'
            }
        </div>
    );
};

export default Calls;
