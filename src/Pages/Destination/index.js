import React, { useState } from "react";
import { 
  Box, Typography, Grid, Card, CardMedia, 
  List, ListItem, ListItemAvatar, Avatar, ListItemText, useMediaQuery 
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dummyImg from "../../Media/Mega-sale.jpg";  

const allDestinations = [
  { name: "Turkey", price: "₹ 48070/-", img: dummyImg, description: "Travel to Turkey", category: "international" },
  { name: "Maldives", price: "₹ 55749/-", img: dummyImg, description: "Maldives Packages", category: "international" },
  { name: "Egypt", price: "₹ 57607/-", img: dummyImg, description: "Discover Egypt", category: "international" },
  { name: "Sri Lanka", price: "₹ 23800/-", img: dummyImg, description: "Explore Sri Lanka", category: "international" },
  { name: "Goa", price: "₹ 15923/-", img: dummyImg, description: "Goa Beaches", category: "domestic" },
  { name: "Manali", price: "₹ 18499/-", img: dummyImg, description: "Himalayan Adventure", category: "domestic" },
  { name: "Jaipur", price: "₹ 24999/-", img: dummyImg, description: "Royal Rajasthan", category: "domestic" },
];

const PopularDestinations = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Filter destinations based on category
  const filteredDestinations = selectedCategory === "all"
    ? allDestinations
    : allDestinations.filter(dest => dest.category === selectedCategory);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* 🔴 Title */}
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        Popular <span style={{ color: "red" }}>Destinations</span>
      </Typography>

      {/* 🔴 Navigation Tabs */}
      <Box sx={{ display: "flex", gap: 2, mt: 2, mb: 2, justifyContent: "center", flexWrap: "wrap" }}>
        {["all", "international", "domestic"].map((category) => (
          <Typography
            key={category}
            sx={{
              color: selectedCategory === category ? "red" : "gray",
              fontWeight: "bold",
              cursor: "pointer",
              borderBottom: selectedCategory === category ? "2px solid red" : "none",
              fontSize: { xs: "14px", sm: "16px" },
            }}
            onClick={() => setSelectedCategory(category)}
          >
            {category.toUpperCase()}
          </Typography>
        ))}
      </Box>

      {/* 🔴 Main Content */}
      <Grid container spacing={3}>
        
        {/* 🟢 Left Side List */}
        <Grid item xs={12} md={5}>
          <Box 
            sx={{ 
              bgcolor: "white", 
              borderRadius: 3, 
              p: 2, 
              height: isMobile ? "auto" : "100%", 
              maxHeight: isMobile ? "300px" : "400px", 
              overflowY: "auto",
            }}
          >
            <List>
              {filteredDestinations.map((item, index) => (
                <ListItem key={index} divider>
                  <ListItemAvatar>
                    <Avatar variant="rounded" src={item.img} sx={{ width: 50, height: 50 }} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <Typography 
                    sx={{ fontSize: 14, bgcolor: "#f5f5f5", px: 1.5, py: 0.5, borderRadius: 3 }}
                  >
                    {item.price}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* 🟢 Right Side Grid Cards */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>
            {filteredDestinations.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 3, position: "relative" }}>
                  <CardMedia 
                    component="img" 
                    height={isMobile ? "150" : "180"} 
                    image={item.img} 
                    alt={item.name} 
                  />
                  {/* Overlay Effect */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      background: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      padding: "8px",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                    <Typography variant="body2">{item.description} {item.price}</Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PopularDestinations;
