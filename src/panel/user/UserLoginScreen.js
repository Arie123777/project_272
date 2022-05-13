// CSCI2720 Course Project
// Regional Weather in Hong Kong
// Lai Man Hin 1155136167
// Lam Chun Sang 1155136170
// Lee Ka Sin 1155144294
// He Yauhi 1155143159
// Fan Dezen 1155143810

import React, { useContext, useState } from "react";
import History from "../../history";

import {
  Avatar,
  Grid,
  Typography,
  TextField,
  makeStyles,
  Container,
  Button,
  CssBaseline,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { Context as AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserLoginScreen = (props) => {
  const {
    state: authState,
    login_user,
    login_admin,
    register_user,
  } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <CssBaseline />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Weather With Me
        </Typography>
        <Typography component="h1" variant="h5">
          User Login Page
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={async (e) => {
            e.preventDefault();
            await login_user({ username, password });
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            label="Username"
            name="username"
            fullWidth
            required
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            label="Password"
            type="Password"
            name="username"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {authState.authMessage ? (
            <div style={{ color: "blue" }}>Error: {authState.authMessage}</div>
          ) : null}

          <Grid container>
            <Grid item xs>
              <Button
                fullWidth
                className={classes.submit}
                onClick={async () => {
                  await register_user({ username, password });
                  console.log(authState);
                }}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>

        <div style={{ height: 40 }}></div>

        <Typography variant="body2" color="textSecondary" align="center">
          Are you an admin?
        </Typography>

        <Button
          onClick={async () => {
            await login_admin();
            History.push("/");
          }}
        >
          Login Admin
        </Button>
      </div>
    </Container>
  );
};

export default UserLoginScreen;
