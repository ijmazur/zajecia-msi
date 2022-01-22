import { useState } from 'react';
import AddSquadForm from './AddSquadForm';

const Squad = ({ squad, onEdit, onDelete }) => {
    const [editVisible, setEditVisible] = useState(false);
    const toggleEditVisible = () => {
        setEditVisible(!editVisible);
    }

    return (
        <div className="row">
            <div className='ambulance'>
                <div className="squad-text">
                    <div className="field">
                        <span className="label">
                            Name:
                        </span>
                        <span className="value">
                            {squad.name}
                        </span>
                    </div>
                    <div className="field">
                        <span className="label">
                            Driver:
                        </span>
                        <span className="value">
                            {squad.drivers && squad.drivers.length != 0 ?
                            <ul>
                                {squad.drivers.map((driver) => (
                                    <li key={driver.id}>{driver.first_name} {driver.last_name}</li>
                                ))}
                            </ul>
                            : 'No drivers assigned to this squad' }
                        </span>
                    </div>
                </div>
                <div className="buttons">
                    <button type="button" style={{marginBottom: '8px'}} className="btn btn-primary" onClick={toggleEditVisible}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
                </div>
            </div>
            { editVisible ? <AddSquadForm onSquadAdded={ (editedSquad) => onEdit(editedSquad) } isEditing={squad} onCancel={toggleEditVisible}/> : null}
        </div>
    )
}

export default Squad
