import './../dispositors/Ambulance.css'
import React from 'react';

const DriverCall = ({ driverCall }) => {
    return (
        <div className="row">
            <div className='ambulance'>
                <div className="text">
                    <div className="field">
                        <span className="label">
                            Description:
                        </span>
                        <span className="value">
                            {driverCall.description}
                        </span>
                    </div>
                    <div className="field">
                        <span className="label">
                            Priority:
                        </span>
                        <span className="value">
                            {driverCall.priority}
                        </span>
                    </div>
                    <div className="field">
                        <span className="label">
                            Assigned ambulance:
                        </span>
                        <span className="value">
                            {driverCall.assigned_ambulance ? driverCall.assigned_ambulance.vehicle_name : 'Ambulance not assigned'}
                        </span>
                    </div>
                    <div className="field">
                        <span className="label">
                            Assigned squad:
                        </span>
                        <span className="value">
                            {driverCall.assigned_squad ? driverCall.assigned_squad.name : 'Squad not assigned' }
                        </span>
                    </div>
                    <div className="field">
                        <span className="label">
                            Location:
                        </span>
                        <span className="value">
                        { `${ driverCall.street } ${ driverCall.number }, ${ driverCall.city }` }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DriverCall;
