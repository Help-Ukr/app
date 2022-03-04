import { Button, Container, Box, Typography } from "@mui/material";
import CollectIcon from "@mui/icons-material/CategoryOutlined";
import DonateIcon from "@mui/icons-material/VolunteerActivism";
import TransportIcon from "@mui/icons-material/DirectionsBusFilled";
import React from "react";
import Link from "next/link";

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
        <Link href="/register">
          <Button
            color="secondary"
            variant="contained"
            startIcon={<CollectIcon />}
            component="a"
          >
            Collect donations
          </Button>
        </Link>

        <Link href="/donate">
          <Button
            component="a"
            color="primary"
            variant="contained"
            startIcon={<DonateIcon />}
          >
            Donate goods
          </Button>
        </Link>
        <Link href="/transport">
          <Button
            color="secondary"
            variant="contained"
            startIcon={<TransportIcon />}
            component="a"
          >
            Transport goods
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default SelectUserStory;
