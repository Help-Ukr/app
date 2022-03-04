import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imgSrc: string;
}

export default function HeroSection({
  title,
  subtitle,
  imgSrc,
}: HeroSectionProps) {
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${imgSrc})`,
        borderRadius: "0px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.5)",
          height: "100%",
          width: "100%",
        }}
      />
      <Box
        sx={{
          position: "relative",
          px: { xs: 3, md: 6 },
          pr: { md: 0 },
          textAlign: "center",
          margin: "0 auto",
          py: "5rem",
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          sx={{ fontWeight: "bold" }}
          // variant="h3"
          color="inherit"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography component="h2" variant="h5" color="inherit" paragraph>
          {subtitle}
        </Typography>
      </Box>
    </Paper>
  );
}
