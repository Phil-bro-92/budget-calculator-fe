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
    borderRadius: '20px'
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
                                },
                                {
                                    id: 1,
                                    value: selectedBudget.car,
                                    label: "Car",
                                },
                                {
                                    id: 2,
                                    value: selectedBudget.taxes,
                                    label: "Taxes",
                                },
                                {
                                    id: 3,
                                    value: selectedBudget.media,
                                    label: "Media",
                                },
                                {
                                    id: 4,
                                    value: selectedBudget.food,
                                    label: "Food",
                                },
                                {
                                    id: 5,
                                    value: selectedBudget.insurance,
                                    label: "Insurance",
                                },
                                {
                                    id: 6,
                                    value: selectedBudget.creditors,
                                    label: "Creditors",
                                },
                                {
                                    id: 7,
                                    value: selectedBudget.otherOutgoings,
                                    label: "Other outgoings",
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
