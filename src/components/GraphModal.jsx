import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
};

export default function GraphModal({ setOpen, selectedBudget }) {
    return (
        <Box sx={style}>
            <Typography id="modal-modal-description">
                <PieChart
                    series={[
                        {
                            data: [
                                {
                                    id: 0,
                                    value: selectedBudget.mortgage,
                                    label: "Mortgage/rent",
                                    color: "#DDFFF7",
                                },
                                {
                                    id: 1,
                                    value: selectedBudget.car,
                                    label: "Car",
                                    color: "#93E1D8",
                                },
                                {
                                    id: 2,
                                    value: selectedBudget.taxes,
                                    label: "Taxes",
                                    color: "#FFA69E",
                                },
                                {
                                    id: 3,
                                    value: selectedBudget.media,
                                    label: "Media",
                                    color: "#AA4465",
                                },
                                {
                                    id: 4,
                                    value: selectedBudget.food,
                                    label: "Food",
                                    color: "#462255",
                                },
                                {
                                    id: 5,
                                    value: selectedBudget.insurance,
                                    label: "Insurance",
                                    color: "#031D44",
                                },
                                {
                                    id: 6,
                                    value: selectedBudget.creditors,
                                    label: "Creditors",
                                    color: "#04395E",
                                },
                                {
                                    id: 7,
                                    value: selectedBudget.otherOutgoings,
                                    label: "Other outgoings",
                                    color: "#70A288",
                                },
                            ],
                            innerRadius: 40,
                            outerRadius: 100,
                            paddingAngle: 2,
                            cornerRadius: 5,

                            cx: 150,
                            cy: 150,
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </Typography>
            <Button variant="contained" onClick={() => setOpen(false)}>
                close
            </Button>
        </Box>
    );
}
