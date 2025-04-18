import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {
    Typography,
    Button,
    TextField,
    IconButton,
    Box,
    Autocomplete,
    CircularProgress,
    FormControl,
    MenuItem,
    FormHelperText,
    InputAdornment,
    InputLabel,
    Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { trainClasses } from "../../Utils/ConstantData";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";


export const CarRentalBooking = ({ onClose, selectedQuickLink }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        journeyDate: null,
        sourceCity: null,
        noOfDays: "1",
        noOfPerson:"1",
        carType: "",
    });

    const [errors, setErrors] = useState({});
    const [cityOptions, setCityOptions] = useState([]);
    const [loading, setLoading] = useState(false);
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
        if (!formData.sourceCity) {
            newErrors.sourceCity = "Source city is required";
        }

        // To City Validation
        if (!formData.noOfDays) {
            newErrors.noOfDays = "No. of. Days is required";
        }

        if (!formData.noOfPerson) {
            newErrors.noOfPerson = "No. of. Person is required";
        }

        // Journey Date Validation
        if (!formData.journeyDate) {
            newErrors.journeyDate = "Journey date is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const fetchIndianCities = async (query) => {
        if (!query) return;
        setLoading(true);
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search`,
                {
                    params: {
                        q: query,
                        countrycodes: "IN", // Fetch only cities in India
                        format: "json",
                        limit: 10,
                        addressdetails: 1,
                    },
                }
            );

            const cities = response.data.map((city) => {
                // Prioritize structured city/town/village
                const cityName =
                    city.address.city || city.address.town || city.address.village || city.address.state;

                return { label: cityName };
            });

            setCityOptions(cities);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching cities:", error);
            setCityOptions([]);
            setLoading(false);

        }
    };


    useEffect(() => {
        fetchIndianCities("a")
    }, [])
    const handleSubmit = () => {
        if (validateForm()) {
            const { firstName, lastName, email, phone, message, journeyDate, noOfPerson, noOfDays, fromCity, carType } = formData;

            const trainTicketMessage = `
          🔹 *New Inquiry for ${selectedQuickLink}* 🔹
          🏷️ Name: ${firstName} ${lastName}
          📧 Email: ${email}
          📞 Phone: ${phone}
          📍 Source City: ${fromCity?.label || "Not Selected"}
          Journey Date: ${journeyDate}
          No of Person: ${noOfPerson}
          No of Days: ${noOfDays}
          Car Type: ${carType}
          ✍️ Message: ${message}
        `;

            const encodedMessage = encodeURIComponent(trainTicketMessage);
            const phoneNumber = "7042255663"; // Replace with your WhatsApp number
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");

            onClose();
        }
    };
    const handleClear = (name) => {
        setFormData({ ...formData, [name]: "" }); // Reset selection
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
                        Car Rental Details
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        options={cityOptions}
                        getOptionLabel={(option) => option.label}
                        value={formData.sourceCity}
                        loading={loading}
                        onChange={(event, newValue) => setFormData({ ...formData, sourceCity: newValue })}
                        onInputChange={(event, newInputValue) => fetchIndianCities(newInputValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="From" variant="outlined" fullWidth
                                error={!!errors.sourceCity}
                                helperText={errors.sourceCity}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    )
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField fullWidth type="number" value ={formData.noOfPerson} label="No. Of. Person" error={!!errors.noOfPerson}
                        helperText={errors.noOfPerson} name="noOfPerson" variant="outlined" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth type="number" value ={formData.noOfDays} error={!!errors.noOfDays}
                        helperText={errors.noOfDays} label="No. Of. Days" name="noOfDays" variant="outlined" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Journey Date"
                            disablePast
                            value={formData.journeyDate}
                            onChange={(newValue) => setFormData({ ...formData, journeyDate: newValue })}
                            slotProps={{
                                textField: {
                                    error: !!errors.journeyDate,
                                    helperText: errors.journeyDate,
                                    fullWidth: true,
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" error={!!errors.carType}>
                        <InputLabel id="carType" >Car Type</InputLabel>
                        <Select label="Car Type" labelId="carType"
                            endAdornment={
                                formData.carType && (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handleClear("carType")} edge="end">
                                            <ClearIcon style={{ paddingRight: "32px" }} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            } value={formData.carType} name="carType" onChange={handleChange}>
                            <MenuItem value="Sedan">Sedan</MenuItem>
                            <MenuItem value="SUV">SUV</MenuItem>
                            <MenuItem value="Hatchback">Hatchback</MenuItem>
                            <MenuItem value="Coupe">Coupe</MenuItem>
                            <MenuItem value="Convertible">Convertible</MenuItem>
                            <MenuItem value="Wagon">Wagon</MenuItem>
                            <MenuItem value="Pickup Truck">Pickup Truck</MenuItem>
                            <MenuItem value="Minivan">Minivan</MenuItem>
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
