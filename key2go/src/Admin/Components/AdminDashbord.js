import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated import
import {
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Home as HomeIcon,
  People as PeopleIcon,
  ShoppingBasket as ShoppingBasketIcon,
  ExitToApp as ExitToAppIcon,
  SupervisorAccount as SupervisorAccountIcon,
} from "@mui/icons-material";

import Homefragment from "../Fragments/HomeFragment";
import Logout from "../Fragments/Logout";
import Employees from "../Fragments/Employees";
import Users from "../Fragments/Users";
import Booking from "../Fragments/Booking";

const drawerWidth = 240;

const styles = {
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: 1201,
    backgroundColor: "black",
    color: "rgb(255, 64, 0)",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: "16px",
  },
};

export default function AdminDashboard() {
  const navigate = useNavigate(); // Updated from useHistory

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));

    if (!user || user.data.role !== "admin") {
      navigate(-1); // Updated from history.goBack()
    }
  }, [navigate]);

  const [fragment, setFragment] = useState("HOME");

  const loadFragment = () => {
    switch (fragment) {
      case "HOME":
        return <Homefragment />;
      case "Employees":
        return <Employees />;
      case "Users":
        return <Users />;
      case "Bookings":
        return <Booking />;
      case "Logout":
        return <Logout />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.root}>
      <CssBaseline />
      <AppBar position="fixed" style={styles.appBar}>
        <Toolbar>
          <Typography variant="h5" noWrap>
            <strong>Admin Dashboard</strong>
          </Typography>
          <SupervisorAccountIcon style={{ marginLeft: "10px" }} />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={styles.drawer}
        variant="permanent"
        PaperProps={{
          sx: styles.drawerPaper,
        }}
      >
        <Toolbar />
        <div style={styles.drawerContainer}>
          <List>
            <ListItem button onClick={() => setFragment("HOME")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => setFragment("Employees")}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItem>
            <ListItem button onClick={() => setFragment("Users")}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button onClick={() => setFragment("Bookings")}>
              <ListItemIcon>
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText primary="Total Bookings" />
            </ListItem>
            <ListItem button onClick={() => setFragment("Logout")}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
      <main style={styles.content}>
        <Toolbar />
        {loadFragment()}
      </main>
    </div>
  );
}
