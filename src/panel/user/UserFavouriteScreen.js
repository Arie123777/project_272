// CSCI2720 Course Project
// Regional Weather in Hong Kong
// Lai Man Hin 1155136167
// Lam Chun Sang 1155136170
// Lee Ka Sin 1155144294
// He Yauhi 1155143159
// Fan Dezen 1155143810

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Card, Button, makeStyles } from "@material-ui/core";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import FavoriteIcon from "@material-ui/icons/Favorite";

import apiManager from "../../api/apiManager";

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
}));

const UserFavouriteScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState({
    columns: Cells,
    data: [],
  });
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      apiManager
        .get("/api/user/fav")
        .then((res) => {
          setTableData((state) => ({ ...state, data: res.data }));
        })
        .catch((e) =>
          alert("Fetching favourites Error : " + e.response.data.error)
        );
      setIsLoading(false);
    })();
  }, []);

  return (
    true && (
      <>
        <MaterialTable
          title="Your Favourites List"
          columns={tableData.columns}
          data={tableData.data}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
          isLoading={isLoading}
          components={{
            Container: (props) => <Card {...props} variant="outlined" />,
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
              icon: () => <FavoriteIcon color="secondary" />,
              tooltip: "Favourite",
              onClick: () => {
                apiManager
                  .request({
                    method: "delete",
                    url: "api/user/fav",
                    data: {
                      weather_id: rowData.weather_id,
                    },
                  })
                  .then(async () => {
                    apiManager
                      .get("/api/user/fav")
                      .then((res) => {
                        setTableData((state) => ({ ...state, data: res.data }));
                      })
                      .catch((e) =>
                        alert(
                          "Fetching favourites Error: " + e.response.data.error
                        )
                      );
                  })
                  .catch(() => {
                    alert("Removing favourite Error");
                  });
              },
            }),
          ]}
        />
      </>
    )
  );
};

export default UserFavouriteScreen;
