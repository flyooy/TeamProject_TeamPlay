import { Link } from 'react-router-dom';
import './App.css';
import athleteImage from './assets/img/athlete-man.jpg';

function App() {


  return (
    <>
      <h1>Welcome</h1>

      <div className="image-container">
        <img src={athleteImage} alt="athlete-man" className="app-image" />
      </div>
      <div className='Log-reg'>
        <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link>
      </div>
  
    </>
  )
}

export default App
