import { useState, useEffect } from "react";
import Nav from "../components/Nav";

export default function ViewBudgets() {
    const [customer, setCustomer] = useState({});
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("customer"));
        if (user) {
            setCustomer(user);
        }
    }, []);

    useEffect(() => {
        console.log(customer.budgets);
    }, [customer]);
    return (
        <>
            <Nav />
            <main className="view_budgets">
                <select>
                    <option>Please select</option>
                    {customer.budgets ? customer.budgets.map((budget, i) => {
                        return <option key={i}>{budget.name}</option>;
                    }): null}
                </select>
            </main>
        </>
    );
}
