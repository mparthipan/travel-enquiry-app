import React, { useState } from 'react';
import { Container, Typography, Drawer, Box, Grid, Paper, Chip, Button, IconButton, Accordion, AccordionSummary, AccordionDetails, AppBar, Toolbar, useMediaQuery, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import passportBg from "../../Media/passport-header-bg.png"
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import WebLogo from "../../Media/logo_pride.png"

const PassportApplicationPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
    });

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


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = () => {
        if (validateForm()) {
            const { firstName, lastName, email, phone, message, journeyDate, trainClass, toCity, fromCity } = formData;

            const trainTicketMessage = `
          🔹 *New Inquiry for Passport* 🔹
          🏷️ Name: ${firstName} ${lastName}
          📧 Email: ${email}
          📞 Phone: ${phone}
          ✍️ Message: ${message}
        `;

            const encodedMessage = encodeURIComponent(trainTicketMessage);
            const phoneNumber = "8678995593"; // Replace with your WhatsApp number
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");

            setDrawerOpen(false);
        }
    };
    return (
        <> <AppBar position="static">
            <Toolbar>
                                   <img src={WebLogo} alt="logo" style={{height:"50px", width:"100px"}}/>
               
            </Toolbar>
        </AppBar>

            <Container maxWidth="lg" sx={{ padding: 0, mt: 4, mb: 4, fontFamily: 'Roboto, sans-serif' }}>

                {/* Apply Passport Online Header */}
                {!isMobile && <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                    <Box textAlign="center" mb={6}>
                        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: '#000', fontSize: '2rem' }}>Apply Passport Online</Typography>
                        <Box display="flex" justifyContent="center" gap={6}>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#888', mb: 0.5 }}>Processing time</Typography>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>3 to 4 days</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#888', mb: 0.5 }}>Starting from</Typography>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>₹1,999/-</Typography>
                            </Box>

                        </Box>
                        <Box textAlign="center" mt={3}>
                            <Button variant="contained" sx={{ padding: '4px 12px', fontWeight: 500, borderRadius: '8px', fontSize: '0.75rem', backgroundColor: '#1976d2' }} onClick={() => setDrawerOpen(true)}>Click To Enquire</Button>
                        </Box>
                    </Box>
                    <img src={passportBg} alt='passport' style={{ width: "400px", height: "250px" }} />
                </div>}
                {isMobile && <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <img src={passportBg} alt='passport' style={{ width: "250px", height: "175px" }} />

                    <Box textAlign="center" mb={6}>
                        <Typography
                            variant="h3"
                            gutterBottom
                            sx={{
                                fontWeight: 700,
                                color: '#000',
                                fontSize: { xs: '1.6rem', sm: '2rem' }
                            }}
                        >
                            Apply Passport Online
                        </Typography>
                        <Box
                            display="flex"
                            justifyContent="center"
                            gap={6}
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            alignItems="center"
                        >
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#888', mb: 0.5, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                                    Processing time
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                                    3 to 4 days
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#888', mb: 0.5, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                                    Starting from
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                                    ₹1,999/-
                                </Typography>
                            </Box>
                        </Box>
                        <Box textAlign="center" mt={3}>
                            <Button
                                variant="contained"
                                sx={{
                                    padding: { xs: '6px 16px', sm: '4px 12px' },
                                    fontWeight: 500,
                                    borderRadius: '8px',
                                    fontSize: { xs: '0.8rem', sm: '0.75rem' },
                                    backgroundColor: '#1976d2'
                                }}
                                onClick={() => setDrawerOpen(true)}
                            >
                                Click To Enquire
                            </Button>
                        </Box>
                    </Box>

                </div>}
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        mb: 4,
                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                        textAlign: isMobile ? 'center' : 'left'
                    }}
                >
                    Types of Indian Passport
                </Typography>

                <Grid container spacing={isMobile ? 1 : 2}>
                    {[
                        { type: 'Adult (Normal)', fee: 'INR 1,999/-', validity: '10 Years', processingTime: '10-15 days', processingType: 'Normal', assistanceType: 'Online', popular: false },
                        { type: 'Personal Assistance', fee: 'INR 3,499/-', validity: '10 Years', processingTime: '10-15 days', processingType: 'Normal', assistanceType: 'Personal - Passport Centre', popular: true },
                        { type: 'Adult (Tatkaal)', fee: 'INR 4,499/-', validity: '10 Years', processingTime: '3-5 days', processingType: 'Express', assistanceType: 'Online', popular: false },
                        { type: 'Minor (Normal)', fee: 'INR 1,499/-', validity: '5 Years', processingTime: '10-15 days', processingType: 'Normal', assistanceType: 'Online', popular: false },
                        { type: 'Minor (Tatkaal)', fee: 'INR 3,999/-', validity: '5 Years', processingTime: '3-5 days', processingType: 'Express', assistanceType: 'Online', popular: false }
                    ].map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper elevation={2} sx={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                position: 'relative',
                                padding: isMobile ? 2 : 3
                            }}>
                                <Box sx={{ backgroundColor: '#E0E7FF', padding: 2 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: '#333',
                                            fontSize: isMobile ? '1rem' : '1.2rem'
                                        }}
                                    >
                                        Passport New / Renewal - {item.type}
                                    </Typography>
                                </Box>
                                <Box sx={{ padding: 2 }}>
                                    {item.popular && (
                                        <Chip
                                            label="POPULAR"
                                            sx={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                backgroundColor: '#D32F2F',
                                                color: 'white',
                                                fontWeight: 700,
                                                fontSize: isMobile ? '0.6rem' : '0.75rem'
                                            }}
                                        />
                                    )}
                                    <Typography>Validity: {item.validity}</Typography>
                                    <Typography>Traveler Type: {item.type.includes('Minor') ? 'Minor (below 15 years)' : 'Adult'}</Typography>
                                    <Typography>Processing Time: {item.processingTime}</Typography>
                                    <Typography>Processing Type: {item.processingType}</Typography>
                                    <Typography>Assistance Type: {item.assistanceType}</Typography>
                                    <Typography sx={{ mt: 1, fontWeight: 700, color: '#1E88E5', fontSize: isMobile ? '1rem' : '1.2rem' }}>
                                        Fees: {item.fee}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Types of Indian Passport Section */}
                {/* <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4, fontSize: '1.5rem' }}>Types of Indian Passport</Typography>
                <Grid container spacing={2}>
                    {[
                        { type: 'Adult (Normal)', fee: 'INR 1,999/-', validity: '10 Years', processingTime: '10-15 days', processingType: 'Normal', assistanceType: 'Online', popular: false },
                        { type: 'Personal Assistance', fee: 'INR 3,499/-', validity: '10 Years', processingTime: '10-15 days', processingType: 'Normal', assistanceType: 'Personal - Passport Centre', popular: true },
                        { type: 'Adult (Tatkaal)', fee: 'INR 4,499/-', validity: '10 Years', processingTime: '3-5 days', processingType: 'Express', assistanceType: 'Online', popular: false },
                        { type: 'Minor (Normal)', fee: 'INR 1,499/-', validity: '5 Years', processingTime: '10-15 days', processingType: 'Normal', assistanceType: 'Online', popular: false },
                        { type: 'Minor (Tatkaal)', fee: 'INR 3,999/-', validity: '5 Years', processingTime: '3-5 days', processingType: 'Express', assistanceType: 'Online', popular: false }
                    ].map((item, index) => (
                        <Grid item xs={12} sm={4} md={4} key={index} >
                            <Paper elevation={2} sx={{ borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                                <Box sx={{ backgroundColor: '#E0E7FF', padding: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                                        Passport New / Renewal - {item.type}
                                    </Typography>
                                </Box>
                                <Box sx={{ padding: 3 }}>
                                    {item.popular && (
                                        <Chip label="POPULAR" sx={{ position: 'absolute', top: 50, right: 10, backgroundColor: '#D32F2F', color: 'white', fontWeight: 700 }} />
                                    )}
                                    <Typography>Validity: {item.validity}</Typography>
                                    <Typography>Traveler Type: {item.type.includes('Minor') ? 'Minor (below 15 years)' : 'Adult'}</Typography>
                                    <Typography>Processing Time: {item.processingTime}</Typography>
                                    <Typography>Processing Type: {item.processingType}</Typography>
                                    <Typography>Assistance Type: {item.assistanceType}</Typography>
                                    <Typography sx={{ mt: 1, fontWeight: 700, color: '#1E88E5', fontSize: '1.2rem' }}>Fees: {item.fee}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid> */}

                <Box sx={{
                    marginTop: 5
                }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            mb: 4,
                            fontSize: isMobile ? '1.2rem' : '1.5rem',
                            textAlign: isMobile ? 'center' : 'left'
                        }}
                    >
                        Documents Required for Applying Passport Online
                    </Typography>
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">1. Proof of Present Address</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                • Aadhaar Card<br />
                                <br />
                                • Bank Passbook<br />
                                <br />
                                • Election Commission Photo ID (Voter ID)<br />
                                <br />
                                • Driving License<br />
                                <br />
                                • Electricity Bill (should not be older than 3 months)<br />
                                <br />
                                • Landline or Postpaid Mobile Bill (should not be older than 3 months)<br />
                                <br />
                                • Water Bill (should not be older than 3 months)<br />
                                <br />
                                • Proof of Gas Connection
                                <br />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">2. Proof of Date of Birth</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                • Birth Certificate<br />
                                <br />
                                • School Leaving Certificate / Matriculation Certificate<br />
                                <br />
                                • Pension Book / Pension Payment Order<br />
                                <br />
                                • Election Commission Photo ID (Voter ID)<br />
                                <br />
                                • Aadhaar Card<br />
                                <br />
                                • Driving License<br />
                                <br />
                                • PAN Card<br />
                                <br />
                                • Declaration from Orphanage / Child Care Home
                                <br />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={500} variant="h6">3. Photographs</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                • Size: 51mm x 51mm with white background<br />
                                <br />
                                • Address proof must match with the present address<br />
                                <br />
                                • Providing Aadhaar Card will expedite the process<br />
                                <br />
                                • For minors: Original and self-attested copies of parents' passports
                                <br />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>

                <Box textAlign="center" mt={6}>
                    <Button variant="contained" sx={{ padding: '4px 12px', fontWeight: 500, borderRadius: '8px', fontSize: '0.75rem', backgroundColor: '#1976d2' }} onClick={() => setDrawerOpen(true)}>Click To Enquire</Button>
                </Box>
            </Container>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: isMobile ? "100vw" : 700 } }}>
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
                            Passport Enquiry
                        </Typography>

                        <IconButton onClick={() => setDrawerOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Grid container spacing={2}>
                        {/* <Grid item xs={12} md={12}>
                            <Typography variant="h6" fontWeight="bold">
                                Contact Details
                            </Typography>
                        </Grid> */}
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
                        <Button onClick={() => setDrawerOpen(false)} variant="outlined" sx={{ mr: 1 }} >
                            Close
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Drawer>

        </>
    );
};

export default PassportApplicationPage;
