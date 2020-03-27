import React, { useState } from 'react';
import './Main.css';

export default function Main() {

    return (
        <div className="container">
            <aside>
                <strong>Register</strong>
                <form>
                    <div className="input-block">
                        <label htmlFor="github_user">Github user</label>
                        <input name="github_user" id="github_user" required />
                    </div>

                    <div className="input-block">
                        <label htmlFor="techs">Techs</label>
                        <input name="techs" id="techs" required />
                    </div>

                    <div className="input-group">
                        <div className="input-block">
                            <label htmlFor="techs">Latitude</label>
                            <input name="techs" id="techs" required />
                        </div>
                        <div className="input-block">
                            <label htmlFor="techs">Longitude</label>
                            <input name="techs" id="techs" required />
                        </div>
                    </div>

                    <button type="submit">Enter</button>
                </form>
            </aside>

            <main>
                <ul>
                    <li className="dev-item">
                        <header>
                            <img src="https://avatars0.githubusercontent.com/u/50684839?s=460&v=4" alt="" />
                            <div className="user-info">
                                <strong>Nome</strong>
                                <span>Techs</span>
                            </div>
                        </header>
                        <p>Bio</p>
                        <a href="">Acess Github</a>
                    </li>
                </ul>
            </main>
        </div>
    );
}