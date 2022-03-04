import {
  Button,
  Container,
  InputAdornment,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import UploadIcon from "@mui/icons-material/AddAPhoto";

import dynamic from "next/dynamic";

import React, { useState } from "react";
import { Box } from "@mui/system";
import type { LocationSelectValue } from "../../GeoLocationRetriavalWithEditableName";

const GeoLocationRetrievalWithEditableName = dynamic(
  () => import("../../GeoLocationRetriavalWithEditableName"),
  {
    ssr: false,
  }
);

type Props = {};

const EditGeneralCollectionPointData = (props: Props) => {
  const [location, setLocation] = useState<LocationSelectValue>({
    label: "Skalitzer Straße 80",
    value: {
      lat: 52.5007117,
      lon: 13.4392206,
    },
  });

  return (
    <Container maxWidth="md">
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            my: 4,
          }}
        >
          <GeoLocationRetrievalWithEditableName
            location={location}
            onChange={setLocation}
          />
          <TextField
            required
            fullWidth
            id="orgName"
            label="Organization Name"
            name="orgName"
            value="Space Meduza"
          />

          <TextField
            fullWidth
            id="phoneNr"
            label="Phone Number"
            name="phoneNr"
            type="tel"
          />
          <TextField
            fullWidth
            id="telegramHandle"
            label="Telegram handle"
            name="telegramHandle"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">@</InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <label htmlFor="icon-button-file">
              <input
                style={{ display: "none" }}
                accept="image/*"
                id="icon-button-file"
                type="file"
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <UploadIcon />
              </IconButton>
            </label>
            <Typography sx={{ opacity: 0.5 }}>Change image</Typography>
          </Box>
          <Button
            sx={{ mb: 4 }}
            color="secondary"
            variant="outlined"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditGeneralCollectionPointData;
