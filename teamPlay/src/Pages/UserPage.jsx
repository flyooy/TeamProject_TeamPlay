
import React, { useEffect, useState } from 'react';
import './UserPage.css';
import avatarImage from '../assets/img/avatar.jpg';
import { useNavigate } from 'react-router-dom';
function UserPage() {
  const navigate = useNavigate(); 
  const [userName, setUserName] = useState('');
  const [winRatio, setWinRatio] = useState(0); 
  const [teamInfo, setTeamInfo] = useState({
    name: '',
    members: []
  });
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserName = localStorage.getItem("userName");
      const storedWinRatio = localStorage.getItem("winRatio");
      const token = localStorage.getItem("token");

      if (storedUserName) {
          setUserName(storedUserName);
      }
      if (storedWinRatio) {
          setWinRatio(storedWinRatio);  
      }

      // Fetch team info from the backend
      try {
        const response = await fetch("http://localhost:8080/api/v1/dash", {
          headers: {
            "Authorization": "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch team info');
        }

        const data = await response.json();
        console.log("Team data from API:", data);
        if (data.teamDTO) {
          setTeamInfo({
            name: data.teamDTO.teamName || '',  
            members: data.teamDTO.Players.map(player => player.name || 'Unnamed')  
          });
        } else {
          setTeamInfo({ name: '', members: [] });  
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  console.log("Team Info before rendering:", teamInfo);

  
  const createTeam = () => {
    console.log('Creating team...');
    navigate('/createteam'); 
  };

  const deleteTeam = async () => {
    const token = localStorage.getItem("token"); 

    try {
        const response = await fetch("http://localhost:8080/api/v1/dash/team", {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete team');
        }
        setTeamInfo({ name: '', members: [] });
        localStorage.removeItem("teamInfo"); 
        navigate('/user'); 
        console.log('Team deleted successfully!');
       
    } catch (error) {
        console.error("Error deleting team:", error);
    }
};

  const fight = () => {
    navigate('/userselection'); 
   
  };

  return (
    <div className="user-page">
  
      <h1>Hello, <span className='user-name'>{userName}</span>!</h1>
      <h2>Your Rating: {winRatio}</h2> 
      <div className="image-container">
        <img src={avatarImage} alt="avatarImage" className="app-image-avatar" />
      </div>
  
      <p>What do you want?</p>

     
      <div className="team-info">
        <h2>Your Team: {teamInfo.name}</h2>
        <ul>
          {teamInfo.members.length > 0 ? (
                teamInfo.members.map((member, index) => (
                    <li key={index}>{member}</li>
                ))
            ) : (
                <li>No members in the team</li>
            )}
        </ul>
      </div>

      
      <div className="actions">
        <button onClick={createTeam} disabled={teamInfo.members.length > 0} >Create Team</button>
        <button  onClick={deleteTeam} disabled={teamInfo.members.length === 0}>Delete Team</button>
      </div>

 
      <button className="fight-btn" onClick={fight} disabled={teamInfo.members.length === 0}>Fight</button>
    </div>
  );
}

export default UserPage;