
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatarImage from '../assets/img/avatar.jpg';
import './UserPage.css';
function UserPage() {
  const [token, setToken] = useState('');
  const navigate = useNavigate(); 
  const [userName, setUserName] = useState('');
  const [winRatio, setWinRatio] = useState(0);
  const [teamRatio, setTeamRatio] = useState(0);
  const [teamInfo, setTeamInfo] = useState({
    name: '',
    members: []
  });

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [])

  useEffect(() => {
    if(token){
    const fetchUserData = async () => {
     
      // Fetch team info from the backend
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND + '/api/v1/dash', {
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch team info');
        }

        const data = await response.json();
          setUserName(data.name);
          setWinRatio(data.winRatio);
          setTeamRatio(data.teamRatio);

        if (data.team) {
          setTeamInfo({
            name: data.team.teamName || '',  
            members: data.team.Players || 'Unnamed'  
          });}
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
}}, [token]);
  console.log("Team Info before rendering:", teamInfo);

  
  const createTeam = () => {
    console.log('Creating team...');
    navigate('/createteam'); 
  };

  const deleteTeam = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND + '/api/v1/dash/team', {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete team');
        }
        setTeamInfo({
          name: '',
          members: []
        });
        setTeamRatio(0);
       
    } catch (error) {
        console.error("Error deleting team:", error);
    }
};
const handleLogout = () => {
  
  localStorage.removeItem('token'); 
  
  window.location.href = '/login';
};
  const fight = () => {
    navigate('/userselection'); 
   
  };

  return (
    <div className="user-page">
  <div className="logout-button-container">
    <button onClick={handleLogout} className="logout-button">Logout</button>
  </div>
      <h1>Hello <span className='user-name'>{userName}</span>!</h1>
      <h2>Your total rating: {winRatio}%</h2> 
      <div className="image-container">
        <img src={avatarImage} alt="avatarImage" className="app-image-avatar" />
      </div>
   
      <div className="team-info">
        {teamInfo.name.length > 0 ? 
        <>
        <h2>Your Team: <span className='team-detail'>{teamInfo.name}</span> Rating: <span className='team-detail'>{teamRatio}%</span></h2>
        <ul>
          {teamInfo.members.map((member, index) => (
                    <li key= {index}>
                      <span className='li-types'>Name: <span className='li-typedetail'>{member.name}</span></span>
                      <span className='li-types'>Lvl: <span className='li-typedetail'>{member.powerlevel}</span></span>
                      <span className='li-types'><span className='li-typedetail'>{member.type.toString().toLowerCase()}</span></span>
                    </li>
                ))}
        </ul>
        </>
        : 
        <h2>You need a Team! </h2>
          }
      </div>

      <p>What do you want?</p>
      
      <div className="actions">
        <button onClick={createTeam} disabled={teamInfo.members.length > 0} >Create Team</button>
        <button  onClick={deleteTeam} disabled={teamInfo.members.length === 0}>Delete Team</button>
      </div>

 
      <button className="fight-btn" onClick={fight} disabled={teamInfo.members.length === 0}>Fight</button>
    </div>
  );
}

export default UserPage;