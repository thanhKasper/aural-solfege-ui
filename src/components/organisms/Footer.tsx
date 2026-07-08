import LogoWithBrandName from "@/components/molecules/LogoWithBrandName";
import {
  Button,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.structure[100],
  borderTopWidth: "1px",
  borderTopStyle: "solid",
  borderTopColor: theme.palette.structure[300],
}));

export const Footer = () => {
  return (
    <FooterContainer
      sx={{
        paddingY: 8,
        display: "flex",
        justifyContent: "space-between",
        paddingX: 16,
      }}
    >
      {/* Left: Logo + Language selector */}
      <Stack spacing={4}>
        <LogoWithBrandName size="xl" />

        {/* Language selector */}
        <Select defaultValue="en" size="small" sx={{ minWidth: 200 }}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
          <MenuItem value="es">Español</MenuItem>
        </Select>
      </Stack>

      {/* Center: Nav link columns */}
      <Stack direction={"row"} component="nav" spacing={4}>
        {/* Other sites */}
        <Stack direction={"column"}>
          <Typography variant="subtitle1">Other sites</Typography>
          <Typography component="a" href="#">
            Sound configuration
          </Typography>
          <Typography component="a" href="#">
            Ear training exercises
          </Typography>
        </Stack>

        {/* Services */}
        <Stack direction={"column"}>
          <Typography variant="subtitle1">Services</Typography>
          <Typography component="a" href="#">
            Ear training system
          </Typography>
          <Typography component="a" href="#">
            Hear together
          </Typography>
        </Stack>

        {/* About */}
        <Stack direction={"column"}>
          <Typography variant="subtitle1">About</Typography>
          <Typography component="a" href="#">
            About me
          </Typography>
          <Typography component="a" href="#">
            About this page
          </Typography>
        </Stack>
      </Stack>

      {/* Right: Feedback form */}
      <Stack direction={"column"} spacing={4}>
        <Typography variant="subtitle1">Your opinion matters!</Typography>

        <TextField
          type="email"
          placeholder="Enter your email"
          size="small"
          fullWidth
        />

        <TextField
          placeholder="Anything you want to be improved..."
          multiline
          rows={6}
          fullWidth
        />

        <Button variant="contained" sx={{ alignSelf: "flex-start" }}>
          A button
        </Button>
      </Stack>
    </FooterContainer>
  );
};
