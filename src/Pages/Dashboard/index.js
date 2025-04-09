import { AppBar, Container, Toolbar, Typography, Box, Grid, Button, useTheme, useMediaQuery } from "@mui/material";
import QuickLinks from "../QuickLinks";
import ExclusiveDeals from "../Deals";
import { PopularDestinations, BestSellingDestinations } from "../Destination";
import TravelStoriesCarousel from "./TravelStoriesCarousel";
import WebLogo from "../../Media/logo_pride.png"
import WhatsAppButton from "../../Component/WhatsAppIcon";
import { useState } from "react";
import Emirates from '../../Media/emirates.png'
import Dubai_event from '../../Media/dubai_add.jpg'

import visaBanner from '../../Media/visa_banner.avif'
import vacBanner from '../../Media/vacc_banner.webp'
import wedBanner from '../../Media/wedd_banner.webp'

const Dashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // adds smooth scrolling effect
        });
    };

    return (
        <div>
            {/* Header */}
            <AppBar position="static">
                <Toolbar>
                    <img src={WebLogo} alt="logo" style={{ height: "50px", width: "100px" }} />
                </Toolbar>
            </AppBar>
            <QuickLinks drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
            <Container maxWidth="lg" sx={{ my: 2 }}>
                <Box
                    sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow: 3,
                        backgroundColor: "#fff",
                        maxWidth: "100%",
                        p: { xs: 2, md: 3 },
                        mb: 4,
                    }}
                >
                    <Grid container spacing={0} alignItems="center">
                        {/* Left Image Side */}
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    position: "relative",
                                    height: { xs: 200, md: 300 },
                                    backgroundImage: `url(${Emirates})`, // <- replace with your actual image path
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    borderRadius: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 12,
                                        left: 12,
                                        backgroundColor: "#fff",
                                        padding: "2px 12px",
                                        borderRadius: 1,
                                    }}
                                >
                                    <img
                                        src={WebLogo} // <- replace with your logo
                                        alt="Emirates"
                                        style={{ height: 32 }}
                                    />
                                </Box>
                            </Box>
                        </Grid>

                        {/* Right Text Side */}
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    px: { xs: 1, md: 4 },
                                    pt: { xs: 2, md: 0 },
                                    textAlign: { xs: "center", md: "left" },
                                }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 200,
                                        fontSize: { xs: "1.2rem", md: "1.8rem" },
                                    }}
                                >
                                    Experience{" "}
                                    <Box component="span" sx={{ color: "red", fontWeight: 700 }}>
                                        Emirates Airline
                                    </Box>{" "}
                                    with Pride Tours and Travels
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{ color: "#222", my: 1, fontSize: { xs: "0.9rem", md: "1rem" } }}
                                >
                                    Redefine Elegance in the Skies With Our Premium Airline Partner
                                </Typography>

                                <Button
                                    variant="outlined"
                                    size="medium"
                                    sx={{
                                        mt: 2,
                                        fontWeight: 200,
                                        borderColor: "#0071cc",
                                        color: "#0071cc",
                                        "&:hover": {
                                            backgroundColor: "#0071cc",
                                            color: "#fff",
                                        },
                                    }}
                                    onClick={handleScrollToTop}
                                >
                                    Click To Enquire
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            {/* <Container maxWidth="lg" sx={{ my: 2 }}><ExclusiveDeals /></Container> */}
            <Container maxWidth="lg" sx={{ my: 2 }}><PopularDestinations /></Container>
            <Container maxWidth="lg" sx={{ my: 2 }}><img src={Dubai_event} onClick={handleScrollToTop}
                style={{ width: "100%", height: isMobile ? "40px" : "100%", borderRadius: "8px", cursor: "pointer" }} alt="dubai-add" /></Container>
            <Container maxWidth="lg" sx={{ my: 2 }}><BestSellingDestinations /></Container>

            <TravelStoriesCarousel />
            <Container maxWidth="lg" sx={{ my: 2 }}><img src={visaBanner} onClick={handleScrollToTop}
                style={{ width: "100%", cursor: "pointer", height: isMobile ? "50%" : "50vh", borderRadius: "8px" }} alt="dubai-add" /></Container>
            {/* <Container maxWidth="lg" sx={{ my: 2 }}><img src={vacBanner} style={{width:"100%",height:isMobile ? "50%" :"50vh", borderRadius:"8px"}} alt="dubai-add"/></Container> */}
            {/* <Container maxWidth="lg" sx={{ my: 2 }}><img src={wedBanner} style={{width:"100%",height:isMobile ? "50%" :"50vh", borderRadius:"8px"}} alt="dubai-add"/></Container> */}

            {!drawerOpen && <WhatsAppButton />}

        </div>
    );
}

export default Dashboard;
