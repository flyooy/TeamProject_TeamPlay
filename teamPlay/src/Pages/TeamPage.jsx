import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createTeam from '../assets/img/fencing.jpg';
import player1Icon from '../assets/img/player_1.png';
import player2Icon from '../assets/img/player_2.png';
import player3Icon from '../assets/img/player_3.png';
import player4Icon from '../assets/img/player_4.png';
import player5Icon from '../assets/img/player_5.png';
import './TeamPage.css';

const PlayerTypes = ['ROOKIE', 'NORMAL', 'VETERAN', 'LEGENDARY'];
const Team = () => {
    const [teamName, setTeamName] = useState('');
    const [players, setPlayers] = useState([
        { name: '', type: '', icon: player1Icon },
        { name: '', type: '', icon: player2Icon },
        { name: '', type: '', icon: player3Icon },
        { name: '', type: '', icon: player4Icon },
        { name: '', type: '', icon: player5Icon },
    ]);
    
    const navigate = useNavigate(); 

    
    
    const handleCreateTeam = async () => {
        const allPlayersFilled = players.every(player => player.name.trim() !== '');
        if (!allPlayersFilled || teamName.trim() === '') {
            alert("Please fill in all player names.");
            return;
        }
        const allTypesFilled = players.every(player => player.type);
        console.log("All Types Filled Check:", allTypesFilled, players.map(player => player.type));
        if (!allTypesFilled) {
            alert("Please fill in all player types.");
            return; 
        }

        const typeCounts = players.reduce((counts, player) => {
            counts[player.type] = (counts[player.type] || 0) + 1;
            return counts;
        }, {});

        if (typeCounts['ROOKIE'] !== 1 || typeCounts['NORMAL'] !== 2 ||
            typeCounts['VETERAN'] !== 1 || typeCounts['LEGENDARY'] !== 1) {
                alert("Invalid team composition. You need: 1 Rookie, 2 Normal, 1 Veteran, and 1 Legendary.");
            return;
        }
    
        const teamData = {
            teamName,
            player1Name: players[0].name,
            player1Type: players[0].type,
            player2Name: players[1].name,
            player2Type: players[1].type,
            player3Name: players[2].name,
            player3Type: players[2].type,
            player4Name: players[3].name,
            player4Type: players[3].type,
            player5Name: players[4].name,
            player5Type: players[4].type,    
        };
        
        try {
            const response = await fetch('http://localhost:8080/api/v1/dash/team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(teamData),
            });
            console.log('Team Data:', JSON.stringify(teamData));
            if (!response.ok) {
                const errorData = await response.json();  
                console.error('Response from server:', errorData);  
                throw new Error('Failed to create team');
            }
    
            const responseData = await response.json();
            
            console.log('Team Created:', responseData);
            navigate('/user'); 
        } catch (error) {
            console.log('Team Data:', JSON.stringify(teamData));
            console.error("Error creating team:", error);
        }
    };
    const handlePlayerNameChange = (index, value) => {
        const newPlayers = [...players];
        newPlayers[index].name = value;
        setPlayers(newPlayers);
    };

    const handlePlayerTypeChange = (index, value) => {
        const newPlayers = [...players];
        newPlayers[index].type = value;
        console.log(`Updated player ${index + 1} type to:`, value);
        setPlayers(newPlayers);
    };

    return (
        <div className="team-page-container">
        <h1 className="title">Create a new Team</h1>
            <div className="image-and-requirements-container">
            <div className="fight-image-container_team">
                <img src={createTeam} alt="createTeam" className="create-image-team" />
            </div>
            
            <div className="team-requirements">
                <h2>Das Team muss beinhalten:</h2>
                <ul>
                    <li>1x Rookie</li>
                    <li>2x Normal</li>
                    <li>1x Veteran</li>
                    <li>1x Legendary</li>
                </ul>
                </div>
        </div>
            <input
                type="text"
                placeholder={`Team Name`}
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="team-name-input"
            />
            <div className="player-containers">
                {players.map((player, index) => (
                    <div key={index} className="player-container">
                        <img
                            src={player.icon}
                            alt={`Player ${index + 1}`}
                            className="player-icon"
                        />
                        <input
                            type="text"
                            placeholder={`Player ${index + 1} Name`}
                            value={player.name}
                            onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                            className="player-name-input"
                        />
                        <select
    value={player.type || ''} 
    onChange={(e) => handlePlayerTypeChange(index, e.target.value)}
    className="player-type-select"
>
    <option value="" disabled>Select Player Type</option> 
    {PlayerTypes.map(type => (
        <option key={type} value={type}>{type}</option>
    ))}
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