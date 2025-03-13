import React, { useState } from "react";
import { 
  Box, Typography, Grid, Card, CardMedia, 
  List, ListItem, ListItemAvatar, Avatar, ListItemText 
} from "@mui/material";
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

  // Filtered destinations based on selected category
  const filteredDestinations = selectedCategory === "all"
    ? allDestinations
    : allDestinations.filter(dest => dest.category === selectedCategory);

  return (
    <Box sx={{ p: 3 }}>
      {/* 🔴 Title */}
      <Typography variant="h4" fontWeight="bold">
        Popular <span style={{ color: "red" }}>Destinations</span>
      </Typography>

      {/* 🔴 Navigation Tabs */}
      <Box sx={{ display: "flex", gap: 3, mt: 1, mb: 2 }}>
        <Typography 
          sx={{ 
            color: selectedCategory === "all" ? "red" : "gray", 
            fontWeight: "bold", cursor: "pointer", 
            borderBottom: selectedCategory === "all" ? "2px solid red" : "none" 
          }}
          onClick={() => setSelectedCategory("all")}
        >
          ALL DESTINATIONS
        </Typography>

        <Typography 
          sx={{ 
            color: selectedCategory === "international" ? "red" : "gray", 
            cursor: "pointer", 
            borderBottom: selectedCategory === "international" ? "2px solid red" : "none" 
          }}
          onClick={() => setSelectedCategory("international")}
        >
          INTERNATIONAL
        </Typography>

        <Typography 
          sx={{ 
            color: selectedCategory === "domestic" ? "red" : "gray", 
            cursor: "pointer", 
            borderBottom: selectedCategory === "domestic" ? "2px solid red" : "none" 
          }}
          onClick={() => setSelectedCategory("domestic")}
        >
          DOMESTIC
        </Typography>

        <Typography sx={{ marginLeft: "auto", color: "red", cursor: "pointer" }}>
          View All Destinations
        </Typography>
      </Box>

      {/* 🔴 Main Content */}
      <Grid container spacing={3}>
        
        {/* 🟢 Left Side List */}
        <Grid item xs={12} md={4}>
          <Box sx={{ bgcolor: "white", borderRadius: 3, p: 2, height: "100%", overflowY: "auto", maxHeight: 400 }}>
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
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {filteredDestinations.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 3, position: "relative" }}>
                  <CardMedia component="img" height="180" image={item.img} alt={item.name} />
                  {/* Overlay Effect */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      background: "rgba(0, 0, 0, 0.6)", // Transparent black
                      color: "white",
                      padding: "8px",
                      backdropFilter: "blur(4px)", // Smooth blur effect
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
