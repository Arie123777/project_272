// CSCI2720 Course Project
// Regional Weather in Hong Kong
// Lai Man Hin 1155136167
// Lam Chun Sang 1155136170
// Lee Ka Sin 1155144294
// He Yauhi 1155143159
// Fan Dezen 1155143810

import React, { useState, useContext, useEffect } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import {
  Grid,
  makeStyles,
  IconButton,
  Typography,
  Card,
  Avatar,
  TextField,
} from "@material-ui/core";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import SendIcon from "@material-ui/icons/Send";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useParams } from "react-router-dom";

import { Context as GameContext } from "../../context/GameContext";
import apiManager from "../../api/apiManager";
import GLOBALS from "../../global";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  detailCard: {
    padding: 16,
    height: 600,
    overflow: "scroll",
  },
  cardItems: {
    marginBottom: 12,
  },
  hideButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
  avatar: {
    backgroundColor: "#f44336",
    fontWeight: "bold",
  },
  commentContainer: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  submitButton: {
    height: 48,
    width: 48,
    alignSelf: "flex-end",
  },
}));

const UserMapScreen = () => {
  const classes = useStyles();
  const { state: gameState, fetch_weather } = useContext(GameContext);
  const [isContentReady, setIsContentReady] = useState(false);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [selectedWeatherComments, setSelectedWeatherComments] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [viewPort, setViewPort] = useState({
    center: [22.3509923, 114.1015114],
    zoom: 11,
  });
  let { weather_id } = useParams();

  useEffect(() => {
    (async () => {
      if (gameState.weather == null)
        await fetch_weather(
          gameState.homeLocation[0],
          gameState.homeLocation[1]
        );
      setIsContentReady(true);
    })();
  }, []);

  useEffect(() => {
    if (isContentReady || gameState.weather != null) {
      let reqWeather = null;
      for (var item of gameState.weather) {
        if (item.weather_id === parseInt(weather_id, 10)) {
          reqWeather = item;
          break;
        }
      }

      if (reqWeather != null) {
        onSelectWeather(reqWeather);
      }
    }
  }, [isContentReady, weather_id]);

  const onSelectWeather = async (weather) => {
    setSelectedWeather(weather);
    setViewPort((state) => ({
      ...state,
      center: [weather.latitude, weather.longitude],
      zoom: 15,
    }));
    await apiManager
      .get("/api/user/comment", {
        params: {
          weather_id: weather.weather_id,
        },
      })
      .then((response) => {
        setSelectedWeatherComments(response.data);
      })
      .catch((e) => {});
  };

  return (
    <>
      <Grid container spacing={2}>
        {selectedWeather && (
          <Grid item xs={3}>
            <Card className={classes.detailCard} variant="outlined">
              <Grid container>
                <Grid item xs={6}>
                  <IconButton
                    onClick={() => {
                      apiManager
                        .request({
                          method: selectedWeather.favstatus ? "delete" : "post",
                          url: "api/user/fav",
                          data: {
                            weather_id: selectedWeather.weather_id,
                          },
                        })
                        .then(async () => {
                          setSelectedWeather((state) => ({
                            ...state,
                            favstatus: !selectedWeather.favstatus,
                          }));
                          await fetch_weather(
                            gameState.homeLocation[0],
                            gameState.homeLocation[1]
                          );
                        })
                        .catch(() => {
                          alert("Adding favourite Error");
                        });
                    }}
                  >
                    {selectedWeather.favstatus ? (
                      <FavoriteIcon color="secondary" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </Grid>
                <Grid item xs={6} className={classes.hideButton}>
                  <IconButton onClick={() => setSelectedWeather(null)}>
                    <ArrowLeftIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <div style={{ height: 16 }} />
              <Typography
                variant="h6"
                component="h2"
                className={classes.cardItems}
              >
                {selectedWeather.name}
              </Typography>
              <div className={classes.cardItems}>
                <Typography
                  style={{
                    margin: 0,
                    display: "inline",
                    fontWeight: "bold",
                    color: selectedWeather.opening_status ? "blue" : "red",
                  }}
                >
                  {selectedWeather.opening_status ? "Open" : "Closed"}
                  {", "}
                </Typography>
                <Typography
                  color="textSecondary"
                  style={{ margin: 0, display: "inline" }}
                >
                  {selectedWeather.distanceKM.toString().slice(0, 4) +
                    " km away"}
                </Typography>
              </div>
              <Typography color="textSecondary" className={classes.cardItems}>
                at {selectedWeather.latitude}, {selectedWeather.longitude}
              </Typography>

              <div style={{ height: 24 }} />

              <Typography variant="h6" component="h3" color="textSecondary">
                Comments
              </Typography>
              {selectedWeatherComments && selectedWeatherComments.length ? (
                selectedWeatherComments.map((comment) => (
                  <Grid
                    container
                    key={comment._id}
                    className={classes.commentContainer}
                  >
                    <Grid item xs={3}>
                      <Avatar className={classes.avatar}>
                        {comment.userName.slice(0, 1).toUpperCase()}
                      </Avatar>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="subtitle2">
                        {comment.userName}
                      </Typography>
                      <Typography variant="body2">{comment.comment}</Typography>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Typography color="textSecondary">No comment</Typography>
              )}

              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newComment === "") return;
                  apiManager
                    .post("/api/user/comment", {
                      weather_id: selectedWeather.weather_id,
                      user_id: 3,
                      comment: newComment,
                    })
                    .then((response) => {
                      onSelectWeather(selectedWeather);
                      setNewComment("");
                    })
                    .catch((e) => {
                      alert("Fail to add comment. Please try again!");
                    });
                }}
              >
                <Grid
                  container
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                  }}
                >
                  <TextField
                    margin="normal"
                    label="Add a comment ..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{ flexGrow: 1 }}
                  />

                  <IconButton type="submit" className={classes.submitButton}>
                    <SendIcon />
                  </IconButton>
                </Grid>
              </form>
            </Card>
          </Grid>
        )}

        <Grid item xs={selectedWeather ? 9 : 12}>
          <Map
            center={viewPort.center}
            zoom={viewPort.zoom}
            onViewportChange={(viewport) =>
              setViewPort((state) => ({ ...state, zoom: viewport.zoom }))
            } // update zoom only, avoid clash with center
            style={{ width: "100%", height: "600px" }}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {gameState.weather != null &&
              gameState.weather.map((datum) => (
                <Marker
                  icon={
                    selectedWeather != null &&
                    datum.weather_id === selectedWeather.weather_id
                      ? GLOBALS.customMarker.blue
                      : GLOBALS.customMarker.grey
                  }
                  key={datum.weather_id}
                  position={[datum.latitude, datum.longitude]}
                  onclick={() => onSelectWeather(datum)}
                  zIndexOffset={
                    selectedWeather != null &&
                    datum.weather_id === selectedWeather.weather_id
                      ? 1000
                      : 0
                  }
                />
              ))}
            {/* home location */}
            <Marker
              icon={GLOBALS.customMarker.red}
              position={gameState.homeLocation}
              zIndexOffset={1000}
            />
          </Map>
        </Grid>
      </Grid>
    </>
  );
};

export default UserMapScreen;
