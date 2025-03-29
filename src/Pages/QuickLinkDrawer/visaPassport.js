import React, { useEffect, useState } from "react";
import {
    Typography,
    Button,
    TextField,
    IconButton,
    Box,
    Autocomplete,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Popover,
    InputAdornment,
    FormControlLabel,
    Checkbox,
    FormHelperText,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Add, Remove } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Grid from "@mui/material/Grid";
// import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const VisaPassportService = ({ selectedQuickLink, onClose }) => {
    const countries = [
        "United States",
        "Canada",
        "United Kingdom",
        "Australia",
        "New Zealand",
        "Germany",
        "France",
        "Japan",
        "China",
        "India",
        "United Arab Emirates",
        "South Africa",
        "Singapore",
        "Malaysia",
        "Italy",
        "Spain",
        "Netherlands",
        "Brazil",
        "Mexico",
        "Russia",
    ];
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        tripType: 'one-way',
        fromDestination: null, toDestination: null,
        departure: null, // New field for dropdown
        returnDate: null,
        flightClass: "Economy",
        visaType: "",
        directFlight: false
    });
    const [anchorEl, setAnchorEl] = useState(null);

    const [travelers, setTravelers] = useState({
        adults: 1,
        children: 0,
        infants: 0,
    });

    const [airports, setAirports] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        const fetchAirports = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://raw.githubusercontent.com/mwgg/Airports/master/airports.json");
                const data = response.data;

                // Filter only Indian airports
                const indianAirports = Object.values(data).filter(airport => airport.country === "IN");

                // Convert to dropdown format
                const airportOptions = indianAirports.map(airport => ({
                    label: `${airport.name} (${airport.iata})`,
                    value: airport.iata,
                }));

                setAirports(airportOptions);
            } catch (error) {
                console.error("Error fetching airports:", error);
            }
            setLoading(false);
        };

        fetchAirports();
    }, []);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClear = (name) => {
        setFormData({ ...formData, [name]: "" }); // Reset selection
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
        if (!formData.visaType) {
            newErrors.visaType = "Visa Type is required";
        }

        // To City Validation
        if (!formData.country) {
            newErrors.country = "Country is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChecked = (event) => {
        setFormData({ ...formData, directFlight: event.target.checked });
    };
    const handleSubmit = () => {
        if (validateForm()) {
            const { firstName, lastName, email, phone, message, country, visaType } = formData;

            const visaMessage = `
          🔹 *New Inquiry for ${selectedQuickLink}* 🔹
           Name: ${firstName} ${lastName}
           Email: ${email}
           Phone: ${phone}
           Visa Type: ${visaType}
           Country : ${country}
          ✍️ Message: ${message}
        `;

            const encodedMessage = encodeURIComponent(visaMessage);
            const phoneNumber = "8678995593"; // Replace with your WhatsApp number
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");

            onClose();
        }
    };

    return (
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
                        Visa Details
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" error={!!errors.country}>
                        <InputLabel id="country" >Select Country</InputLabel>
                        <Select label="Select Country" labelId="country"
                            endAdornment={
                                formData.country && (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handleClear("country")} edge="end">
                                            <ClearIcon style={{ paddingRight: "32px" }} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            } value={formData.country} name="country" onChange={handleChange}>
                            {countries.map((country) => (
                                <MenuItem key={country} value={country}>
                                    {country}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.country && (
                            <FormHelperText>{errors.country}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" error={!!errors.visaType}>
                        <InputLabel id="visaType" >Visa Type</InputLabel>
                        <Select label="Visa Type" labelId="visaType"
                            endAdornment={
                                formData.visaType && (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handleClear("visaType")} edge="end">
                                            <ClearIcon style={{ paddingRight: "32px" }} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            } value={formData.visaType} name="visaType" onChange={handleChange}>
                            <MenuItem value="Work Visa">Work Visa</MenuItem>
                            <MenuItem value="Student Visa">Student Visa</MenuItem>
                            <MenuItem value="Tourist Visa">Tourist Visa</MenuItem>
                        </Select>
                        {errors.visaType && (
                            <FormHelperText>{errors.visaType}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField fullWidth label="Message" name="message" variant="outlined" multiline rows={3} onChange={handleChange} />
                </Grid>
            </Grid>
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
    )
}

export default VisaPassportService