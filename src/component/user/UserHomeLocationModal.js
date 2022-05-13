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

import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Paper, Typography, Button, Grid } from "@material-ui/core";
import { Map, Marker, TileLayer } from "react-leaflet";

import { Context as GameContext } from "../../context/GameContext";
import GLOBALS from "../../global";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "75%",
  },
  titleText: {},
}));

const UserHomeLocationModal = ({ isOpen, setIsOpen }) => {
  const classes = useStyles();
  const {
    state: gameState,
    fetchHomeLocation,
    setHomeLocation,
  } = useContext(GameContext);
  const [viewPort, setViewPort] = useState({
    center: gameState.homeLocation,
    zoom: 14,
  });

  useEffect(() => {
    (async () => {
      await fetchHomeLocation();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setViewPort((state) => ({ ...state, center: gameState.homeLocation }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      // onClose={() => setIsOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 150,
      }}
    >
      <Fade in={isOpen}>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="h3" className={classes.titleText}>
            Set Location
          </Typography>

          <div style={{ height: 16 }}></div>

          <Map
            center={viewPort.center}
            zoom={viewPort.zoom}
            onViewportChange={(viewport) =>
              setViewPort((state) => ({ ...state, zoom: viewport.zoom }))
            }
            style={{ width: "100%", height: 400 }}
            onclick={(e) => setHomeLocation([e.latlng.lat, e.latlng.lng])}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={gameState.homeLocation}
              icon={GLOBALS.customMarker.red}
            />
          </Map>

          <div style={{ height: 16 }}></div>

          <Grid container style={{ alignItems: "center", display: "flex" }}>
            <Grid item xs={9}>
              <Typography
                variant="subtitle1"
                component="h3"
                className={classes.titleText}
              >
                Current selected: {gameState.homeLocation[0]},{" "}
                {gameState.homeLocation[1]}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              style={{ justifyContent: "flex-end", display: "flex" }}
            >
              <Button
                color="primary"
                autoFocus
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Done
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default UserHomeLocationModal;
