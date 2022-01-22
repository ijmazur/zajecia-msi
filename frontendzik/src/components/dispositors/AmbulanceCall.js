import './AmbulanceCall.css'
import { useState } from 'react';
import AddAmbulanceCallForm from './AddAmbulanceCallForm.js'

const AmbulanceCall = ({ ambulanceCall, onEdit, onDelete }) => {
    const [editVisible, setEditVisible] = useState(false);
    const toggleEditVisible = () => {
        setEditVisible(!editVisible);
    }

    const save = (editedAmbulanceCall) => {
        toggleEditVisible();
        onEdit(editedAmbulanceCall);
    }

    return (
        <div className="row">
            <div className='ambulance'>
                <div className="text">
                    <div className="field">
                        <span className="label">
                            Description:
                        </span>
                        <span className="value">
                            {ambulanceCall.description}
                        </span>
                    </div>
                    <div className="field">
                        <span className="label">
                            Priority:
                        </span>
                        <span className="value">
                            {ambulanceCall.priority}
                        </span>
                    </div>
                    <div className="field">
                        <span className="label">
                            Assigned ambulance:
                        </span>
                        <span className="value">
                            {ambulanceCall.assigned_ambulance ? ambulanceCall.assigned_ambulance.vehicle_name : 'Ambulance not assigned'}
                        </span>
                    </div>
                    <div className="field">
                        <span className="label">
                            Assigned squad:
                        </span>
                        <span className="value">
                            {ambulanceCall.assigned_squad ? ambulanceCall.assigned_squad.name : 'Squad not assigned' }
                        </span>
                    </div>
                    <div className="field">
                        <span className="label">
                            Location:
                        </span>
                        <span className="value">
                        { `${ ambulanceCall.street } ${ ambulanceCall.number }, ${ ambulanceCall.city }` }
                        </span>
                    </div>
                </div>
                <div className="buttons">
                    <button type="button" style={{marginBottom: '8px'}} className="btn btn-primary" onClick={toggleEditVisible}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
                </div>
            </div>
            { editVisible ? <AddAmbulanceCallForm onAmbulanceCallAdded={ (editedAmbulance) => save(editedAmbulance) } isEditing={ambulanceCall} onCancel={toggleEditVisible}/> : null}
        </div>
    )
}

export default AmbulanceCall;
