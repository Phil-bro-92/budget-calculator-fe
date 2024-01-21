import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import regexPatterns from "../utils/regex";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Logo from "../assets/budget-logo.png";
import Alert from "@mui/material/Alert";

export default function Login() {
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Alerts
    const [alert, setAlert] = useState("");
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    const handleLogin = () => {
        let data = {
            email: email,
            password: password,
        };

        if (email === "" || password === "") {
            setMessage("Please complete all required fields");
            setSeverity("warning");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setMessage("");
                setSeverity("");
            }, 3000);
        } else if (!email.match(regexPatterns.email)) {
            setMessage("Please enter a valid email address");
            setSeverity("warning");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setMessage("");
                setSeverity("");
            }, 3000);
        } else {
            axios
                .post(`${url}/login`, data)
                .then((res) => {
                    console.log(res.data);
                    const user = JSON.stringify(res.data.user);
                    const token = res.data.token;
                    localStorage.setItem("customer", user);
                    localStorage.setItem("token", token);
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err);
                    setMessage("Something went wrong - Please try again");
                    setSeverity("error");
                    setAlert(true);
                    setTimeout(() => {
                        setAlert(false);
                        setMessage("");
                        setSeverity("");
                    }, 3000);
                });
        }
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <main className="login">
            <img src={Logo} alt="main logo" className="main_logo" />
            <h1>Login</h1>

            <TextField
                className="input_field"
                type="email"
                label="Email"
                variant="filled"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => handleEnterPress(e)}
            />
            <TextField
                className="input_field"
                type="password"
                label="Password"
                variant="filled"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleEnterPress(e)}
            />

            {!alert ? (
                <Button variant="contained" onClick={handleLogin}>
                    Login
                </Button>
            ) : (
                <Alert severity={severity} variant="filled">
                    {message}
                </Alert>
            )}
            <p>
                Don't have an account? Register{" "}
                <span onClick={() => navigate("/register")}>here</span>
            </p>
            {/* <p onClick={() => navigate("/forgot-password")}>
                Forgot your password?
            </p> */}
        </main>
    );
}
