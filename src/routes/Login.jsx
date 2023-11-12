import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import regexPatterns from "../utils/regex";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Alerts
    const [alert, setAlert] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = () => {
        let data = {
            email: email,
            password: password
        };

        if (email === "" || password === "") {
            setMessage("Please complete all required fields");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setMessage("");
            }, 3000);
        } else if (!email.match(regexPatterns.email)) {
            setMessage("Please enter a valid email address");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setMessage("");
            }, 3000);
        } else {
            axios
                .post(`${url}/login`, data)
                .then(res => {
                    console.log(res.data);
                    const user = JSON.stringify(res.data);
                    localStorage.setItem("customer", user);
                    navigate("/");
                })
                .catch(err => {
                    console.log(err);
                });
        }
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
            {!alert ? (
                <Button onClick={handleLogin}>Login</Button>
            ) : (
                <p>{message}</p>
            )}
        </main>
    );
}
