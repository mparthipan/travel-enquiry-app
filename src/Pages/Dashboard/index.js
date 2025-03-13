import { AppBar, Toolbar, Typography } from "@mui/material";
import QuickLinks from "../QuickLinks";
import ExclusiveDeals from "../Deals";
import PopularDestinations from "../Destination";

const Dashboard = () => {
    return (
        <div>
            {/* Header */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Your Logo Here
                    </Typography>
                </Toolbar>
            </AppBar>
            <QuickLinks />
            <ExclusiveDeals />
            <PopularDestinations/>
        </div>
    );
}

export default Dashboard;
