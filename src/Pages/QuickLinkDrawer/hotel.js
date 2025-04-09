import React, { useState } from "react";
import {
    Typography,
    Button,
    TextField,
    IconButton,
    Box,
    Popover,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";

export const HotelBooking = ({ onClose, selectedQuickLink }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        roomCount: "1",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        journeyDate: null,
        fromDestination: null, toDestination: null,
        destination: null, // New field for dropdown
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const [travelers, setTravelers] = useState({
        adults: 1,
        children: 0
    });
    const [errors, setErrors] = useState({});

    // const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTraveller = (type, operation) => {
        setTravelers((prev) => {
            const newValue =
                operation === "increase"
                    ? prev[type] + 1
                    : Math.max(type === "adults" ? 1 : 0, prev[type] - 1);

            return { ...prev, [type]: newValue };
        });
    };

    const open = Boolean(anchorEl);
    const id = open ? "travelers-popover" : undefined;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};

        // First Name Validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First Name is required";
        }

        // Phone Validation (Indian Mobile Number)
        if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid 10-digit Indian mobile number";
        }

        // Email Validation (Regex for email format)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        // From City Validation
        if (!formData.checkOut) {
            newErrors.checkOut = "CheckOut is required";
        }

        // To City Validation
        if (!formData.checkIn) {
            newErrors.checkIn = "CheckIn is required";
        }

        // Journey Date Validation
        if (!formData.destinationProperty) {
            newErrors.destinationProperty = "Destination is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = () => {
        if (validateForm()) {
            const { firstName, lastName, email, phone, message, destinationProperty, checkIn, checkOut, roomCount } = formData;

            const trainTicketMessage = `
          🔹 *New Inquiry for ${selectedQuickLink}* 🔹
          🏷️ Name: ${firstName} ${lastName}
          📧 Email: ${email}
          📞 Phone: ${phone}
           City/Hotel/Area/building: ${destinationProperty}
           Check In: ${checkIn}
           Check out: ${checkOut}
           No of Rooms: ${roomCount}
           No of Guest: ${`Adults: ${travelers.adults}, Children: ${travelers.children}`}
          ✍️ Message: ${message}
        `;

            const encodedMessage = encodeURIComponent(trainTicketMessage);
            const phoneNumber = "8678995593"; // Replace with your WhatsApp number
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");

            onClose();
        }
    };

    return (
        // <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: isMobile ? "100vw" : 700 } }}>
        <Box sx={{ p: 3, position: "relative" }}>


            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                    borderBottom: "2px solid #ddd",
                    // boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    bgcolor: "white",
                    marginBottom: "24px",
                    paddingBottom: "12px"
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    {selectedQuickLink}
                </Typography>

                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" fontWeight="bold">
                        Contact Details
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="First Name" error={!!errors.firstName}
                        helperText={errors.firstName} name="firstName" variant="outlined" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Last Name" name="lastName" variant="outlined" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth error={!!errors.phone}
                        helperText={errors.phone} label="Phone" name="phone" variant="outlined" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Email" error={!!errors.email}
                        helperText={errors.email} name="email" variant="outlined" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" fontWeight="bold">
                        Hotel Booking Details
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth type="text" error={!!errors.destinationProperty}
                        helperText={errors.destinationProperty} label="Enter City/Hotel/Area/building" name="destinationProperty" variant="outlined" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Check In"
                            disablePast
                            value={formData.checkIn}
                            onChange={(newValue) => setFormData({ ...formData, checkIn: newValue })}
                            slotProps={{
                                textField: {
                                    error: !!errors.checkIn,
                                    helperText: errors.checkIn,
                                    fullWidth: true,
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Check Out"
                            disablePast
                            minDate={formData.checkOut ? formData?.checkOut : null}
                            value={formData.checkOut}
                            onChange={(newValue) => setFormData({ ...formData, checkOut: newValue })}
                            slotProps={{
                                textField: {
                                    error: !!errors.checkOut,
                                    helperText: errors.checkOut,
                                    fullWidth: true,
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth type="number" label="No. Of. Rooms" name="roomCount" variant="outlined" onChange={handleChange} value={formData.roomCount} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <div>
                        <TextField
                            label="Guests"
                            value={`Adults: ${travelers.adults}, Children: ${travelers.children}`}
                            onClick={handleClick}
                            fullWidth
                            readOnly
                        />

                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                        >
                            <Box sx={{ p: 2, width: 250 }}>
                                {[
                                    { label: "Adults", sub: "", type: "adults" },
                                    { label: "Children", sub: "2-12 Years", type: "children" }
                                    // { label: "Infants", sub: "0-23 Months", type: "infants" },
                                ].map((item) => (
                                    <Box
                                        key={item.type}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ mb: 2 }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle1">{item.label}</Typography>
                                            {item.sub && (
                                                <Typography variant="caption" color="textSecondary">
                                                    {item.sub}
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box display="flex" alignItems="center">
                                            <IconButton
                                                onClick={() => handleTraveller(item.type, "decrease")}
                                                disabled={travelers[item.type] === (item.type === "adults" ? 1 : 0)}
                                            >
                                                <Remove />
                                            </IconButton>
                                            <Typography sx={{ mx: 1 }}>{travelers[item.type]}</Typography>
                                            <IconButton onClick={() => handleTraveller(item.type, "increase")}>
                                                <Add />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Popover>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Message" name="message" variant="outlined" multiline rows={3} onChange={handleChange} />
                </Grid>
            </Grid>

            {/* Fixed Submit & Close Buttons */}
            <Box
                sx={{
                    position: "sticky",
                    bottom: 0,
                    bgcolor: "white",
                    p: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                    borderTop: "1px solid #ddd"
                }}
            >
                <Button onClick={onClose} variant="outlined" sx={{ mr: 1 }} >
                    Close
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Box>
        // </Drawer>
    );
};
