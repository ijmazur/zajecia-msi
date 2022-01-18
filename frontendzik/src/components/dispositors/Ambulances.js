import './Ambulances.css';
import { useState, useEffect } from 'react';
import AddAmbulanceForm from './AddAmbulanceForm';
import Ambulance from './Ambulance';
import ambulanceService from '../../services/ambulance.service';

export const Ambulances = () => {

    const options = [
        {id: 'all', name: 'All ambulances'},
        {id: 'busy', name: 'Ambulances on a call'},
        {id: 'free', name: 'Free ambulances'},
    ];
    const onOptionChange = (option) => {
        setSelectedStatus(option);
    };
    const [selectedStatus, setSelectedStatus] = useState(options[0]);

    const [showAddAmbulanceForm, setShowAddAmbulanceForm] = useState(false);
    const toggleShowAddAmbulanceForm = () => {
        setShowAddAmbulanceForm(!showAddAmbulanceForm);
    };

    const [ambulanceList, setAmbulanceList] = useState([]);
    const loadAmbulances = (option) => {
        ambulanceService.getAmbulances(option).then(
            (data) => {
                setAmbulanceList(data);
            }
        );
    };
    useEffect(() => {
        loadAmbulances(selectedStatus.id);
    }, [selectedStatus]);

    const onAmbulanceAdded = (ambulance) => {
        ambulanceService.addNewAmbulance(ambulance).then(
            () => {
                loadAmbulances(selectedStatus.id);
                toggleShowAddAmbulanceForm();
            }
        );
    }; 

    const onAmbulanceDeleted = (ambulance) => {
        ambulanceService.deleteAmbulance(ambulance.id).then(
            () => loadAmbulances(selectedStatus.id)
        );
    };

    const onAmbulanceEdited = (ambulance) => {
        ambulanceService.updateAmbulance(ambulance).then(
            () => loadAmbulances(selectedStatus.id)
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
                <button type='button' className={showAddAmbulanceForm ? 'btn btn-primary' : 'btn btn-secondary'} onClick={ toggleShowAddAmbulanceForm }>Add new ambulance</button>
            </div>
            { showAddAmbulanceForm ? 
                <div className="padding-8px">
                    <AddAmbulanceForm onAmbulanceAdded={onAmbulanceAdded} isEditing={null} />
                </div>
                : null 
            }
            { ambulanceList.length !== 0 ? 
                <div className="list">
                    {ambulanceList.map((ambulance) => (
                        <Ambulance key={ambulance.id} ambulance={ambulance} onEdit={ (editedAmbulance) => onAmbulanceEdited(editedAmbulance) } onDelete={ () => onAmbulanceDeleted(ambulance) }/>
                    ))}
                </div>
                : 'No ambulances to display'
            }
        </div>
    );
};

export default Ambulances;
