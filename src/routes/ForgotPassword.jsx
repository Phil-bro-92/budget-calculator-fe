import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import regexPatterns from "../utils/regex";
import TextField from "@mui/material/TextField";
import Logo from "../assets/budget-logo.png";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_URL;
    const [email, setEmail] = useState("");

    //Alerts
    const [alert, setAlert] = useState("");
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    const handleForgotPassword = () => {
        let data = {
            email: email,
        };

        if (email === "") {
            setMessage("Please enter your email address");
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
                .post(`${url}/password_reset`, data)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            handleForgotPassword();
        }
    };

    return (
        <main className="login">
            <img src={Logo} alt="main logo" className="main_logo" />
            <h1>Forgot Password?</h1>
            <p>
                Please enter your email and we will send you a password reset
                email.
            </p>

            <TextField
                className="input_field"
                type="password"
                label="Password"
                variant="filled"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => handleEnterPress(e)}
            />

            {!alert ? (
                <Button variant="contained" onClick={handleForgotPassword}>
                    Reset Password
                </Button>
            ) : (
                <Alert severity={severity} variant="filled">
                    {message}
                </Alert>
            )}
            <p onClick={() => navigate("/login")}>Back to login?</p>
        </main>
    );
}
