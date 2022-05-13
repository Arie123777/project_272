/*
 * CSCI2720 Course Project
 * Regional Weather in Hong Kong
 *
 * Lai Man Hin 1155136167
 * Lam Chun Sang 1155136170
 * Lee Ka Sin 1155144294
 * He Yauhi 1155143159
 * Fan Dezen 1155143810
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
  Avatar,
  Menu,
  Button,
  Grid,
} from "@material-ui/core";

import clsx from "clsx";

import { mainListItems } from "../../component/user/UserListDrawer";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import { Context as AuthContext } from "../../context/AuthContext";
import UserHomeLocationModal from "../../component/user/UserHomeLocationModal";

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
  avatar: {
    backgroundColor: "#f44336",
    fontWeight: "bold",
  },
  bigAvatar: {
    marginTop: 20,
    backgroundColor: "#f44336",
    width: 70,
    height: 70,
    fontSize: 36,
    fontWeight: "bold",
  },
  helloText: {
    paddingTop: 16,
    paddingRight: 100,
    paddingLeft: 100,
  },
  menuContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  homeLocationButton: {
    borderRadius: 18,
  },
}));

const UserNavBar = (props) => {
  const { state: authState, logout, getUser } = useContext(AuthContext);
  const [isContentReady, setIsContentReady] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      await getUser();
      setIsContentReady(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            Car Park Finder
          </Typography>
          {isContentReady && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event) => setAccountMenuAnchorEl(event.currentTarget)}
                color="inherit"
              >
                <Avatar className={classes.avatar}>
                  {authState.userInfo.name.slice(0, 1).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={accountMenuAnchorEl}
                keepMounted
                open={Boolean(accountMenuAnchorEl)}
                onClose={() => setAccountMenuAnchorEl(null)}
                style={{ top: 58, alignContent: "center" }}
              >
                <Grid className={classes.menuContainer}>
                  <Avatar className={classes.bigAvatar}>
                    {authState.userInfo.name.slice(0, 1).toUpperCase()}
                  </Avatar>
                  <Typography
                    component="h3"
                    variant="h5"
                    className={classes.helloText}
                  >
                    Hello, {authState.userInfo.name}
                  </Typography>

                  <div style={{ height: 20 }}></div>

                  <Button
                    variant="outlined"
                    startIcon={<HomeIcon />}
                    className={classes.homeLocationButton}
                    onClick={() => {
                      setAccountMenuAnchorEl(null);
                      setIsLocationModalOpen(true);
                    }}
                  >
                    Set Home Location
                  </Button>

                  <div style={{ height: 20 }}></div>
                  <Divider flexItem style={{ height: 0.5 }} />
                  <div style={{ height: 20 }}></div>

                  <Button
                    variant="outlined"
                    onClick={async () => {
                      setAccountMenuAnchorEl(null);
                      await logout();
                      History.push("/");
                    }}
                  >
                    Logout
                  </Button>
                </Grid>
              </Menu>
            </div>
          )}
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
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}></div>
        <Container maxWidth="lg" className={classes.container}>
          {props.children}
        </Container>
      </main>
      <UserHomeLocationModal
        isOpen={isLocationModalOpen}
        setIsOpen={setIsLocationModalOpen}
      />
    </div>
  );
};

export default UserNavBar;
