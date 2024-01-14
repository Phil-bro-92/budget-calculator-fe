import "../styles/account.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { Button } from "@mui/material";
import axios from "axios";
import regexPatterns from "../utils/regex";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

export default function Account() {
    const url = process.env.REACT_APP_API_URL;
    const navigate = useNavigate("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");

    //Alerts
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    useEffect(() => {
        const customer = JSON.parse(localStorage.getItem("customer"));

        if (customer) {
            setFirstName(customer.first_name);
            setLastName(customer.last_name);
            setPhone(customer.phone);
            setEmail(customer.email);
            setId(customer._id);
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
            setSeverity("warning");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setMessage("");
                setSeverity("");
            }, 3000);
        } else if (phone && !phone.match(regexPatterns.phone)) {
            setMessage(
                "If entering a phone number please provide a valid number"
            );
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
            //TODO: Update details
            let data = {
                id: id,
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                email: email,
            };
            console.log(data);
            axios
                .post(`${url}/update-details`, data)
                .then((res) => {
                    console.log(res);
                    setMessage("Details changed");
                    setSeverity("success");
                    setAlert(true);
                    setTimeout(() => {
                        setAlert(false);
                        setMessage("");
                        setSeverity("");
                        localStorage.setItem(
                            "customer",
                            JSON.stringify(res.data)
                        );
                    }, 3000);
                })
                .catch((err) => {
                    console.log(err);
                    setMessage("Something went wrong. Please try again later");
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
                {!alert ? (
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
                ) : (
                    <Alert severity={severity} variant="filled">
                        {message}
                    </Alert>
                )}
            </main>
        </>
    );
}
