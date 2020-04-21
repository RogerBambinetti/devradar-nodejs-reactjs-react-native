import React, { useState, useEffect } from 'react';
import './Main.css';

import api from '../services/api.js';

import DevItem from '../components/DevItem';
import Logo from '../assets/logo@3x.png';


export default function Main() {

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [github_username, setGithub_username] = useState('');
    const [techs, setTechs] = useState('');
    const [devs, setDevs] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => { console.log(err); },
            { timeout: 30000 }
        );
    }, []);

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs');
            console.log(response.data);
            setDevs(response.data);
        }
        loadDevs();
    }, []);

    async function handleAddDev(e) {
        e.preventDefault();
        const response = await api.post('/devs', { github_username, techs, longitude, latitude });
    }

    return (
        <div className="container">
            <aside>
                <img className="logo" src={Logo} alt=""/>
                <strong>Register</strong>
                <form>
                    <div className="input-block">
                        <label htmlFor="github_username">Github user</label>
                        <input name="github_username" id="github_username" required value={github_username} onChange={e => setGithub_username(e.target.value)} />
                    </div>

                    <div className="input-block">
                        <label htmlFor="techs">Techs</label>
                        <input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <div className="input-block">
                            <label htmlFor="techs">Latitude</label>
                            <input name="techs" id="techs" required value={latitude} onChange={e => setLatitude(e.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="techs">Longitude</label>
                            <input name="techs" id="techs" required value={longitude} onChange={e => setLongitude(e.target.value)} />
                        </div>
                    </div>

                    <button type="submit" onClick={handleAddDev}>Enter</button>
                </form>
            </aside>

            <main>
                <ul>
                    {devs && devs.map(dev => (
                       <DevItem dev={dev}/>
                    ))}
                </ul>
            </main>
        </div>
    );
}