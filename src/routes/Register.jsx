import "../styles/login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import regexPatterns from "../utils/regex";
import TextField from "@mui/material/TextField";
import Logo from "../assets/budget-logo.png";

export default function Register() {
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_URL;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //Alerts
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState("");

    //Register user
    const handleRegister = async () => {
        let data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            password: password,
            budgets: []
        };

        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === ""
        ) {
            setMessage("Please complete all required fields");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setMessage("");
            }, 3000);
        } else if (!password.match(regexPatterns.password)) {
            setMessage(
                "Password must be at least 8 characters long and contain at least one uppercase, lowercase, number an special character"
            );
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setMessage("");
            }, 3000);
        } else if (password !== confirmPassword) {
            setMessage("Password do not match");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setMessage("");
            }, 3000);
        } else {
            axios
                .post(`${url}/register`, data)
                .then(res => {
                    navigate("/login");
                })
                .catch(err => {
                    console.log(err.response.data);
                    if (err.response.data === "Email is already registered") {
                        setMessage("Email already registered");
                        setAlert(true);
                        setTimeout(() => {
                            setAlert(false);
                            setMessage("");
                        }, 3000);
                    }
                });
        }
    };
    return (
        <main className="register">
            <img src={Logo} alt="main logo" />
            <h1>Register</h1>
            <TextField
                className="input_field"
                type="text"
                onChange={e => setFirstName(e.target.value)}
                label="First name"
                variant="filled"
            />
            <TextField
                className="input_field"
                type="text"
                onChange={e => setLastName(e.target.value)}
                label="Last name"
                variant="filled"
            />
            <TextField
                className="input_field"
                type="email"
                onChange={e => setEmail(e.target.value)}
                label="Email"
                variant="filled"
            />
            <TextField
                className="input_field"
                type="number"
                min="0"
                onChange={e => setPhone(e.target.value)}
                label="Phone"
                variant="filled"
            />
            <TextField
                className="input_field"
                type="password"
                onChange={e => setPassword(e.target.value)}
                label="Password"
                variant="filled"
            />
            <TextField
                className="input_field"
                type="password"
                onChange={e => setConfirmPassword(e.target.value)}
                label="Confirm password"
                variant="filled"
            />
            {!alert ? (
                <Button variant="contained" onClick={handleRegister}>
                    Register
                </Button>
            ) : (
                <p>{message}</p>
            )}
            <p>
                Already registered? Click{" "}
                <span onClick={() => navigate("/login")}>here</span> to login.
            </p>
        </main>
    );
}
