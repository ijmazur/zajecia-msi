import React from 'react'
import './Main.css'
import ambulance from './../img/ambulance.png'
import dispositor from './../img/dispositor.png'

export const Main = () => {
    return (
        <div className='center'>
            <div className='header-container'>
                <h1>Welcome to App</h1>
                <h2>Please login</h2>
            </div>
            <div className='main-container'>
                <div className='section'>
                    <img className='front-image' src={ambulance} alt="Ambulance" />
                    <button style={{ width: '100%', marginTop: '8px' }} class="btn btn-primary" type="button">Ambulance Login</button>
                </div>
                <div className='section'>
                    <img className='front-image' src={dispositor} alt="Dispositor" />
                    <button style={{ width: '100%', marginTop: '8px' }} class="btn btn-primary" type="button">Dispositor Login</button>
                </div>
            </div>
        </div>
    )
}

export default Main;