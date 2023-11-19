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
    const [income, setIncome] = useState(0);
    const [otherIncome, setOtherIncome] = useState(0);

    //Outgoings
    const [mortgage, setMortgage] = useState(0);
    const [car, setCar] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [media, setMedia] = useState(0);
    const [food, setFood] = useState(0);
    const [insurance, setInsurance] = useState(0);
    const [creditors, setCreditors] = useState(0);
    const [otherOutgoings, setOtherOutgoings] = useState(0);

    //Alerts
    const [message, setMessage] = useState({});
    const [alert, setAlert] = useState(false);

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
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setMessage("");
            }, 3000);
        } else if (selectedTime === "" || selectedTime === "Please select") {
            setMessage("You must provide a time period before proceeding");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setMessage("");
            }, 3000);
        } else if (name === "") {
            setMessage("You must provide a name for your budget");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setMessage("");
            }, 3000);
        } else if (income === 0 || income === "") {
            setMessage("You must provide an income before proceeding");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setMessage("");
            }, 3000);
        } else {
            let data = {
                name: name,
                currency: selectedCurrency,
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
                });
        }
    };

    return (
        <>
            <Nav />
            <main className="home">
                <h1>Hi, {customer.first_name}! </h1>
                <h2>Let's sort your budget </h2>
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

                <TextField
                    className="input_field_name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    label="Give your budget a name"
                    variant="outlined"
                />

                <FormControl sx={{ width: "95%" }}>
                    <InputLabel>What period is your budget for?</InputLabel>
                    <Select
                        label="What period is you budget for?"
                        onChange={(e) => setSelectedTime(e.target.value)}
                    >
                        <MenuItem value="Weekly">Weekly</MenuItem>
                        <MenuItem value="Monthly">Monthly</MenuItem>
                        <MenuItem value="Quarterly">Quarterly</MenuItem>
                        <MenuItem value="Annually">Annually</MenuItem>
                    </Select>
                </FormControl>
                <section className="income">
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
                </section>
                <section className="outgoings">
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
                        onChange={(e) => setOtherOutgoings(e.target.value)}
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
                </section>
                {!alert ? (
                    <Button
                        sx={{ width: "95%", margin: "30px 0" }}
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
                    <p>{message}</p>
                )}
            </main>
        </>
    );
}
