import React, { useEffect, useState } from 'react';
import './UserSelectionPage.css';
import { useNavigate } from 'react-router-dom';
import vs from '../assets/img/vs.jpg';


export default function UserSelectionPage() {
    const [enemyList, setEnemyList] = useState([]);
    const [fightSystem, setFightSystem] = useState('standard');
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        fetchEnemyList();
    }, []);

  
    const fetchEnemyList = () => {
        console.log("Fetching enemy list...");
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
                console.log("Fetched enemy list:", data);
                if (Array.isArray(data)) {
                    setEnemyList(data);
                } else {
                    setEnemyList([]);
                }
              
            })
            .catch((error) => {
                console.error("Error fetching enemy list:", error);
                setEnemyList([]);
            });
    };

    const handleRandomFight = async () => {
        const choice = fightSystem === 'standard' ? 0 : 1; 
        const response = await fetch(`http://localhost:8080/api/v1/game/fight/random/${choice}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Fight result before saving:", result);
            localStorage.setItem('fightResult', JSON.stringify(result));
            
            navigate('/fight'); 
        } else {
            console.error('Error in random fight:', response.statusText);
        }
    };

    const handleFightWithUser = async (userName) => {
        const choice = fightSystem === 'standard' ? 0 : 1; 
        const response = await fetch(`http://localhost:8080/api/v1/game/fight/${choice}/${userName}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('fightResult', JSON.stringify(result));
            console.log(result); 
            navigate('/fight'); 
        } else {
            console.error('Error in fight with user:', response.statusText);
        }
    };

    const handleBack = () => {
        localStorage.removeItem('fightResult');
        navigate('/user');
    };

    return (
        <div className="fight-page-container">
            <div className="fight-image-container_fight">
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
                        <button 
                            onClick={handleBack} 
                            className="fight-button"
                        >
                            Back to User
                        </button>
                    </div>
                </div>

                <div className="fight-right">
                    <h2 className="fight-title">Enemy List</h2>
                    <ul className="fight-user-list">
                        {enemyList.length > 0 ? (
                            enemyList.map((enemy, index) => (
                                <li key={index} className="fight-user-item">
                                    <span className="fight-username">{enemy.ownerName}</span>
                                    <span className="fight-rating">User Rating: {enemy.totalRating}%</span>
                                    <span className="fight-team">Team: {enemy.teamName}</span>
                                    <span className="fight-team-rating">Team Rating: {enemy.teamRating}%</span>
                                    <button
                                        onClick={() => handleFightWithUser(enemy.ownerName)} 
                                        className="fight-user-button"
                                    >
                                        Fight
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="enemy">No enemies found</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}