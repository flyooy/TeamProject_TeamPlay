
import React, { useEffect, useState } from 'react';
import fight from '../assets/img/fencing-run.gif';
import { useNavigate } from 'react-router-dom';
import './FightPage.css';
export default function FightPage() {
    const [fightResult, setFightResult] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const result = localStorage.getItem('fightResult');
        if (result) {
            setFightResult(JSON.parse(result));  
        }
    }, []);

    const handleBack = () => {
        localStorage.removeItem('fightResult');
        navigate('/userselection');
    };
    

    return (
        <div className="fight-container">
            <h1 className="fight-title_f">Fight Result</h1>
            <img src={fight} alt="fight" className="fight-image-f" />
            {fightResult !== null ? (
                <p className={`fight-result ${fightResult ? 'win' : 'lose'}`}>
                    {fightResult ? 'You won!' : 'You lost!'}
                </p>
            ) : (
                <p className="no-result">No fight result available.</p>
            )}

<button onClick={handleBack} className="back-btn">  Back to Selection </button>
        </div>
    );
   
}

