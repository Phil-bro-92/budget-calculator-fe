import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
};

export default function DeleteCheckModal({
    handleDeleteBudget,
    setOpenCheck,
    name,
}) {
    return (
        <Box sx={style}>
            <Typography variant="h6" component="h2">
                Are you sure you wish to delete the {name} budget?{" "}
            </Typography>
            <section
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => setOpenCheck(false)}
                >
                    No, keep budget
                </Button>
                <Button variant="contained" onClick={handleDeleteBudget}>
                    Yes, delete budget
                </Button>
            </section>
        </Box>
    );
}
