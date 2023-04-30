import { GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import { NextPage } from "next";

const StickyFooter: NextPage = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          <GitHub
            onClick={() => window.open("https://github.com/darkvictor13")}
          />
          <Instagram
            onClick={() =>
              window.open("https://www.instagram.com/victor_almeida_yeshua")
            }
          />
          <LinkedIn
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/victor-almeida-132b171b5/"
              )
            }
          />
        </Box>
        <Typography sx={{ textAlign: "center" }} variant="body1">
          &copy; {new Date().getFullYear()} Victor Almeida. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default StickyFooter;
