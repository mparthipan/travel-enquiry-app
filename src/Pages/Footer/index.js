// Footer.js
import React from 'react';
import './Footer.css';
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from '@mui/material';

function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <footer className="footer">
            <div className="footer-content">
                <h3 className="business-name">PRIDE TOURS & TRAVELS</h3>
                
                <div className={`footer-flex ${isMobile ? "mobile" : ""}`}>
                    <div className="deals-in">
                        <h4>We Deal In:</h4>
                        <div className="deals-lists">
                            <ul>
                                <li>Visa Services</li>
                                <li>Air Tickets</li>
                                <li>Train Tickets</li>
                                <li>Hotels Booking</li>
                            </ul>
                            <ul>
                                <li>Tour Packages</li>
                                <li>Passport</li>
                                <li>Car Rent</li>
                            </ul>
                        </div>
                    </div>

                    <div className="contact-info">
                        <p>📞 +91-7042255663</p>
                        <p>📧 pridetoursandtravels82@gmail.com</p>
                        <p>📍 B-886 Ramphal Chowk Sector-7, Dwarka New Delhi - 110075, Above Nomad Pizza</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
