import React, { useState } from 'react'

const Squads = () => {
    const [showAddAmbulanceCallForm, setShowAddAmbulanceCallForm] = useState(false);
    const toggleShowAddAmbulanceCallForm = () => {
        setShowAddAmbulanceCallForm(!showAddAmbulanceCallForm);
    };

    return (
        <div className='header padding-8px'>
            <div></div>
            <button type='button' className={showAddAmbulanceCallForm ? 'btn btn-primary' : 'btn btn-secondary'} onClick={toggleShowAddAmbulanceCallForm}>Add new squad</button>
        </div>
    )
}

export default Squads
