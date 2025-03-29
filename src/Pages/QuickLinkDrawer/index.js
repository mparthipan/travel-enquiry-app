import React from "react";
import {
    Drawer,
    useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { TrainBooking } from "./train";
import FlightBooking from "./flight";
import { HotelBooking } from "./hotel";
import VisaPassportService from "./visaPassport";

export const QuickLinkDrawer = ({ open, onClose, selectedQuickLink }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


    return (
        <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: isMobile ? "100vw" : 700 } }}>
            {selectedQuickLink === "Trains" && <TrainBooking selectedQuickLink={selectedQuickLink} onClose={onClose} />}
            {selectedQuickLink === "Flights" && <FlightBooking selectedQuickLink={selectedQuickLink} onClose={onClose} />}
            {selectedQuickLink === "Hotel" && <HotelBooking selectedQuickLink={selectedQuickLink} onClose={onClose} />}
            {selectedQuickLink === "Visa" && <VisaPassportService selectedQuickLink={selectedQuickLink} onClose={onClose} />}

        </Drawer>
    );
};
