import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import QuickLinks from "../QuickLinks";
import ExclusiveDeals from "../Deals";

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

            {/* Popular Destinations Section */}
            <Container sx={{ my: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Popular Destinations
                </Typography>
                <Grid container spacing={2}>
                    {[1, 2, 3].map((destination) => (
                        <Grid item xs={12} sm={6} md={4} key={destination}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Destination {destination}</Typography>
                                    <Typography variant="body2">Explore the best places!</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default Dashboard;
