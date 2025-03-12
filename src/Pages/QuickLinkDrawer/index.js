import React, { useState } from "react";
import {
    Drawer,
    Typography,
    Button,
    TextField,
    Grid,
    IconButton,
    Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const QuickLinkDrawer = ({ open, onClose, selectedQuickLink }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const { firstName, lastName, email, phone, message } = formData;

        // Format message
        const whatsappMessage = `
          🔹 *New Inquiry for ${selectedQuickLink}* 🔹
          🏷️ Name: ${firstName} ${lastName}
          📧 Email: ${email}
          📞 Phone: ${phone}
          ✍️ Message: ${message}
        `;

        // Encode for WhatsApp URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Your WhatsApp number (Change to your number)
        const phoneNumber = "8678995593";  // Replace with your WhatsApp number

        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");

        // Close the drawer after submission
        onClose();
    };
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div style={{ width: 400, padding: 20, position: "relative" }}>
                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    style={{ position: "absolute", top: 10, right: 10 }}>
                    <CloseIcon />
                </IconButton>

                {/* Dynamic Title */}
                <Typography variant="h6" fontWeight="bold" mb={2}>
                    {selectedQuickLink}
                </Typography>

                {/* Form */}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField fullWidth label="First Name" variant="outlined" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Last Name" variant="outlined" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Email" variant="outlined" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Phone" variant="outlined" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Message" variant="outlined" multiline rows={3} onChange={handleChange} />
                    </Grid>
                </Grid>

                {/* Fixed Submit & Close Buttons */}
                <Box sx={{ position: "fixed", bottom: 16, right: 20, bgcolor: "white", p: 1 }}>
                    <Button onClick={onClose} variant="outlined" sx={{ mr: 1 }} >
                        Close
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </div>
        </Drawer>
    );
};