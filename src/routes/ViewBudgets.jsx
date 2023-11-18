import "../styles/viewbudget.scss";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ViewBudgets() {
    const [customer, setCustomer] = useState({});
    const [selectedBudget, setSelectedBudget] = useState({});
    const [totalIncome, setTotalIncome] = useState("");
    const [totalOutgoings, setTotalOutgoings] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("customer"));
        if (user) {
            setCustomer(user);
            if (user.budgets.length > 0) {
                setSelectedBudget(user.budgets[user.budgets.length - 1]);
            }
        }
    }, []);

    const handleSelectedBudget = (id) => {
        for (let i = 0; i < customer.budgets.length; i++) {
            if (customer.budgets[i].id === id) {
                const incomeKeys = ["income", "otherIncome"];
                const outgoingKeys = [
                    "mortgage",
                    "car",
                    "taxes",
                    "media",
                    "food",
                    "insurance",
                    "creditors",
                    "otherOutgoings",
                ];

                const totalI = incomeKeys.reduce((accumulator, key) => {
                    let value = +customer.budgets[i][key] || 0;
                    return accumulator + value;
                }, 0);
                const totalO = outgoingKeys.reduce((accumulator, key) => {
                    let value = +customer.budgets[i][key] || 0;
                    return accumulator + value;
                }, 0);
                setSelectedBudget(customer.budgets[i]);
                setTotalIncome(totalI);
                setTotalOutgoings(totalO);
            }
        }
    };

    const handleDeleteBudget = () => {
    //TODO: Delete budget by id
    }

    return (
        <>
            <Nav />
            <main className="view_budgets">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        width: "95%",
                        margin: "20px auto",
                        minWidth: 120,
                    }}
                >
                    <FormControl sx={{ width: "80%" }}>
                        <InputLabel id="demo-simple-select-label">
                            Budgets
                        </InputLabel>
                        {customer.budgets && customer.budgets.length !== 0 ? (
                            <Select
                                label="Budget"
                                onChange={(e) =>
                                    handleSelectedBudget(e.target.value)
                                }
                            >
                                {customer.budgets.map((budget, i) => {
                                    return (
                                        <MenuItem key={i} value={budget.id}>
                                            {budget.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        ) : (
                            <p>You have no budgets</p>
                        )}
                    </FormControl>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteBudget}
                    >
                        <DeleteIcon />
                    </Button>
                </Box>

                {Object.keys(selectedBudget).length > 0 ? (
                    <table>
                        <thead>
                            <th colSpan={2}>{selectedBudget.name}</th>
                        </thead>

                        <tbody>
                            <tr>
                                {" "}
                                <th colSpan={2}>Income</th>
                            </tr>
                            <tr>
                                <th>Main</th>
                                <td>£ {selectedBudget.income}</td>
                            </tr>
                            <tr>
                                <th>Other</th>
                                <td>£{selectedBudget.otherIncome}</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td>£{totalIncome}</td>
                            </tr>
                            <tr>
                                <th colSpan={2}>Outgoings</th>
                            </tr>
                            <tr>
                                <th>Mortgage/Rent</th>
                                <td>£{selectedBudget.mortgage}</td>
                            </tr>
                            <tr>
                                <th>Car</th>
                                <td>£{selectedBudget.car}</td>
                            </tr>
                            <tr>
                                <th>Taxes</th>
                                <td>£{selectedBudget.taxes}</td>
                            </tr>
                            <tr>
                                <th>Food/Essentials</th>
                                <td>£{selectedBudget.food}</td>
                            </tr>
                            <tr>
                                <th>Insurance</th>
                                <td>£{selectedBudget.insurance}</td>
                            </tr>
                            <tr>
                                <th>Creditors</th>
                                <td>£{selectedBudget.creditors}</td>
                            </tr>
                            <tr>
                                <th>Other</th>
                                <td>£{selectedBudget.otherOutgoings}</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td>£{totalOutgoings}</td>
                            </tr>
                            <tr>
                                <th colSpan={2}>Disposable/Savings</th>
                            </tr>
                            <tr>
                                <th colSpan={2}>
                                    £{totalIncome - totalOutgoings}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                ) : null}
                <section></section>
            </main>
        </>
    );
}
