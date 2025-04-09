import { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import TrainIcon from "@mui/icons-material/Train";
import HotelIcon from "@mui/icons-material/Apartment";
import VisaIcon from "@mui/icons-material/Description";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { QuickLinkDrawer } from "../QuickLinkDrawer";
import { useNavigate } from "react-router-dom";
const quickLinks = [
    { label: "Flights", icon: <FlightIcon /> },
    { label: "Trains", icon: <TrainIcon /> },
    { label: "Hotel", icon: <HotelIcon /> },
    { label: "Holiday Pack", icon: <BeachAccessIcon /> },
    { label: "Visa", icon: <VisaIcon /> },
    { label: "Passport", icon: <ImportContactsIcon /> },
    { label: "Cars", icon: <DirectionsBusIcon /> },
];

function QuickLinks({drawerOpen, setDrawerOpen}) {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(""); // Default selected

    const handleOpenDrawer = (link) => {
        if(link==="Passport"){
            navigate("/passportService")
        }else{
            setSelected(link);
            setDrawerOpen(true);    
        }
    };
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                <Grid container spacing={2} justifyContent="center">
                    {quickLinks.map((item) => (
                        <Grid item key={item.label}>
                            <Paper
                                elevation={selected === item.label ? 6 : 3}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 3,
                                    transition: "all 0.3s ease-in-out",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "scale(1.1)",
                                        boxShadow: 6,
                                    },
                                    backgroundColor: selected === item.label ? "#d32f2f" : "#fff",
                                    color: selected === item.label ? "#fff" : "#000",
                                }}
                                onClick={() => handleOpenDrawer(item.label)}
                            >
                                <Box sx={{ fontSize: 32 }}>{item.icon}</Box>
                                <Typography variant="body2" fontWeight="bold">
                                    {item.label}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <QuickLinkDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                selectedQuickLink={selected}
            />
        </>
    );
}

export default QuickLinks;
