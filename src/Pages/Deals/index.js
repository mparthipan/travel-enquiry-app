import { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";
import dummyImg from "../../Media/Mega-sale.jpg"

const deals = [
  {
    id: 1,
    title: "Save up to Rs.20,000*",
    description: "Hurry, book your international tickets now",
    image: dummyImg, // Store in src/media folder
    category: "FLIGHT",
  },
  {
    id: 2,
    title: "Mega Sale Fare",
    description: "Fares starting at INR 14,799*",
    image: dummyImg,
    category: "FLIGHT",
  },
  {
    id: 3,
    title: "Up to 75% Off on Hotels",
    description: "Sector type: Domestic and International",
    image: dummyImg,
    category: "HOTEL",
  },
];

function ExclusiveDeals() {
  const [selectedCategory, setSelectedCategory] = useState("HOT DEAL");

  return (
    <Box sx={{ px: 5, mt: 4 }}>
      {/* Title and Categories */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap", // Allows wrapping on small screens
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Exclusive <span style={{ color: "red" }}>Deals</span>
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {["HOT DEAL", "FLIGHT", "HOTEL", "HOLIDAYS", "VISA"].map((cat) => (
            <Typography
              key={cat}
              variant="body1"
              sx={{
                cursor: "pointer",
                fontWeight: selectedCategory === cat ? "bold" : "normal",
                color: selectedCategory === cat ? "red" : "black",
                borderBottom: selectedCategory === cat ? "2px solid red" : "none",
                transition: "all 0.3s ease-in-out",
              }}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Typography>
          ))}
        </Box>

        <Button
          sx={{
            ml: "auto",
            color: "red",
            fontWeight: "bold",
            fontSize: { xs: "12px", sm: "14px" }, // Smaller font on mobile
          }}
        >
          View All Deals
        </Button>
      </Box>

      {/* Deals Section */}
      <Grid container spacing={5} sx={{ mt: 2, overflowX: "auto", flexWrap: "nowrap" }}>
        {deals
          .filter((deal) => selectedCategory === "HOT DEAL" || deal.category === selectedCategory)
          .map((deal) => (
            <Grid item key={deal.id}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: 300,
                  height: "auto",
                  padding: 16,
                  borderRadius: 12,
                  background: "white",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                }}
              >
                <img
                  src={deal.image}
                  alt={deal.title}
                  style={{ width: "100%", borderRadius: 8 }}
                />
                <Typography fontWeight="bold" mt={1}>
                  {deal.title}
                </Typography>
                <Typography variant="body2" color="gray">
                  {deal.description}
                </Typography>
                <Button sx={{ mt: 1, color: "red", fontWeight: "bold" }}>Book Now</Button>
              </motion.div>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default ExclusiveDeals;
