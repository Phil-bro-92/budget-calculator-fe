import "../styles/home.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import { Button } from "@mui/material";
import Nav from "../components/Nav";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import Logo from "../assets/budget-logo.png";

export default function Home() {
    const navigate = useNavigate();
    //Customer
    const [customer, setCustomer] = useState({});
    //Currency, time, name
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [currencyIcon, setCurrencyIcon] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [name, setName] = useState("");

    //Income
    const [income, setIncome] = useState("");
    const [otherIncome, setOtherIncome] = useState("");

    //Outgoings
    const [mortgage, setMortgage] = useState("");
    const [car, setCar] = useState("");
    const [taxes, setTaxes] = useState("");
    const [media, setMedia] = useState("");
    const [food, setFood] = useState("");
    const [insurance, setInsurance] = useState("");
    const [creditors, setCreditors] = useState("");
    const [otherOutgoings, setOtherOutgoings] = useState("");

    //Alerts
    const [message, setMessage] = useState({});
    const [alert, setAlert] = useState(false);
    const [severity, setSeverity] = useState("");

    //Get customer info
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("customer"));
        if (user) {
            setCustomer(user);
        }
    }, []);

    const handleSelectedCurrency = (currency) => {
        setSelectedCurrency(currency);
        switch (currency) {
            case "pound":
                setCurrencyIcon("£");
                break;
            case "dollar":
                setCurrencyIcon("$");
                break;
            case "euro":
                setCurrencyIcon("€");
                break;
            case "yen":
                setCurrencyIcon("¥");
                break;
            default:
                setSelectedCurrency("");
        }
    };

    const handleSubmit = () => {
        if (selectedCurrency === "") {
            setMessage("You must provide a currency type before proceeding");
            setSeverity("warning");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setSeverity("");
                setMessage("");
            }, 3000);
        } else if (selectedTime === "" || selectedTime === "Please select") {
            setMessage("You must provide a time period before proceeding");
            setSeverity("warning");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setSeverity("");
                setMessage("");
            }, 3000);
        } else if (name === "") {
            setMessage("Please provide a name for your budget");
            setSeverity("warning");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setSeverity("");
                setMessage("");
            }, 3000);
        } else if (income === "" || otherIncome === "") {
            setMessage("Please complete income fields");
            setSeverity("warning");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setSeverity("");
                setMessage("");
            }, 3000);
        } else if (
            mortgage === "" ||
            car === "" ||
            taxes === "" ||
            media === "" ||
            food === "" ||
            insurance === "" ||
            creditors === "" ||
            otherOutgoings === ""
        ) {
            setMessage("Please complete outgoing fields");
            setSeverity("warning");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setSeverity("");
                setMessage("");
            }, 3000);
        } else if (
            income.includes("e") ||
            otherIncome.includes("e") ||
            mortgage.includes("e") ||
            car.includes("e") ||
            taxes.includes("e") ||
            media.includes("e") ||
            food.includes("e") ||
            insurance.includes("e") ||
            creditors.includes("e") ||
            otherOutgoings.includes("e") ||
            income.includes("-") ||
            otherIncome.includes("-") ||
            mortgage.includes("-") ||
            car.includes("-") ||
            taxes.includes("-") ||
            media.includes("-") ||
            food.includes("-") ||
            insurance.includes("-") ||
            creditors.includes("-") ||
            otherOutgoings.includes("-")
        ) {
            setMessage("Do not use negative numbers or Euler's number");
            setSeverity("warning");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setSeverity("");
                setMessage("");
            }, 3000);
        } else {
            let data = {
                name: name,
                currency: currencyIcon,
                period: selectedTime,
                income: income,
                otherIncome: otherIncome,
                mortgage: mortgage,
                car: car,
                taxes: taxes,
                media: media,
                food: food,
                insurance: insurance,
                creditors: creditors,
                otherOutgoings: otherOutgoings,
            };

            axios
                .post(`http://localhost:9000/submit/${customer._id}`, data)
                .then((res) => {
                    console.log(res);
                    let customer = JSON.stringify(res.data);
                    localStorage.setItem("customer", customer);
                    navigate("/view-budgets");
                })
                .catch((err) => {
                    console.log(err);
                    setMessage("Something went wrong - Please try again");
                    setSeverity("error");
                    setAlert(true);
                    setTimeout(() => {
                        setAlert(false);
                        setSeverity("");
                        setMessage("");
                    }, 3000);
                });
        }
    };

    return (
        <>
            <Nav />
            <main className="home">
                <h1>
                    Welcome,{" "}
                    {customer.first_name &&
                        customer.first_name.charAt(0).toUpperCase() +
                            customer.first_name.slice(1)}
                    . let's sort out your budget!
                </h1>
                <section className="main_body">
                    <div className="first_section">
                        <h3>
                            Please pick a currency{" "}
                            {selectedCurrency && (
                                <span style={{ color: "rgb(62, 133, 137)" }}>
                                    - {selectedCurrency.toUpperCase()} (
                                    {currencyIcon})
                                </span>
                            )}
                        </h3>
                        <section className="currency">
                            <Button
                                className={
                                    selectedCurrency === "pound"
                                        ? "selected_currency"
                                        : "pound"
                                }
                                variant="contained"
                                onClick={() => handleSelectedCurrency("pound")}
                            >
                                {" "}
                                <CurrencyPoundIcon />
                            </Button>
                            <Button
                                className={
                                    selectedCurrency === "dollar"
                                        ? "selected_currency dollar"
                                        : "dollar"
                                }
                                variant="contained"
                                color="success"
                                onClick={() => handleSelectedCurrency("dollar")}
                            >
                                <AttachMoneyIcon />
                            </Button>
                            <Button
                                className={
                                    selectedCurrency === "euro"
                                        ? "selected_currency euro"
                                        : "euro"
                                }
                                variant="contained"
                                color="warning"
                                onClick={() => handleSelectedCurrency("euro")}
                            >
                                {" "}
                                <EuroSymbolIcon />
                            </Button>
                            <Button
                                className={
                                    selectedCurrency === "yen"
                                        ? "selected_currency"
                                        : "yen"
                                }
                                variant="contained"
                                color="error"
                                onClick={() => handleSelectedCurrency("yen")}
                            >
                                {" "}
                                <CurrencyYenIcon />
                            </Button>
                        </section>
                        <section className="name_period">
                            <TextField
                                className="input_field_name"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                label="Give your budget a name"
                                variant="outlined"
                            />

                            <FormControl sx={{ width: "100%" }}>
                                <InputLabel>
                                    What period is your budget for?
                                </InputLabel>
                                <Select
                                    label="What period is you budget for?"
                                    onChange={(e) =>
                                        setSelectedTime(e.target.value)
                                    }
                                >
                                    <MenuItem value="Weekly">Weekly</MenuItem>
                                    <MenuItem value="Monthly">Monthly</MenuItem>
                                    <MenuItem value="Quarterly">
                                        Quarterly
                                    </MenuItem>
                                    <MenuItem value="Annually">
                                        Annually
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <img src={Logo} alt="App logo" className="logo" />
                        </section>
                    </div>
                    {selectedCurrency && selectedTime && name && (
                        <section className="income_outgoing">
                            <h2>Income</h2>

                            <TextField
                                className="input_field"
                                type="number"
                                min="0"
                                onChange={(e) => setIncome(e.target.value)}
                                label="Main salary"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {currencyIcon}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className="input_field"
                                type="number"
                                min="0"
                                onChange={(e) => setOtherIncome(e.target.value)}
                                label="Other income"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {currencyIcon}
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <h2>Outgoings</h2>

                            <TextField
                                className="input_field"
                                type="number"
                                min="0"
                                onChange={(e) => setMortgage(e.target.value)}
                                label="Mortgage/Rent"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {currencyIcon}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className="input_field"
                                type="number"
                                min="0"
                                onChange={(e) => setCar(e.target.value)}
                                label="Car"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {currencyIcon}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className="input_field"
                                type="number"
                                min="0"
                                onChange={(e) => setTaxes(e.target.value)}
                                label="Taxes"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {currencyIcon}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className="input_field"
                                type="number"
                                min="0"
                                onChange={(e) => setMedia(e.target.value)}
                                label="TV/Media"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {currencyIcon}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className="input_field"
                                type="number"
                                min="0"
                                onChange={(e) => setFood(e.target.value)}
                                label="Food/Essentials"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {currencyIcon}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className="input_field"
                                type="number"
                                min="0"
                                onChange={(e) => setInsurance(e.target.value)}
                                label="Insurance"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {currencyIcon}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className="input_field"
                                type="number"
                                min="0"
                                onChange={(e) => setCreditors(e.target.value)}
                                label="Creditors"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {currencyIcon}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className="input_field"
                                type="number"
                                min="0"
                                onChange={(e) =>
                                    setOtherOutgoings(e.target.value)
                                }
                                label="Other Outgoings"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {currencyIcon}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {!alert ? (
                                <Button
                                    sx={{ width: "100%", margin: "30px 0" }}
                                    variant="contained"
                                    className="submit_btn"
                                    onClick={handleSubmit}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {currencyIcon}
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    Create budget
                                </Button>
                            ) : (
                                <Alert severity={severity} variant="filled">
                                    {message}
                                </Alert>
                            )}
                        </section>
                    )}
                </section>
            </main>
        </>
    );
}
