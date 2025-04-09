import React, { useState } from "react";
import {
  Box, Typography, Grid, Card, CardMedia,
  List, ListItem, ListItemAvatar, Avatar, ListItemText, useMediaQuery,
  CardContent
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dummyImg from "../../Media/Mega-sale.jpg";
import thai from "../../Media/thailand.avif";
import dubai from "../../Media/dubai.avif";
import veit from "../../Media/veitnam.avif";
import malay from "../../Media/malaysia.avif";
import mald from "../../Media/maldives.avif";
import sing from "../../Media/singapore1.avif";
import bali from "../../Media/bali.avif";
import europe from "../../Media/europe.avif";
import australia from "../../Media/australia.jpg";
import newzea from "../../Media/newzea.avif";
import turkey from "../../Media/turkey.avif";

import goa from "../../Media/goa.avif";
import kerala from "../../Media/kerala.avif";
import manali from "../../Media/manali.avif";
import jaipur from "../../Media/jaipur.avif";
import kashmir from "../../Media/kashmir.avif";
import andaman from "../../Media/andhaman.avif";
import rishikesh from "../../Media/rishi.avif";
import udaipur from "../../Media/udaipur.avif";
import shimla from "../../Media/shimla.avif";
import darjeeling from "../../Media/darji.jpeg";
import ooty from "../../Media/ooty.avif";
import ladakh from "../../Media/ladakh.webp";
import coorg from "../../Media/coorg.avif";
import pondicherry from "../../Media/pondi.avif";
import munnar from "../../Media/munar.avif";
import rajasthan from "../../Media/rajasthan.avif";
import sikkim from "../../Media/sikkim.avif";
import auli from "../../Media/auli.avif";


export const destinations = [
  {
    id: 1,
    name: "Thailand",
    price: "₹69,700",
    image: thai
  },
  {
    id: 2,
    name: "Dubai",
    price: "₹13,700",
    image: dubai
  },
  {
    id: 3,
    name: "Vietnam",
    price: "₹12,300", 
    image: veit
  },
  {
    id: 4,
    name: "Malaysia",
    price: "₹1,20,800",
    image: malay
  },
  {
    id: 5,
    name: "Maldives",
    price: "₹67,700",
    image: mald
  },
  {
    id: 6,
    name: "Singapore",
    price: "₹40,800",
    image: sing
  },
  {
    id: 7,
    name: "Bali",
    price: "₹74,500",
    image: bali
  },
  {
    id: 8,
    name: "Europe",
    price: "₹1,13,000",
    image: europe
  },
  {
    id: 9,
    name: "Australia",
    price: "₹70,700",
    image: australia
  },
  {
    id: 10,
    name: "New Zealand",
    price: "₹28,300",
    image: newzea
  },
  {
    id: 11,
    name: "Turkey",
    price: "₹3,30,500",
    image: turkey
  }
];

export const domesticDestinations = [
  {
    id: 1,
    name: "Goa",
    price: "₹12,500",
    image: goa,
  },
  {
    id: 2,
    name: "Kerala",
    price: "₹15,800",
    image: kerala,
  },
  {
    id: 3,
    name: "Manali",
    price: "₹9,999",
    image: manali,
  },
  {
    id: 4,
    name: "Jaipur",
    price: "₹8,300",
    image: jaipur,
  },
  {
    id: 5,
    name: "Kashmir",
    price: "₹16,400",
    image: kashmir,
  },
  {
    id: 6,
    name: "Andaman & Nicobar",
    price: "₹19,500",
    image: andaman,
  },
  {
    id: 7,
    name: "Rishikesh",
    price: "₹7,800",
    image: rishikesh,
  },
  {
    id: 8,
    name: "Udaipur",
    price: "₹10,200",
    image: udaipur,
  },
  {
    id: 9,
    name: "Shimla",
    price: "₹9,200",
    image: shimla,
  },
  {
    id: 10,
    name: "Darjeeling",
    price: "₹11,000",
    image: darjeeling,
  },
  {
    id: 11,
    name: "Ooty",
    price: "₹13,400",
    image: ooty,
  },
  {
    id: 12,
    name: "Ladakh",
    price: "₹18,200",
    image: ladakh,
  },
  {
    id: 13,
    name: "Coorg",
    price: "₹10,900",
    image: coorg,
  },
  {
    id: 14,
    name: "Pondicherry",
    price: "₹8,750",
    image: pondicherry,
  },
  {
    id: 15,
    name: "Munnar",
    price: "₹12,000",
    image: munnar,
  },
  {
    id: 16,
    name: "Rajasthan Tour",
    price: "₹17,900",
    image: rajasthan,
  },
  {
    id: 17,
    name: "Sikkim",
    price: "₹14,600",
    image: sikkim,
  },
  {
    id: 18,
    name: "Auli",
    price: "₹13,500",
    image: auli,
  },
];


export const BestSellingDestinations = () => {
  return (
    <Box sx={{ px: { xs: 0, md: 0 }, py: 2 }}>
      {/* <Typography variant="h5" fontWeight="bold" gutterBottom>
        Best Selling Destinations!
      </Typography> */}
      <Typography variant="h5" fontWeight="bold" sx={{paddingBottom:"16px"}}>
        International <span style={{ color: "red" }}>Destinations</span>
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          pb: 1,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
        }}
      >
        {destinations.map((item) => (
          <Box
            key={item.id}
            sx={{
              minWidth: 220,
              flex: "0 0 auto",
              scrollSnapAlign: "start",
            }}
          >
            <Card elevation={1} sx={{ borderRadius: 2, height: "100%" }}>
              <CardMedia
                component="img"
                height="180"
                image={item.image}
                alt={item.name}
                sx={{ borderRadius: "8px 8px 0 0" }}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Starting at {item.price} Per person
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};


export const PopularDestinations = () => {
  return (
    <Box sx={{ px: { xs: 0, md: 0 }, py: 2 }}>
      {/* <Typography variant="h5" fontWeight="bold" gutterBottom>
        Best Selling Destinations!
      </Typography> */}
      <Typography variant="h5" fontWeight="bold" sx={{paddingBottom:"16px"}}>
        Domestic <span style={{ color: "red" }}>Destinations</span>
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          pb: 1,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
        }}
      >
        {domesticDestinations.map((item) => (
          <Box
            key={item.id}
            sx={{
              minWidth: 220,
              flex: "0 0 auto",
              scrollSnapAlign: "start",
            }}
          >
            <Card elevation={1} sx={{ borderRadius: 2, height: "100%" }}>
              <CardMedia
                component="img"
                height="180"
                image={item.image}
                alt={item.name}
                sx={{ borderRadius: "8px 8px 0 0" }}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Starting at {item.price} Per person
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};