import React, { useState, useEffect } from 'react'
import AddSquadForm from './AddSquadForm';
import squadService from '../../services/squad.service';
import Squad from './Squad';
import driverService from '../../services/driver.service';

const Squads = () => {
    const [showAddSquadForm, setShowAddSquadForm] = useState(false);
    const toggleShowAddSquadForm = () => {
        setShowAddSquadForm(!showAddSquadForm);
    };

    const [squadList, setSquadList] = useState([]);
    const loadSquads = () => {
        driverService.getDriverList()
        .then((drivers) => {
            squadService.getSquadList()
            .then((data) => {
                    data.forEach((squad) => {
                        squad.drivers = squad.drivers.map((driverId) => drivers.find((d) => d.id === driverId))                        
                    })
                    console.log('data', data);
                    console.log('drivers', drivers);
                    setSquadList(data);
                }
            );
        })
    }
    useEffect(() => {
        loadSquads();
    }, []);

    const onSquadAdded = (squad) => {
        squadService.addNewSquad(squad).then(
            () => {
                toggleShowAddSquadForm();
                loadSquads();
            }
        );
    };

    const onSquadDeleted = (squad) => {
        squadService.deleteSquad(squad.id).then(
            () => loadSquads()
        );
    };

    const onSquadEdited = (squad) => {
        squadService.updateSquad(squad).then(
            () => loadSquads()
        );
    };

    return (
        <div>
            <div className='header padding-8px'>
                <div></div>
                <button type='button' className={showAddSquadForm ? 'btn btn-primary' : 'btn btn-secondary'} onClick={toggleShowAddSquadForm}>Add new squad</button>
            </div>
            {showAddSquadForm ?
                <div className="padding-8px">
                    <AddSquadForm onSquadAdded={onSquadAdded} onCancel={toggleShowAddSquadForm} />
                </div>
                : null
            }
            { squadList.length !== 0 ? 
                <div className="list">
                    {squadList.map((squad) => (
                        <Squad key={squad.id} squad={squad} onEdit={ (editedSquad) => onSquadEdited(editedSquad) } onDelete={ () => onSquadDeleted(squad) }/>
                    ))}
                </div>
                : 'No squads to display'
            }
        </div>
    );
};

export default Squads
