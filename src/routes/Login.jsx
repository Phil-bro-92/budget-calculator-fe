import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";

export default function Login() {
    const url = "http://localhost:9000";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        let data = {
            email: email,
            password: password
        };

        axios.post(`${url}/customers/login`, data).then(res => {
            console.log(res).catch(err => {
                console.log(err);
            });
        });
    };

    return (
        <main className="login">
            <h2>Log in to your account</h2>
            <label>Email</label>
            <input type="email" onChange={e => setEmail(e.target.value)} />
            <label>Password</label>
            <input
                type="password"
                onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
        </main>
    );
}
