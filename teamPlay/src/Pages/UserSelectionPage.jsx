import React, { useEffect, useState } from 'react';
import './UserSelectionPage.css';
import vs from '../assets/img/vs.jpg';
import { useNavigate } from 'react-router-dom';

export default function UserSelectionPage() {
    const [enemyList, setEnemyList] = useState([]); 
    const [fightSystem, setFightSystem] = useState('standard');
    const token = localStorage.getItem("token");
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchEnemyList();
    }, []);

   
    const fetchEnemyList = () => {
        fetch("http://localhost:8080/api/v1/game/enemies", { 
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch enemy list');
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setEnemyList(data); 
                } else {
                    setEnemyList([]); 
                }
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching enemy list:", error);
            });
    };

    const handleRandomFight = () => {
        navigate('/fight');
    };

    const handleFightWithUser = (userName) => {
        console.log(`Fight with ${userName} initiated!`);
        console.log("Selected Fight System:", fightSystem);
    };

    return (
        <div className="fight-page-container">
            <div className="fight-image-container">
                <img src={vs} alt="vs" className="fight-image-vs" />
            </div>
            <div className="fight-content">
                <div className="fight-left">
                    <button 
                        onClick={handleRandomFight} 
                        className="fight-button"  
                        disabled={enemyList.length === 0} 
                    >
                        Random Fight
                    </button>
                    <div className="fight-radio-group">
                        <label className="fight-label">
                            <input
                                type="radio"
                                value="standard"
                                checked={fightSystem === 'standard'}
                                onChange={() => setFightSystem('standard')}
                            />
                            Standard Fight System
                        </label>
                        <label className="fight-label">
                            <input
                                type="radio"
                                value="experimental"
                                checked={fightSystem === 'experimental'}
                                onChange={() => setFightSystem('experimental')}
                            />
                            Experimental Fight System
                        </label>
                    </div>
                </div>

                <div className="fight-right">
                    <h2 className="fight-title">Enemy List</h2>
                    <ul className="fight-user-list">
                        {enemyList.length > 0 ? (
                            enemyList.map((enemy, index) => ( 
                                <li key={index} className="fight-user-item">
                                    <span className="fight-username">{enemy.userName}</span>
                                    <span className="fight-rating">User Rating: {enemy.totalRatio}%</span> 
                                    <span className="fight-team">Team: {enemy.teamName}</span> 
                                    <span className="fight-team-rating">Team Rating: {enemy.teamRatio}%</span> 
                                    <button
                                        onClick={() => handleFightWithUser(enemy.userName)} 
                                        className="fight-user-button"
                                    >
                                        Fight
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className='enemy'>No enemies found</li> 
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}