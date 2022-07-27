import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material/";

const Hero = (props) => {
  return (
    <Container>
      <Box
        sx={{
          display: { xs: "flex", sm: "none", md: "none", lg: "none" },
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mb: "2rem",
          }}
        >
          <Typography variant="h4" sx={{ ml: "auto", mr: "auto" }}>
            Portfolio Value:{" "}
          </Typography>
          <Typography variant="h4" sx={{ ml: "auto", mr: "auto" }}>
            $ {(props.data).toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" sx={{ ml: "auto", mr: "auto" }}>
              24H Change
            </Typography>
            <Typography variant="h6" sx={{ ml: "auto", mr: "auto" }}>
              $ {(props.t24hchange).toFixed(2)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" sx={{ ml: "auto", mr: "auto" }}>
              Profit / Loss:
            </Typography>
            <Typography variant="h6" sx={{ ml: "auto", mr: "auto" }}>
              $ {(props.tprofit).toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          //   display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">Portfolio Value: </Typography>
          <Typography variant="h6" sx={{ ml: "auto", mr: "auto" }}>
            $ {(props.data).toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">24H Change</Typography>
          <Typography variant="h6" sx={{ ml: "auto", mr: "auto" }}>
            $ {(props.t24hchange).toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">Profit / Loss </Typography>
          <Typography variant="h6" sx={{ ml: "auto", mr: "auto" }}>
            $ {(props.tprofit).toFixed(2)}
          </Typography>
        </Box>
      </Box>
      <Divider
        variant="fullWidth"
        sx={{
          mt: "1.5rem",
          borderBottomWidth: "3px",
        }}
      />
    </Container>
  );
};

export default Hero;
