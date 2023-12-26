import "../styles/account.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { Button } from "@mui/material";
import axios from "axios";
import regexPatterns from "../utils/regex";
import TextField from "@mui/material/TextField";

export default function Account() {
    const url = process.env.REACT_APP_API_URL;
    const navigate = useNavigate("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    //Alerts
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const customer = JSON.parse(localStorage.getItem("customer"));

        if (customer) {
            setFirstName(customer.first_name);
            setLastName(customer.last_name);
            setPhone(customer.phone);
            setEmail(customer.email);
        }
    }, []);

    //Log out user
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    //Update user details
    const handleUpdate = () => {
        if (firstName === "" || lastName === "" || email === "") {
            setMessage("Please complete all required fields");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setMessage("");
            }, 3000);
        } else if (phone && !phone.match(regexPatterns.phone)) {
            setMessage(
                "If entering a phone number please provide a valid number"
            );
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
            //TODO: Update details
            let data = {
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                email: email,
            };

            axios
                .post(`${url}/update-details`, data)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            handleUpdate();
        }
    };

    return (
        <>
            <Nav />
            <main className="account">
                <h1>Your Account</h1>
                <p>
                    To update your details, change them below and click update.
                </p>

                <TextField
                    className="input_field"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyDown={(e) => handleEnterPress(e)}
                    label="First name"
                    variant="outlined"
                    value={firstName}
                />
                <TextField
                    className="input_field"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    onKeyDown={(e) => handleEnterPress(e)}
                    label="Last name"
                    variant="outlined"
                    value={lastName}
                />
                <TextField
                    className="input_field"
                    type="number"
                    min="0"
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) => handleEnterPress(e)}
                    label="Phone"
                    variant="outlined"
                    value={phone}
                />
                <TextField
                    className="input_field"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => handleEnterPress(e)}
                    label="Email"
                    variant="outlined"
                    value={email}
                />
                <section className="btns">
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </section>
                {alert ? <p className="alert">{message}</p> : null}
            </main>
        </>
    );
}
