import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FormPage.css?v=1";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState('');
  const [winRatio, setWinRatio] = useState(0);
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
        sessionStorage.setItem("token", data.token); 

       
        return fetchUserDashboard(data.token);
      })
      .then((userData) => {
        console.log("User dashboard data:", userData); 

        
        if (userData.name) {
          console.log("User name found:", userData.name);
          localStorage.setItem("userName", userData.name); 
          setUserName(userData.name); 
        } else {
          console.error("No user name found in response");
        }
        if (userData.winRatio !== undefined) {
          console.log("User win ratio found:", userData.winRatio);
          localStorage.setItem("winRatio", userData.winRatio); 
          setWinRatio(userData.winRatio); 
        } else {
          console.error("No win ratio found in response");
        }
        if (userData.teamDTO) {
          localStorage.setItem("teamInfo", JSON.stringify({
              name: userData.teamDTO.name,
              members: userData.teamDTO.members || [] 
          }));
          setTeamInfo({
              name: userData.teamDTO.name,
              members: userData.teamDTO.members || [],
          });
      } else {
          console.error("No team data found in response");
      }

        navigate("/user");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const fetchUserDashboard = (token) => {
    return fetch("http://localhost:8080/api/v1/dash", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user dashboard');
        }
        return response.json();
      });
  };

  return (
    <main>
      <div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Password"
        />
        <button onClick={login}>Login</button>
        <a href="/registration">Don't have an account? Sign up</a>
      </div>
    </main>
  );
}
