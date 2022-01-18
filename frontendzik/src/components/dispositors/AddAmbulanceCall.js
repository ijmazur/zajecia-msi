import React from 'react'

const AddAmbulanceCallForm = ({onAmbulanceAdded}) => {
    const submitAmbulanceCall = (event) => {
        event.preventDefault();
        const ambulance = {
            'code': event.target[0].value,
            'status': event.target[1].value,
        }
        onAmbulanceAdded(ambulance);
    } 

    return (
        <div>
            <form onSubmit={submitAmbulanceCall}>
                <div className='form-group'>
                    <label htmlFor='vehicle-name'>Code</label>
                    <input type='text' className='form-control' id='vehicle-name' placeholder='Enter vehicle make and model' required/>
                </div>
                <div>
                    <p>Status</p>
                    <div className="adress-container" style={{
                        display: 'grid',
                        gridTemplateColumns: '3fr 1fr',
                        columnGap: '8px'
                    }}>
                    </div>
                </div>
                <button type='submit' style={{width: '100%'}} className='btn btn-primary'>Add</button>
            </form>
        </div>
    )
}

export default AddAmbulanceCallForm;
