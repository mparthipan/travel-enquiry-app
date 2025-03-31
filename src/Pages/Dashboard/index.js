import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import QuickLinks from "../QuickLinks";
import ExclusiveDeals from "../Deals";
import PopularDestinations from "../Destination";
import TravelStoriesCarousel from "./TravelStoriesCarousel";
import WebLogo from "../../Media/logo_pride.png"
const Dashboard = () => {
    return (
        <div>
            {/* Header */}
            <AppBar position="static">
                <Toolbar>
                    <img src={WebLogo} alt="logo" style={{height:"50px", width:"100px"}}/>
                </Toolbar>
            </AppBar>
            <QuickLinks />
            <Container maxWidth="lg" sx={{ my: 6 }}><ExclusiveDeals /></Container>
            <Container maxWidth="lg" sx={{ my: 6 }}><PopularDestinations/></Container>
            {/* <TravelStoriesCarousel/> */}
        </div>
    );
}

export default Dashboard;
