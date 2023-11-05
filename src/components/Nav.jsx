import "../styles/nav.scss";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/budget-logo.png";
import CottageIcon from "@mui/icons-material/Cottage";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function Nav() {
  const navigate = useNavigate();
  return (
    <nav>
      <img src={Logo} alt="budget-logo" onClick={() => navigate("/")} />
      <div className="menu">
        <CottageIcon
          fontSize="large"
          onClick={() => navigate("/")}
          className="menu_icon"
        />
        <BarChartIcon
          fontSize="large"
          onClick={() => navigate("/view-budgets")}
          className="menu_icon"
        />
      </div>
    </nav>
  );
}
