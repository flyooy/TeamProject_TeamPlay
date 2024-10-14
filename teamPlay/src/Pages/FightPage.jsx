
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FighterBlue from '../assets/img/b_fighter.svg';
import PartDraw from '../assets/img/draw.svg';
import fight from '../assets/img/fencing-run.gif';
import FighterGreen from '../assets/img/g_fighter.svg';
import PartLose from '../assets/img/lose.svg';
import PartWin from '../assets/img/win.svg';
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
            <img src={fight} alt="fight" className={fightResult?.hasWon ? "fight-image-f-win" : "fight-image-f" }/>
            {fightResult !== null ? (
                <p className={`fight-result ${fightResult?.hasWon ? 'win' : 'lose'}`}>
                    {fightResult?.hasWon ? 'You won!' : 'You lost!'}
                </p>
            ) : (
                <p className="no-result">No fight result available.</p>
            )}

            <article className='fight-analytic'>
                <h2>Fight Analytics</h2>

                <ol className='player-details'>
                   {fightResult?.parts.map((fightPart,index) => (
                    fightPart?.partIsDraw ?
                    <li key={index}>
                        <div>
                        <p className='fight-damage'>-{fightPart.playerB.powerlevel}</p>
                        
                        <div>
                            <img src={FighterBlue} alt="a fightericon in blue" />
                            <p>{fightPart.playerA.name}</p>
                        </div>
                        </div>
                        <div>
                            <img src={PartDraw} alt='two boxing gloves symbolizing a draw' />
                            <p className='fight-round-counter'>Round {index +1}</p>
                        </div>
                        <div>
                            <div>
                                <img src={FighterGreen} alt="a fightericon in red" />
                                <p>{fightPart.playerB.name}</p>
                            </div>
                            <p className='fight-damage'>-{fightPart.playerA.powerlevel}</p>
                        </div>
                    </li>
                    : fightPart?.partIsWon ?
                    <li key={index}>
                        <div>
                            <p className='fight-damage'>-{fightPart.playerB.powerlevel}</p>
                            <div>
                                <img src={FighterBlue} alt="a fightericon in blue" />
                                <p>{fightPart.playerA.name}</p>
                            </div>
                        </div>
                        <div>
                            <img src={PartWin} alt='a boxing glove pointing to the right, symbolizing a win' />
                            <p className='fight-round-counter'>Round {index +1}</p>
                        </div>
                        <div>
                            <div>
                                <img src={FighterGreen} alt="a fightericon in red" />
                                <p>{fightPart.playerB.name}</p>
                            </div>
                            <p className='fight-damage'></p>
                        </div>
                    </li>
                    :
                    <li key={index}>
                        <div>
                            <p className='fight-damage'></p>
                        <div>
                            <img src={FighterBlue} alt="a fightericon in blue" />
                            <p>{fightPart.playerA.name}</p>
                        </div>
                        </div>
                        <div>
                            <img src={PartLose} alt='a boxing glove pointing to the left, symbolizing a loss' />
                            <p className='fight-round-counter'>Round {index +1}</p>
                        </div>
                        <div>
                            <div>
                                <img src={FighterGreen} alt="a fightericon in red" />
                                <p>{fightPart.playerB.name}</p>
                            </div>
                            <p className='fight-damage'>-{fightPart.playerA.powerlevel}</p>
                        </div>
                    </li>

                   ))}
                </ol>

            </article>


<button onClick={handleBack} className="back-btn">  Back to Selection </button>
        </div>
    );
   
}

