
import React, { useEffect, useState } from 'react';
import './UserPage.css';
import avatarImage from '../assets/img/avatar.jpg';
function UserPage() {
 
  const [userName, setUserName] = useState('');
  const [teamInfo, setTeamInfo] = useState({
    name: 'Team A',
    members: ['Member 1', 'Member 2', 'Member 3', 'Member 4', 'Member 5']
  });
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
        setUserName(storedUserName); // Set the user's name from local storage
    }
}, []);
  const createTeam = () => {
    console.log('Creating team...');
    
  };

  const deleteTeam = () => {
    console.log('Deleting team...');
    
  };

  const fight = () => {
    console.log('Starting fight...');
   
  };

  return (
    <div className="user-page">
  
      <h1>Hello, <span className='user-name'>{userName}</span>!</h1>
      <div className="image-container">
        <img src={avatarImage} alt="avatarImage" className="app-image-avatar" />
      </div>
  
      <p>What do you want?</p>

   
      <div className="team-info">
        <h2>Your Team: {teamInfo.name}</h2>
        <ul>
          {teamInfo.members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </div>

      
      <div className="actions">
        <button onClick={createTeam}>Create Team</button>
        <button onClick={deleteTeam}>Delete Team</button>
      </div>

 
      <button className="fight-btn" onClick={fight}>Fight</button>
    </div>
  );
}

export default UserPage;