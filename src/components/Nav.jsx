import "../styles/nav.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/budget-logo.png";
import CottageIcon from "@mui/icons-material/Cottage";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider } from "@mui/material";

//Styling
const menuMargin = {
    marginRight: "12px",
    color: "rgb(71, 110, 158)",
};

export default function Nav() {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        // Function to update isMobile based on window width
        function handleResize() {
            setIsMobile(window.innerWidth < 600);
        }

        // Add event listener to listen for window resize
        window.addEventListener("resize", handleResize);

        // Clean up by removing the event listener when component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleLogout = () => {
        navigate("/login");
        localStorage.clear();
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <nav>
            <img src={Logo} alt="budget-logo" onClick={() => navigate("/")} />
            {!isMobile ? (
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
                    <AccountCircleIcon
                        fontSize="large"
                        onClick={() => navigate("/account")}
                        className="menu_icon"
                    />
                    <ExitToAppIcon
                        fontSize="large"
                        onClick={handleLogout}
                        className="menu_icon"
                    />
                </div>
            ) : (
                <div>
                    <Button
                        id="demo-positioned-button"
                        aria-controls={
                            open ? "demo-positioned-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon
                            fontSize="large"
                            sx={{ color: "rgb(62, 133, 137)" }}
                        />
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                navigate("/");
                                handleClose();
                            }}
                        >
                            <CottageIcon sx={menuMargin} /> Home
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                navigate("/view-budgets");
                                handleClose();
                            }}
                        >
                            <BarChartIcon sx={menuMargin} />
                            Budgets
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                navigate("/account");
                                handleClose();
                            }}
                        >
                            <AccountCircleIcon sx={menuMargin} />
                            Account
                        </MenuItem>

                        <Divider />
                        <MenuItem
                            onClick={() => {
                                handleLogout();
                                handleClose();
                            }}
                        >
                            <ExitToAppIcon sx={menuMargin} />
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            )}
        </nav>
    );
}
