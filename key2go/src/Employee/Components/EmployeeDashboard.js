import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import DirectionsCarRounded from "@mui/icons-material/DirectionsCarRounded";

import HomeFragment from "../Fragments/HomeFragment";
import CarFragment from "../Fragments/CarFragments";
import Logout from "../Fragments/Logout";
import Booking from "../Fragments/Booking";
import CarCategoriesFragment from "../Fragments/CarCategoriesFragment";

const drawerWidth = 240;

const Root = styled("div")({
  display: "flex",
});

const AppBarStyled = styled(AppBar)({
  zIndex: 1300, // Adjust for MUI v5
  backgroundColor: "black",
});

const DrawerStyled = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
  },
});

const Content = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user || user.data.role !== "employee") {
      navigate("/error");
    }
  }, [navigate]);

  const [fragment, setFragment] = useState("HOME");

  const loadFragment = () => {
    switch (fragment) {
      case "HOME":
        return <HomeFragment />;
      case "Bookings":
        return <Booking/>;
      case "Logout":
        return <Logout />;
      case "CarCategoriesFragment":
        return <CarCategoriesFragment />;
      case "CarFragment":
        return <CarFragment />;
      default:
        return <HomeFragment />;
    }
  };

  return (
    <Root>
      <CssBaseline />
      <AppBarStyled position="fixed">
        <Toolbar>
          <Typography variant="h5" noWrap sx={{ flexGrow: 1 }}>
            <strong>Employee Dashboard</strong>
          </Typography>
          <SupervisorAccountIcon sx={{ color: "white", fontSize: 30, marginLeft: 2 }} />
        </Toolbar>
      </AppBarStyled>
      <DrawerStyled variant="permanent">
        <Toolbar />
        <List>
          <ListItem button onClick={() => setFragment("HOME")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => setFragment("Bookings")}>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Total Bookings" />
          </ListItem>
          <ListItem button onClick={() => setFragment("CarCategoriesFragment")}>
            <ListItemIcon>
              <DirectionsCarRounded />
            </ListItemIcon>
            <ListItemText primary="Car Categories" />
          </ListItem>
          <ListItem button onClick={() => setFragment("CarFragment")}>
            <ListItemIcon>
              <DirectionsCarRounded />
            </ListItemIcon>
            <ListItemText primary="Cars" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setFragment("Logout")}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </DrawerStyled>
      <Content>
        <Toolbar />
        {loadFragment()}
      </Content>
    </Root>
  );
}
