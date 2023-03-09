import React from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Container,
  Item,
  Input,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useTheme from "@mui/material";

const Navbar = () => {
  return (
    <>
      <Container>
        <AppBar>
          <Toolbar>
            <Container>
              <Grid container spacing={2}>
                {" "}
                <Grid item xs={3}>
                  <Typography> E-trade </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Input></Input>
                  <SearchIcon />
                </Grid>
                <Grid item xs={2}>
                  <Typography> Mirko </Typography>
                </Grid>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
      </Container>
    </>
  );
};

export default Navbar;
