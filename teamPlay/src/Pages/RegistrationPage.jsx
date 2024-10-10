import { useState } from 'react';
import './FormPage.css?v=1'
import { useNavigate } from 'react-router-dom'; 

export default function RegistrationPage() {
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    function register() {
      const user = {
        name,
        email,
        password,
      };
  
      fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(err.message || 'Registration failed');
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  return (
    <main>
      <h2>Sign Up</h2>
      <input 
        onChange={(e) => setName(e.target.value)} 
        type="text" 
        placeholder="Name" 
      />
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

