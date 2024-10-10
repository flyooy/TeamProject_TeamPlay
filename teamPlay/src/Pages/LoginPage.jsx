import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormPage.css?v=1";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function login() {
    const auth = {
      email,
      password,
    };
    const encoded = btoa(email + ":" + password);
    console.log(encoded);

    fetch("http://localhost:8080/api/v1/auth/signin", {
      method: "POST",
      headers: {
        Authorization: "Basic " + encoded,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token); // bleibt bis zum expliziten delete bestehen
        sessionStorage.setItem("token", data.token); // bleibt bestehen solange der tab geöffnet ist
        localStorage.setItem("userName", data.name);
        navigate("/user");
      });
  }
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
