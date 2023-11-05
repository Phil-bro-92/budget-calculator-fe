import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Nav from "./components/Nav";
import Home from "./routes/Home";
import ViewBudgets from "./routes/ViewBudgets";

export default function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/view-budgets" element={<ViewBudgets />} />
      </Routes>
    </Router>
  );
}
