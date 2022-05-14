// CSCI2720 Course Project
// Regional Weather in Hong Kong

// Lai Man Hin 1155136167
// Lam Chun Sang 1155136170
// Lee Ka Sin 1155144294
// He Yauhi 1155143159

import React, { useEffect, useState } from "react";
import { Typography, Grid, Card, makeStyles } from "@material-ui/core";
import { Bar } from "react-chartjs-2";

import apiManager from "../../api/apiManager";

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "center",
    display: "flex",
  },
  contentCard: {
    padding: 32,
    marginBottom: 32,
  },
}));

const UserStatScreen = () => {
  const classes = useStyles();
  const [mostCmData, setMostCmData] = useState({});
  const [mostFavData, setMostFavData] = useState({});

  useEffect(() => {
    apiManager.get("/api/user/stats/top_weather").then((res) => {
      let titles = res.data.map((a) => a.name);
      let values = res.data.map((a) => a.commentCount);
      values.push(0);
      setMostCmData({
        labels: titles,
        datasets: [
          {
            label: "Most Commented Location",
            backgroundColor: "rgba(255,0,255,0.3)",
            borderColor: "rgba(255,0,255,1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,0,255,0.4)",
            hoverBorderColor: "rgba(255,0,255,1)",
            data: values,
          },
        ],
      });
    });
    apiManager.get("/api/user/stats/fav_weather").then((res) => {
      let titles = res.data.map((a) => a.name);
      let values = res.data.map((a) => a.favCount);
      values.push(0);
      setMostFavData({
        labels: titles,
        datasets: [
          {
            label: "Most Favourite Location",
            backgroundColor: "#4FACEF37",
            borderColor: "#2E9EEF",
            borderWidth: 2,
            hoverBackgroundColor: "#4FACEF60",
            hoverBorderColor: "#2E9EEF",
            data: values,
          },
        ],
      });
    });
  }, []);

  return (
    <div className={classes.container}>
      <Grid item xs={8}>
        <Card className={classes.contentCard} variant="outlined">
          <Typography variant="h5">Most Commented Location</Typography>
          <div style={{ height: 16 }} />

          <div style={{ width: "100%", position: "relative" }}>
            <Bar data={mostCmData} />
          </div>
        </Card>
        <Card className={classes.contentCard} variant="outlined">
          <Typography variant="h5">Favourite Location</Typography>
          <div style={{ height: 16 }} />

          <div style={{ width: "100%", position: "relative" }}>
            <Bar data={mostFavData} />
          </div>
        </Card>
      </Grid>
    </div>
  );
};

export default UserStatScreen;
