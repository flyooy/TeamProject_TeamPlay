import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState('');
  const [winRatio, setWinRatio] = useState(0);
  const [teamInfo, setTeamInfo] = useState({ name: '', members: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
    const storedWinRatio = localStorage.getItem("winRatio");
    if (storedWinRatio) {
      setWinRatio(storedWinRatio);  
    }
  }, []);

  function login() {
    const auth = {
      email,
      password,
    };
    const encoded = btoa(`${email}:${password}`);
    console.log("Encoded credentials: ", encoded);

    fetch("http://localhost:8080/api/v1/auth/signin", {
      method: "POST",
      headers: {
        Authorization: "Basic " + encoded,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to sign in. Please check your credentials.');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Auth response data:", data); 
        
        localStorage.setItem("token", data.token);
        navigate("/user");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    function submitByEnter(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        login();
      }
    }


  return (
    <main>
      <div>
        <h2>Login</h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => submitByEnter(e)}
          type="password" 
          placeholder="Password"
        />
        <button onClick={login}>Login</button>
        <a href="/registration">Don't have an account? Sign up</a>
      </div>
    </main>
  );
}
