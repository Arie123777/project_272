/*
 * CSCI2720 Course Project
 * Regional Weather in Hong Kong
 *
 * Lai Man Hin 1155136167
 * Lam Chun Sang 1155136170
 * Lee Ka Sin 1155144294
 * He Yauhi 1155143159
 */

import React, { useState, useContext, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
  CssBaseline,
  Drawer,
  Divider,
  Container,
  List,
} from "@material-ui/core";

import clsx from "clsx";

import { Link } from "react-router-dom";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import BarChartIcon from "@material-ui/icons/BarChart";
import StorageIcon from "@material-ui/icons/Storage";

import { Context as AuthContext } from "../../context/AuthContext";

import History from "../../history";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const AdminNavBar = (props) => {
  const { state: authState, logout, getUser } = useContext(AuthContext);
  const [isContentReady, setIsContentReady] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      await getUser();
      setIsContentReady(true);
    })();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setIsDrawerOpen(true)}
            className={clsx(
              classes.menuButton,
              isDrawerOpen && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Location Finder
          </Typography>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            align="right"
            noWrap
            className={classes.title}
          >
            Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !isDrawerOpen && classes.drawerPaperClose
          ),
        }}
        open={isDrawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => setIsDrawerOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/admin/manage/user">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="User CRUD" />
          </ListItem>
          <ListItem button component={Link} to="/admin/manage/location">
            <ListItemIcon>
              <EditLocationIcon />
            </ListItemIcon>
            <ListItemText primary="Location CRUD" />
          </ListItem>
          <ListItem button component={Link} to="/admin/update">
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="Update Data" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={async () => {
              await logout();
              History.push("/");
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer}></div>
        <Container maxWidth="lg" className={classes.container}>
          {props.children}
        </Container>
      </main>
    </div>
  );
};

export default AdminNavBar;
