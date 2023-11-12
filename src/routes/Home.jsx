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

export default function Home() {
    const navigate = useNavigate();
    //Customer
    const [customer, setCustomer] = useState({});
    //Currency and time
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

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

    const handleSubmit = () => {
        console.log("HERE");
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
        } else if (income === 0 || income === "") {
            setMessage("You must provide an income before proceeding");
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                setMessage("");
            }, 3000);
        } else {
            let data = {
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
                otherOutgoings: otherOutgoings
            };

            axios
                .post("http://localhost:9000/submit", data)
                .then(res => {
                    console.log(res);
                    navigate("/view-budgets");
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    return (
        <>
            <Nav />
            <main className="home">
                <h1>Let's sort your budget, {customer.first_name}!</h1>
                <section className="currency">
                    <Button
                        className="pound"
                        variant="contained"
                        onClick={() => setSelectedCurrency("pound")}>
                        {" "}
                        <CurrencyPoundIcon />
                    </Button>
                    <Button
                        className="dollar"
                        variant="contained"
                        color="success"
                        onClick={() => setSelectedCurrency("dollar")}>
                        <AttachMoneyIcon />
                    </Button>
                    <Button
                        className="euro"
                        variant="contained"
                        color="warning"
                        onClick={() => setSelectedCurrency("euro")}>
                        {" "}
                        <EuroSymbolIcon />
                    </Button>
                    <Button
                        className="yen"
                        variant="contained"
                        color="error"
                        onClick={() => setSelectedCurrency("yen")}>
                        {" "}
                        <CurrencyYenIcon />
                    </Button>
                </section>
                {selectedCurrency !== "" ? (
                    <h2 className="selected_currency">
                        You have selected:{" "}
                        <span>
                            {selectedCurrency.charAt(0).toUpperCase() +
                                selectedCurrency.slice(1)}
                        </span>
                    </h2>
                ) : null}
                <section className="time">
                    <h3>How would you like to plan?</h3>
                    <select onChange={e => setSelectedTime(e.target.value)}>
                        <option>Please select</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Annually</option>
                    </select>
                </section>
                <form className="budget_form">
                    <h2>Income</h2>
                    <section className="income">
                        <div className="income_section">
                            <label>How much to you make after tax?</label>
                            <input
                                type="number"
                                min="0"
                                onChange={e => setIncome(e.target.value)}
                            />
                        </div>
                        <div className="income_section">
                            <label>Include any other income</label>
                            <input
                                type="number"
                                min="0"
                                onChange={e => setOtherIncome(e.target.value)}
                            />
                        </div>
                    </section>
                    <section className="outgoings">
                        <h2>Outgoings</h2>
                        <div className="outgoings_section">
                            <label>Mortgage/Rent</label>
                            <input
                                type="number"
                                min="0"
                                onChange={e => setMortgage(e.target.value)}
                            />
                        </div>
                        <div className="outgoings_section">
                            <label>Car</label>
                            <input
                                type="number"
                                min="0"
                                onChange={e => setCar(e.target.value)}
                            />
                        </div>
                        <div className="outgoings_section">
                            <label>Taxes</label>
                            <input
                                type="number"
                                min="0"
                                onChange={e => setTaxes(e.target.value)}
                            />
                        </div>
                        <div className="outgoings_section">
                            <label>TV/Media</label>
                            <input
                                type="number"
                                min="0"
                                onClick={e => setMedia(e.target.value)}
                            />
                        </div>
                        <div className="outgoings_section">
                            <label>Food/Essentials</label>
                            <input
                                type="number"
                                min="0"
                                onChange={e => setFood(e.target.value)}
                            />
                        </div>
                        <div className="outgoings_section">
                            <label>Insurance</label>
                            <input
                                type="number"
                                min="0"
                                onChange={e => setInsurance(e.target.value)}
                            />
                        </div>
                        <div className="outgoings_section">
                            <label>Creditors</label>
                            <input
                                type="number"
                                min="0"
                                onChange={e => setCreditors(e.target.value)}
                            />
                        </div>
                        <div className="outgoings_section">
                            <label>Other Outgoings</label>
                            <input
                                type="number"
                                min="0"
                                onChange={e =>
                                    setOtherOutgoings(e.target.value)
                                }
                            />
                        </div>
                    </section>
                    {!alert ? (
                        <Button
                            variant="contained"
                            className="submit_btn"
                            onClick={handleSubmit}>
                            Submit
                        </Button>
                    ) : (
                        <p>{message}</p>
                    )}
                </form>
            </main>
        </>
    );
}
