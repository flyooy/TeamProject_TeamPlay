import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './FormPage.css?v=1'

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   
    
    function login() {
        const auth = {
            email,
            password
        }
    }
    return (
        <main>
            <div>
                <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Password" />
                <button onClick={login}>Login</button>
      <a  href="/registration">Don't have an account? Sign up</a>
            </div>
        </main>
    )
}