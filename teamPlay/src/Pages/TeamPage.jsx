import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './TeamPage.css'; 

const Team = () => {
    const [teamName, setTeamName] = useState('');
    const [players, setPlayers] = useState([
        { name: '', type: 'Rookie' },
        { name: '', type: 'Normal' },
        { name: '', type: 'Normal' },
        { name: '', type: 'Veteran' },
        { name: '', type: 'Legendary' },
    ]);
    const navigate = useNavigate(); 
    const handleCreateTeam = () => {
       
        console.log('Team Created:', { teamName, players });

        
        navigate('/user'); 
    };
    const handlePlayerNameChange = (index, value) => {
        const newPlayers = [...players];
        newPlayers[index].name = value;
        setPlayers(newPlayers);
    };

    const handlePlayerTypeChange = (index, value) => {
        const newPlayers = [...players];
        newPlayers[index].type = value;
        setPlayers(newPlayers);
    };

    return (
        <div className="team-page-container">
            <h1 className='title'>Create a new Team</h1>
            <div className="team-requirements">
                <h2>Das Team muss beinhalten:</h2>
                <ul>
                    <li>1x Rookie</li>
                    <li>2x Normal</li>
                    <li>1x Veteran</li>
                    <li>1x Legendary</li>
                </ul>
            </div>
            <input
                type="text"
                placeholder={`Team Name (${teamName})`}
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="team-name-input"
            />
            <div className="player-containers">
                {players.map((player, index) => (
                    <div key={index} className="player-container">
                        <img
                            src={`https://via.placeholder.com/50`} 
                            alt={`Player ${index + 1}`}
                                className="player-icon"
                        />
                        <input
                            type="text"
                            placeholder={`Player ${index + 1} Name (${player.name})`}
                            value={player.name}
                            onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                            className="player-name-input"
                        />
                        <select
                            value={player.type}
                            onChange={(e) => handlePlayerTypeChange(index, e.target.value)}
                            className="player-type-select"
                        >
                            <option value="Rookie">Rookie</option>
                            <option value="Normal">Normal</option>
                            <option value="Veteran">Veteran</option>
                            <option value="Legendary">Legendary</option>
                        </select>
                    </div>
                ))}
            </div>
            <button onClick={handleCreateTeam} className="create-team-button">
                Create
            </button>
        </div>
    );
};

export default Team;
