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

import React from "react";
import { Box } from "@mui/system";

type Props = {};

const EditGeneralCollectionPointData = (props: Props) => {
  return (
    <Container maxWidth="sm">
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            my: 4,
          }}
        >
          <TextField
            required
            fullWidth
            id="orgName"
            label="Organization Name"
            name="orgName"
            autoComplete="organization"
            value="Space Medusa"
          />
          <TextField
            fullWidth
            id="phoneNr"
            label="Phone Number"
            name="phoneNr"
            autoComplete="phone"
            type="tel"
          />
          <TextField
            fullWidth
            id="telegramHandle"
            label="Telegram handle"
            name="telegramHandle"
            autoComplete="telegram"
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
