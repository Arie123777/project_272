// CSCI2720 Course Project
// Regional Weather in Hong Kong

// Lai Man Hin 1155136167
// Lam Chun Sang 1155136170
// Lee Ka Sin 1155144294
// He Yauhi 1155143159

import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { Map, Marker, TileLayer } from "react-leaflet";
import {
  Card,
  Button,
  makeStyles,
  Typography,
  Input,
  InputAdornment,
} from "@material-ui/core";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";

import { Context as GameContext } from "../../context/GameContext";
import apiManager from "../../api/apiManager";
import GLOBALS from "../../global";

const Cells = [
  { field: "user_id", title: "ID", width: "5%", type: "numeric" },
  { field: "user_name", title: "Name", width: "35%" },
  { field: "user_rank", title: "Rank", width: "5%", type: "numeric" },
];

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    zIndex: 499,
    position: "absolute",
    left: 48,
    top: 12,
  },
  tableToolBar: {
    margin: theme.spacing(3),
    display: "grid",
    marginTop: 0,
  },
  tableTitle: {
    gridColumn: 1,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  tableSearch: {
    gridColumn: 2,
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const UserHomeScreen = () => {
  const {
    state: gameState,
    fetch_weather,
    fetchHomeLocation,
  } = useContext(GameContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState({
    columns: Cells,
    data: [],
  });
  const classes = useStyles();
  const table = useRef(null);
  const [isNearbyMode, setIsNearbyMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    (async () => {
      await fetch_weather(gameState.homeLocation[0], gameState.homeLocation[1]);
      await fetchHomeLocation();
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!isLoading)
      setTableData((state) => ({ ...state, data: gameState.weather }));
  }, [isLoading]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetch_weather(gameState.homeLocation[0], gameState.homeLocation[1]);
      setIsLoading(false);
    })();
  }, [gameState.homeLocation]);

  useEffect(() => {
    if (searchValue.includes("nearby ")) {
      setIsNearbyMode(true);
      table.current.onSearchChange("");
      table.current.onFilterChange(3, searchValue.slice(7));
    } else {
      setIsNearbyMode(false);
      if (table != null && table.current != null) {
        table.current.onSearchChange(searchValue);
        table.current.onFilterChange(3, "");
      }
    }
  }, [searchValue]);

  return (
    true && (
      <>
        <div className={classes.tableToolBar}>
          <div className={classes.tableTitle}>
            <Typography variant="h6">Weather List</Typography>
          </div>
          <div className={classes.tableSearch}>
            <Input
              placeholder="Search"
              color="secondary"
              autoFocus
              value={searchValue}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              endAdornment={
                isNearbyMode && (
                  <InputAdornment position="end">km</InputAdornment>
                )
              }
              style={{ width: 200 }}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <MaterialTable
          columns={tableData.columns}
          data={tableData.data}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
          isLoading={isLoading}
          debounceInterval={10}
          tableRef={table}
          components={{
            Container: (props) => <Card {...props} variant="outlined" />,
            Toolbar: (props) => null,
          }}
          detailPanel={(rowData) => (
            <div style={{ position: "relative" }}>
              <Map
                center={[rowData.latitude, rowData.longitude]}
                zoom={15}
                style={{ width: "100%", height: "600px" }}
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[rowData.latitude, rowData.longitude]} />
                <Marker
                  icon={GLOBALS.customMarker.red}
                  position={gameState.homeLocation}
                />
              </Map>
              <Button
                variant="contained"
                color="primary"
                startIcon={<OpenInBrowserIcon />}
                className={classes.button}
                component={Link}
                to={"/user/map/" + rowData.weather_id}
              >
                Open The Maps View
              </Button>
            </div>
          )}
          actions={[
            (rowData) => ({
              icon: () =>
                rowData.favstatus ? (
                  <FavoriteIcon color="secondary" />
                ) : (
                  <FavoriteBorderIcon />
                ),
              tooltip: "Favourite",
              onClick: () => {
                apiManager
                  .request({
                    method: rowData.favstatus ? "delete" : "post",
                    url: "api/user/fav",
                    data: {
                      weather_id: rowData.weather_id,
                    },
                  })
                  .then(async () => {
                    setIsLoading(true);
                    await fetch_weather(
                      gameState.homeLocation[0],
                      gameState.homeLocation[1]
                    );
                    setIsLoading(false);
                  })
                  .catch(() => {
                    alert("Adding favourite Error");
                  });
              },
            }),
          ]}
        />
      </>
    )
  );
};

export default UserHomeScreen;
