import './Ambulance.css'
const Ambulance = ({ ambulance }) => {
    return (
        <div className='ambulance'>
            <div className="text">
                <div className="field">
                    <span className="label">
                        Vehicle:
                    </span>
                    <span className="value">
                        {ambulance.vehicle_name}
                    </span>
                </div>
                <div className="field">
                    <span className="label">
                        Registration no. 
                    </span>
                    <span className="value">
                        {ambulance.registration_number}
                    </span>
                </div>
                <div className="field">
                    <span className="label">
                        Status: 
                    </span>
                    <span className="value">
                        {ambulance.status === 0 ? 'Free' : 'Busy (on a call)'}
                    </span>
                </div>
                <div className="field">
                    <span className="label">
                        Location:
                    </span>
                    <span className="value">
                        { `${ambulance.street} ${ambulance.number}, ${ambulance.city}` }
                    </span>
                </div>
            </div>
            <div className="buttons">
                <button type="button" style={{marginBottom: '8px'}} className="btn btn-primary">Edit</button>
                <button type="button" className="btn btn-danger">Delete</button>
            </div>
        </div>
    )
}

export default Ambulance
