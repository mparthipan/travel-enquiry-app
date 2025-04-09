import React from 'react';
import { Container, Typography, Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import pic1 from "../../Media/pic1.webp"
import pic2 from "../../Media/pic2.webp"
import pic3 from "../../Media/pic3.webp"
import pic4 from "../../Media/pic4.webp"
import pic5 from "../../Media/pic5.webp"
import beach from "../../Media/beach.jpg"
import resort from "../../Media/Resorts.avif"
import resort_2 from "../../Media/resort_2.avif"




const TravelStoriesCarousel = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.down("md")) && !isMobile;

    const stories = [
        { title: "Top Places On Earth", image: pic1, description: "" },
        { title: "Family Vacations in Summer", image: pic2, description: "" },
        { title: "Make International Flight Bookings", image: pic4, description: "" },
        { title: "Indian Places That Look International", image: pic3, description: "" },
        { title: "Exotic Beaches Around The World", image: beach, description: "" },
        { title: "Historical Wonders", image: pic1, description: "" },
        { title: "Luxury Resorts You Should Visit", image: resort_2, description: "" }
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: isMobile ? 1 : isTablet ? 2 : 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    return (
        <Container maxWidth="lg" sx={{ my: 6 }}>
            {/* <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                Travel <span style={{ color: '#1976d2' }}>Stories</span>
            </Typography> */}
            <Typography variant="h5" fontWeight="bold" sx={{paddingBottom:"16px"}}>
            Travel <span style={{ color: "red" }}>Stories</span>
                  </Typography>
            <Slider {...settings}>
                {stories.map((story, index) => (
                    <Box key={index} sx={{ padding: isMobile ? '0 5px' : '0 10px' }}>
                        <Paper
                            sx={{
                                backgroundImage: `url(${story.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: 320,
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                color: 'white',
                                p: 2,
                                position: 'relative',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                }
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>{story.title}</Typography>
                        </Paper>
                    </Box>
                ))}
            </Slider>
        </Container>
    );
};

export default TravelStoriesCarousel;
