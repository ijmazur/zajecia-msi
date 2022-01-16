import React from 'react'

const AddAmbulanceForm = ({onAmbulanceAdded}) => {
    const submitAmbulance = (event) => {
        event.preventDefault();
        const ambulance = {
            'vehicle_name': event.target[0].value,
            'registration_number': event.target[1].value,
            'street': event.target[2].value,
            'number': event.target[3].value,
            'city': event.target[4].value,
        }
        onAmbulanceAdded(ambulance);
    } 

    return (
        <div>
            <form onSubmit={submitAmbulance}>
                <div className='form-group'>
                    <label htmlFor='vehicle-name'>Vehicle name</label>
                    <input type='text' className='form-control' id='vehicle-name' placeholder='Enter vehicle make and model' required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='registration-number'>Registration number</label>
                    <input type='text' className='form-control' id='registration-number' placeholder='Enter registration number' required/>
                </div>
                <div>
                    <p>Vehicle location</p>
                    <div className="adress-container" style={{
                        display: 'grid',
                        gridTemplateColumns: '3fr 1fr',
                        columnGap: '8px'
                    }}>
                        <div className='form-group'>
                            <label htmlFor='location-street'>Street</label>
                            <input type='text' className='form-control' id='location-street' placeholder='Enter street' required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='location-number'>Street number</label>
                            <input type='number' className='form-control' id='location-number' placeholder='Enter street number' required/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='location-city'>City</label>
                        <input type='text' className='form-control' id='location-city' placeholder='Enter city' required/>
                    </div>
                </div>
                <button type='submit' style={{width: '100%'}} className='btn btn-primary'>Add</button>
            </form>
        </div>
    )
}

export default AddAmbulanceForm
