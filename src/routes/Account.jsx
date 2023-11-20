import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { Button } from "@mui/material";
import axios from "axios";
import regexPatterns from "../utils/regex";
import TextField from "@mui/material/TextField";

export default function Account() {
    const navigate = useNavigate("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    //Alerts
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState("");

    //Log out user
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    //Update user details
    const handleUpdate = () => {
        //TODO: form validation, axios request
    };

    const handleEnterPress = event => {
        if (event.key === "Enter") {
            handleUpdate();
        }
    };

    return (
        <main>
            <Nav />
            <div>
                <h1>Your Account</h1>
                <Button variant="error" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
            <TextField
                className="input_field"
                type="text"
                onChange={e => setFirstName(e.target.value)}
                onKeyDown={e => handleEnterPress(e)}
                label="First name"
                variant="outlined"
            />
            <TextField
                className="input_field"
                type="text"
                onChange={e => setLastName(e.target.value)}
                onKeyDown={e => handleEnterPress(e)}
                label="Last name"
                variant="outlined"
            />
            <TextField
                className="input_field"
                type="number"
                min="0"
                onChange={e => setPhone(e.target.value)}
                onKeyDown={e => handleEnterPress(e)}
                label="Phone"
                variant="outlined"
            />
            <TextField
                className="input_field"
                type="email"
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => handleEnterPress(e)}
                label="Email"
                variant="outlined"
            />
            <Button variant="contained" color="warning" onClick={handleUpdate}>
                Update
            </Button>
        </main>
    );
}
