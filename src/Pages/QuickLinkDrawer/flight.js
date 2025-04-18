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
const FlightBooking = ({ selectedQuickLink, onClose }) => {

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
        fareType: "",
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
        if (!formData.fromDestination) {
            newErrors.fromDestination = "From city is required";
        }

        // To City Validation
        if (!formData.toDestination) {
            newErrors.toDestination = "To city is required";
        }

        // Journey Date Validation
        if (!formData.departure) {
            newErrors.departure = "Departure date is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChecked = (event) => {
        setFormData({ ...formData, directFlight: event.target.checked });
    };
    const handleSubmit = () => {
        if (validateForm()) {
            const { firstName, lastName, email, phone, message, departure, returnDate, directFlight, fareType, flightClass,fromDestination,toDestination,tripType} = formData;

            const trainTicketMessage = `
          🔹 *New Inquiry for ${selectedQuickLink}* 🔹
           Name: ${firstName} ${lastName}
           Email: ${email}
           Phone: ${phone}
           From Destination: ${fromDestination?.label || "Not Selected"}
           To Destination: ${toDestination?.label || "Not Selected"}
           Passenger Count: ${`Adults: ${travelers.adults}, Children: ${travelers.children}, Infants: ${travelers.infants}`}
           Departure Date: ${departure}
           Return Date: ${returnDate}
           Flight Class: ${flightClass}
           Trip Type: ${tripType}
           Fare Type: ${fareType}
           Direct Flight: ${directFlight}
          ✍️ Message: ${message}
        `;

            const encodedMessage = encodeURIComponent(trainTicketMessage);
            const phoneNumber = "7042255663"; // Replace with your WhatsApp number
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
                        Flight Journey Details
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        options={airports}
                        getOptionLabel={(option) => option.label}
                        value={formData.fromDestination}
                        loading={loading}
                        onChange={(event, newValue) => setFormData({ ...formData, fromDestination: newValue })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="From"
                                variant="outlined"
                                fullWidth
                                error={!!errors.fromDestination}
                        helperText={errors.fromDestination}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        options={airports}
                        getOptionLabel={(option) => option.label}
                        value={formData.toDestination}
                        loading={loading}

                        onChange={(event, newValue) => setFormData({ ...formData, toDestination: newValue })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="To"
                                variant="outlined"
                                fullWidth
                                error={!!errors.toDestination}
                        helperText={errors.toDestination}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Depart Date"
                            disablePast
                            value={formData.departure}
                            onChange={(newValue) => setFormData({ ...formData, departure: newValue })}
                            slotProps={{
                                textField: {
                                    error: !!errors.departure,
                                    helperText: errors.departure,
                                    fullWidth: true,
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Return Date"
                            disablePast
                            minDate={formData.departure ? formData?.departure : null}
                            value={formData.returnDate}
                            onChange={(newValue) => setFormData({ ...formData, returnDate: newValue })}
                            slotProps={{
                                textField: {
                                    error: !!errors.returnDate,
                                    helperText: errors.returnDate,
                                    fullWidth: true,
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div>
                        <TextField
                            label="Travelers"
                            value={`Adults: ${travelers.adults}, Children: ${travelers.children}, Infants: ${travelers.infants}`}
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
                                    { label: "Children", sub: "2-12 Years", type: "children" },
                                    { label: "Infants", sub: "0-23 Months", type: "infants" },
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
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="tripType" shrink >Trip Type</InputLabel>
                        <Select label="Trip Type" labelId="tripType" value={formData.tripType} name="tripType" displayEmpty onChange={handleChange}>
                            <MenuItem value="one-way">One Way</MenuItem>
                            <MenuItem value="round-trip">Round Trip</MenuItem>
                            <MenuItem value="multi-city">Multi City</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="flightClass" shrink >Flight Class</InputLabel>
                        <Select label="Flight Class" labelId="flightClass" value={formData.flightClass} name="flightClass" displayEmpty onChange={handleChange}>
                            <MenuItem value="Economy"> Economy</MenuItem>
                            <MenuItem value="Premium Economy"> Premium Economy</MenuItem>
                            <MenuItem value="Business"> Business</MenuItem>
                            <MenuItem value="First Class"> First Class</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="fareType" >Fare Type</InputLabel>
                        <Select label="Fare Type" labelId="fareType"
                            endAdornment={
                                formData.fareType && (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handleClear("fareType")} edge="end">
                                            <ClearIcon style={{ paddingRight: "32px" }} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            } value={formData.fareType} name="fareType" onChange={handleChange}>
                            <MenuItem value="Defence Fare"> Defence Fare</MenuItem>
                            <MenuItem value="Student Fare"> Student Fare</MenuItem>
                            <MenuItem value="Senior Citizen Fare"> Senior Citizen Fare</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox checked={formData.directFlight} onChange={handleChecked} />}
                        label="Direct Flights"
                    />
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

export default FlightBooking