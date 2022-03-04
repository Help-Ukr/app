import { Button, Container, Box, Typography } from "@mui/material";
import CollectIcon from "@mui/icons-material/CategoryOutlined";
import DonateIcon from "@mui/icons-material/VolunteerActivism";
import TransportIcon from "@mui/icons-material/DirectionsBusFilled";
import React from "react";

type Props = {};

const SelectUserStory = (props: Props) => {
  return (
    <Container>
      <Typography sx={{ textAlign: "center" }} component="h3" variant="h3">
        I want to...
      </Typography>
      <Box
        sx={{ display: "flex", marginTop: 4, gap: 1, justifyContent: "center" }}
      >
        <Button
          color="secondary"
          variant="contained"
          startIcon={<CollectIcon />}
        >
          Collect donations
        </Button>
        <Button color="primary" variant="contained" startIcon={<DonateIcon />}>
          Donate goods
        </Button>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<TransportIcon />}
        >
          Transport goods
        </Button>
      </Box>
    </Container>
  );
};

export default SelectUserStory;
