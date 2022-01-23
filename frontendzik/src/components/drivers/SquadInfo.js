import React from 'react';

const SquadInfo = ({ squad }) => {
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
            </div>
        </div>
    )
}

export default SquadInfo
