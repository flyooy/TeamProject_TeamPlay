import { useState } from 'react';
import './FormPage.css?v=1'

function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

    const register = () => {

        console.log('Registration successful');
        console.log('Email:', email);
        console.log('Password:', password);
    }

  return (
    <main>
      <h2>Sign Up</h2>
      <input 
        onChange={(e) => setEmail(e.target.value)} 
        type="text" 
        placeholder="Email" 
      />
      <input 
        onChange={(e) => setPassword(e.target.value)} 
        type="password" 
        placeholder="Password" 
      />
    
      <button onClick={register}>Register</button>
      <a href="/login">Already have an account? Sign in</a>
    </main>
  );
}

export default RegistrationPage;