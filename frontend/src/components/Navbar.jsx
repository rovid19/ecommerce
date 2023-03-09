import React from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Container,
  Item,
} from "@mui/material";
import useTheme from "@mui/material";

const Navbar = () => {
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {" "}
          <Grid item xs={3}>
            <Typography> Mirko </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography> Mirko </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography> Mirko </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Navbar;
