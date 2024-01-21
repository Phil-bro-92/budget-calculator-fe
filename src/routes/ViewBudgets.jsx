import "../styles/viewbudget.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PieChartIcon from "@mui/icons-material/PieChart";
import DeleteCheckModal from "../components/DeleteCheckModal";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import GraphModal from "../components/GraphModal";

export default function ViewBudgets() {
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_URL;
    const [customer, setCustomer] = useState({});
    const [selectedBudget, setSelectedBudget] = useState({});
    const [totalIncome, setTotalIncome] = useState("");
    const [totalOutgoings, setTotalOutgoings] = useState("");
    const [open, setOpen] = useState(false);
    const [openCheck, setOpenCheck] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("customer"));
        if (user) {
            setCustomer(user);
        }
        window.scroll(0, 0);
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
        axios
            .delete(`${url}/delete/${customer._id}/${selectedBudget.id}`)
            .then((res) => {
                localStorage.setItem("customer", JSON.stringify(res.data));
                setCustomer(res.data);
                setSelectedBudget({});
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Nav />
            <main className="view_budgets">
                {customer.budgets && customer.budgets.length !== 0 ? (
                    <>
                        <h1>Select a budget</h1>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                flexDirection: "column",
                                width: "95%",
                                margin: "20px auto",
                                minWidth: 120,
                            }}
                        >
                            <FormControl sx={{ width: "100%" }}>
                                <InputLabel>Budgets</InputLabel>
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
                            </FormControl>
                            {Object.keys(selectedBudget).length > 0 && (
                                <section
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: "10px",
                                    }}
                                >
                                    {" "}
                                    <Tooltip title="View Pie Chart">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => setOpen(true)}
                                            sx={{ width: "45%" }}
                                        >
                                            <PieChartIcon />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Delete Budget">
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => setOpenCheck(true)}
                                            sx={{ width: "45%" }}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </Tooltip>
                                </section>
                            )}
                        </Box>
                    </>
                ) : (
                    <p className="no_budgets">
                        You haven't created any budgets yet. Head{" "}
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/")}
                        >
                            here
                        </span>{" "}
                        to make one!
                    </p>
                )}

                {Object.keys(selectedBudget).length > 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={2}>{selectedBudget.name}</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    {" "}
                                    <th colSpan={2}>Income</th>
                                </tr>
                                <tr>
                                    <th>Main</th>
                                    <td>
                                        {selectedBudget.currency}{" "}
                                        {selectedBudget.income}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Other</th>
                                    <td>
                                        {" "}
                                        {selectedBudget.currency}{" "}
                                        {selectedBudget.otherIncome}
                                    </td>
                                </tr>
                                <tr className="total">
                                    <th>Total</th>
                                    <th>
                                        {" "}
                                        {selectedBudget.currency} {totalIncome}
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan={2}>Outgoings</th>
                                </tr>{" "}
                                <tr>
                                    <th>Mortgage/Rent</th>
                                    <td>
                                        {" "}
                                        {selectedBudget.currency}{" "}
                                        {selectedBudget.mortgage}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Car</th>
                                    <td>
                                        {" "}
                                        {selectedBudget.currency}{" "}
                                        {selectedBudget.car}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Taxes</th>
                                    <td>
                                        {" "}
                                        {selectedBudget.currency}{" "}
                                        {selectedBudget.taxes}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Food/Essentials</th>
                                    <td>
                                        {" "}
                                        {selectedBudget.currency}{" "}
                                        {selectedBudget.food}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Insurance</th>
                                    <td>
                                        {" "}
                                        {selectedBudget.currency}{" "}
                                        {selectedBudget.insurance}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Creditors</th>
                                    <td>
                                        {" "}
                                        {selectedBudget.currency}{" "}
                                        {selectedBudget.creditors}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Other</th>
                                    <td>
                                        {" "}
                                        {selectedBudget.currency}{" "}
                                        {selectedBudget.otherOutgoings}
                                    </td>
                                </tr>
                                <tr className="total">
                                    <th>Total</th>
                                    <th>
                                        {" "}
                                        {selectedBudget.currency}{" "}
                                        {totalOutgoings}
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan={2}>Disposable/Savings</th>
                                </tr>
                                <tr>
                                    <th colSpan={2}>
                                        {selectedBudget.currency}{" "}
                                        {totalIncome - totalOutgoings}
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </>
                ) : null}
            </main>
            <Modal open={open}>
                <GraphModal setOpen={setOpen} selectedBudget={selectedBudget} />
            </Modal>
            <Modal open={openCheck}>
                <DeleteCheckModal
                    handleDeleteBudget={handleDeleteBudget}
                    setOpenCheck={setOpenCheck}
                    name={selectedBudget.name}
                />
            </Modal>
        </>
    );
}
