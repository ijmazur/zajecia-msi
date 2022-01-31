import './Ambulances.css';
import { useState, useEffect } from 'react';
import AddAmbulanceCallForm from './AddAmbulanceCallForm.js';
import AmbulanceCall from './AmbulanceCall.js';
import ambulanceCallService from '../../services/ambulanceCall.service';
import squadService from '../../services/squad.service';
import ambulanceService from '../../services/ambulance.service'; 

export const Calls = () => {

    const options = [
        { id: 'all', name: 'All calls' },
        { id: 'busy', name: 'Call currently being handled' },
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
                        setAmbulanceCallList(data);
                    }
                );
            })
        })
    };
    useEffect(() => {
        loadAmbulanceCall(selectedStatus.id);
    }, [selectedStatus]);

    const onAmbulanceCallAdded = (ambulanceCall) => {
        ambulanceCallService.addNewAmbulanceCall(ambulanceCall).then(
            () => {
                loadAmbulanceCall(selectedStatus.id);
                toggleShowAddAmbulanceCallForm();
            }
        );
    };

    const onAmbulanceCallDeleted = (ambulanceCall) => {
        ambulanceCallService.deleteAmbulanceCall(ambulanceCall.id).then(
            () => loadAmbulanceCall(selectedStatus.id)
        );
    };

    const onAmbulanceCallEdited = (ambulanceCall) => {
        ambulanceCallService.updateAmbulanceCall(ambulanceCall).then(
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
                        {options.map((option) => (
                            <li key={option.id}>
                                <div className='dropdown-item' onClick={() => onOptionChange(option)}>
                                    {option.name}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <button type='button' className={showAddAmbulanceCallForm ? 'btn btn-primary' : 'btn btn-secondary'} onClick={toggleShowAddAmbulanceCallForm}>Add new call</button>
            </div>
            {showAddAmbulanceCallForm ?
                <div className="padding-8px">
                    <AddAmbulanceCallForm onAmbulanceCallAdded={onAmbulanceCallAdded} onCancel={toggleShowAddAmbulanceCallForm}/>
                </div>
                : null
            }
            {ambulanceCallList.length !== 0 ?
                <div className="list">
                    {ambulanceCallList.map((ambulanceCall) => (
                        <AmbulanceCall key={ambulanceCall.id} ambulanceCall={ambulanceCall} onDelete={() => onAmbulanceCallDeleted(ambulanceCall)} onEdit={(editedAmbulanceCall) => onAmbulanceCallEdited(editedAmbulanceCall)} />
                    ))}
                </div>
                : 'No ambulances to display'
            }
        </div>
    );
};

export default Calls;
