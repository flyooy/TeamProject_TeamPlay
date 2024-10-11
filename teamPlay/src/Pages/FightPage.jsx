import React from 'react';
import fight from '../assets/img/fencing-run.gif';
import './FightPage.css';
function FightPage() {
  
    const result = Math.random() > 0.5 ? 'You Win!' : 'You Lose!';

    return (
      <div className="fight-page-container">
         
        <h1>Fight Result</h1>
        <div className="fight-image-container">
                <img src={fight} alt="fight" className="fight-image-f" />
            </div>
            <h2 className='result'>{result}</h2>
        </div>
    );
}

export default FightPage;