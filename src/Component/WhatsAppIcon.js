import React, { useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import "./style.css"; // For animation

const WhatsAppButton = () => {
    const phoneNumber = "8678995593";
    const message = "Hi! I would like to know more about your services.";
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <div
                onClick={handleClick}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                onTouchStart={handlePopoverOpen} // For mobile hover
                onTouchEnd={handlePopoverClose}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    zIndex: 9999,
                    backgroundColor: "#25D366",
                    borderRadius: "50%",
                    padding: "12px",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    animation: "pulse 1.8s infinite",
                }}
                className="whatsapp-button"
            >
                <WhatsAppIcon style={{ color: "#fff", fontSize: "32px" }} />
            </div>

            {/* <Popover
                id="whatsapp-popover"
                sx={{ pointerEvents: "none" }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1, fontSize: "12px" }}>
                    Click to Enquire !!!
                </Typography>
            </Popover> */}
        </>
    );
};

export default WhatsAppButton;
