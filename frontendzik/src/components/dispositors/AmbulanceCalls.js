import './AmbulanceCalls.css'
const AmbulanceCalls = ({ ambulanceCall }) => {
    return (
        <div className='ambulance'>
            <div className="text">
                <div className="field">
                    <span className="label">
                        Code:
                    </span>
                    <span className="value">
                        {ambulanceCall.code}
                    </span>
                </div>
                <div className="field">
                    <span className="label">
                        Status:
                    </span>
                    <span className="value">
                        {ambulanceCall.status}
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

export default AmbulanceCalls;
