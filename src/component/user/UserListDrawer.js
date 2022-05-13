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

import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TableChartIcon from "@material-ui/icons/TableChart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BarChartIcon from "@material-ui/icons/BarChart";
import MapIcon from "@material-ui/icons/Map";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/user/home">
      <ListItemIcon>
        <TableChartIcon />
      </ListItemIcon>
      <ListItemText primary="Table View" />
    </ListItem>
    <ListItem button component={Link} to="/user/map">
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <ListItemText primary="Map View" />
    </ListItem>

    <Divider />

    <ListItem button component={Link} to="/user/favourite">
      <ListItemIcon>
        <FavoriteBorderIcon />
      </ListItemIcon>
      <ListItemText primary="Favourites" />
    </ListItem>

    <Divider />

    <ListItem button component={Link} to="/user/about">
      <ListItemIcon>
        <InfoOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="About Regional Weather in Hong Kong" />
    </ListItem>
  </div>
);
